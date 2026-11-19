#!/usr/bin/env node
// SMF ticks, local bar units, and absolute score units are deliberately separate.
import fs from 'node:fs';
import path from 'node:path';
import { readMidi } from './smf.mjs';

function check(ok, message) { if (!ok) throw Error(message); }
function int(value, label, min = 0, max = Number.MAX_SAFE_INTEGER) {
  check(Number.isSafeInteger(value) && value >= min && value <= max, `invalid ${label}: ${value}`); return value;
}
const power2 = n => Number.isInteger(Math.log2(n));
const activeAt = (items, tick) => items.findLast(x => x.tick <= tick);
const groupBy = (list, fn) => { const groups = new Map(); for (const x of list) { const k = fn(x); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(x); } return groups; };
function matches(rule, n) {
  return ['track','channel','program'].every(k => rule[k] === undefined || rule[k] === n[k]) &&
    n.start >= (rule.startTick ?? 0) && n.start < (rule.endTick ?? Infinity) &&
    n.pitch >= (rule.pitchMin ?? 0) && n.pitch <= (rule.pitchMax ?? 127) && (!rule.noteIds || rule.noteIds.includes(n.id));
}
function nominalBars(raw, notes) {
  // Do not use a fitted regular period for an expressive/dense performance.
  // A regular PPQ grid is only a draft, even when every onset fits it exactly.
  const quantum = raw.ppq / 16;
  check(!notes.some(n => Math.abs(n.start / quantum - Math.round(n.start / quantum)) > 1e-7),
    'off-grid input requires explicit bars.bars; refusing to infer performed downbeats');
  for (const ns of groupBy(notes, n => `${n.track}/${n.channel}`).values()) {
    let lastStart = -1, soundingUntil = -1;
    for (const n of ns) { check(n.start === lastStart || n.start >= soundingUntil, 'complex polyphonic input requires explicit bars.bars'); lastStart = n.start; soundingUntil = Math.max(n.end, soundingUntil); }
  }
  const end = notes.reduce((a,n) => Math.max(a,n.end),0), bars=[];
  for (let tick=0; tick < end;) {
    const {n,d} = activeAt(raw.meters,tick), length = raw.ppq*4*n/d;
    check(Number.isSafeInteger(length) && length>0,'non-integral nominal bar length: supply explicit bars');
    const next = tick+length;
    check(!raw.meters.some(m=>m.tick>tick && m.tick<next && m.tick<end),'meter change within nominal bar: supply explicit bars');
    bars.push({bar:bars.length+1,startTick:tick,endTick:next,n,d,confidence:'inferred',reason:'Nominal SMF meter/PPQ; not independently marked.'}); tick=next;
  }
  return bars;
}
function resolveBars(defs, raw, notation, warnings) {
  check(Array.isArray(defs) && defs.length,'bars.bars must be a nonempty array');
  let scoreStart = 0;
  return defs.map((b,i) => {
    const bar=int(b.bar,'bar number',1); check(bar===i+1,'bar numbers must be consecutive from 1');
    const start=int(b.startTick,'startTick'), end=int(b.endTick,'endTick',start+1);
    if (i) check(start===defs[i-1].endTick,`gap or overlap before bar ${bar}`);
    const meter=activeAt(raw.meters,start), n=int(b.n??meter.n,'meter numerator',1), d=int(b.d??meter.d,'meter denominator',1);
    check(power2(d),'meter denominator must be a power of two');
    const units=int(b.units??(notation.unit*4*n/d),'bar length in score units',1);
    const unit=int(b.unit??notation.unit,'local resolution',1), grid=int(b.grid??notation.grid,'bar grid',1);
    check(Array.isArray(b.landmarks??[]),'landmarks must be an array');
    const landmarks=[];
    for(const point of b.landmarks??[]) {
      check(Array.isArray(point)&&point.length===2,`bad landmark in bar ${bar}`);
      const [tick,slot]=point;
      if ((tick===start && slot===0)||(tick===end && slot===units)) continue;
      int(tick,'landmark tick',start+1,end-1); check(Number.isFinite(slot)&&slot>0&&slot<units,'landmark outside score bar');
      const prev=landmarks.at(-1); check(!prev||(prev[0]<tick&&prev[1]<slot),'landmarks must strictly increase'); landmarks.push([tick,slot]);
    }
    if (b.confidence==='manual') check(typeof b.reason==='string'&&b.reason.trim().length, `manual bar ${bar} requires provenance in reason`);
    if (b.confidence==null||b.reason==null) warnings.add('Some explicit bars lack confidence or provenance; see bars.json.');
    const result={bar,start,end,scoreStart,units,n,d,unit,grid,landmarks,confidence:b.confidence??'unspecified',reason:b.reason??null}; scoreStart+=units; return result;
  });
}
function mapUnit(b,t) {
  let x=b.start,y=0;
  for(const [nx,ny] of [...b.landmarks,[b.end,b.units]]) { if(t<=nx) return y+(t-x)*(ny-y)/(nx-x); x=nx;y=ny; }
  throw Error(`tick ${t} outside bar ${b.bar}`);
}
function inferParts(notes, raw) {
  const packs=[...groupBy(notes,n=>`${n.track}/${n.channel}/${n.program}`).values()].map(ns=>{
    const {track,channel,program}=ns[0], id=`p${track}c${channel}i${program}`, pitches=ns.map(n=>n.pitch).sort((a,b)=>a-b);
    const median=(pitches[Math.floor((pitches.length-1)/2)]+pitches[Math.floor(pitches.length/2)])/2;
    return {track,channel,program,id,name:raw.tracks[track].name||`Track ${track} ch ${channel+1}`,staffs:[{id,clef:channel===9?'percussion':median<57?'bass':'treble'}],median,max:pitches.at(-1)};
  }).sort((a,b)=>Number(a.channel===9)-Number(b.channel===9)||b.median-a.median||b.max-a.max||a.track-b.track||a.channel-b.channel||a.program-b.program);
  return {parts:packs, routes:packs.map(({id,track,channel,program})=>({part:id,track,channel,program}))};
}
const names='c cs d ef e f fs g af a bf b'.split(' '), letters='cdefgab';
function pitchToken(p,ref) {
  const name=m=>names[(m%12+12)%12];
  const di=letters.indexOf(name(p)[0])-letters.indexOf(name(ref)[0]);
  const shift=Math.floor(p/12)-Math.floor(ref/12)-(di < -3 ? 1 : di > 3 ? -1 : 0);
  return name(p)+(shift>0?"'".repeat(shift):','.repeat(-shift));
}
function durationParts(units,unit) {
  // Binary and dotted durations; never round a duration to a different token.
  const values=[];
  for(let div=1;div<=128;div*=2) for(const dots of [1,0]) {
    const value=4*unit/div*(dots?1.5:1); if(Number.isInteger(value)) values.push({value,token:String(div)+(dots?'.':'')});
  }
  values.sort((a,b)=>b.value-a.value); const chunks=[];
  while(units>0) { const v=values.find(v=>v.value<=units); check(v,`duration ${units}/${unit} quarters is not printable on the binary grid`); chunks.push(v); units-=v.value; } return chunks;
}
function transcribe(input, configPath, outDir) {
  if(fs.existsSync(outDir)) check(fs.statSync(outDir).isDirectory()&&!fs.readdirSync(outDir).length,'out-dir must be new or empty');
  const profile=configPath?JSON.parse(fs.readFileSync(configPath,'utf8')):{}, raw=readMidi(input);
  const warnings=new Set(['Notation draft: source timing, enharmonic spelling, voices, clefs and timbre have not been independently verified.']);
  const notation={unit:16,grid:1,simultaneityTicks:0,voicePolicy:'auto',tiePolicy:'same-note-only',...profile.notation};
  int(notation.unit,'notation.unit',1,32); check(power2(notation.unit),'notation.unit must be a power of two for binary notation');
  int(notation.grid,'notation.grid',1); int(notation.simultaneityTicks,'simultaneityTicks');
  check(['auto','explicit'].includes(notation.voicePolicy),'unsupported voicePolicy');
  check(['same-note-only','none'].includes(notation.tiePolicy),'unsupported tiePolicy');
  if(notation.tempoBpm!==undefined) int(notation.tempoBpm,'tempoBpm',1);
  const source=profile.source??{}, notes=raw.notes.filter(n=>matches(source,n)).map(n=>({...n}));
  check(notes.length,'no notes match source selection'); const excludedIds=raw.notes.filter(n=>!matches(source,n)).map(n=>n.id);
  if(excludedIds.length) warnings.add('Profile selects a subset of source notes. The audit lists excluded IDs; whole-file verification/splitting must not claim conservation.');
  for(const n of notes) check(n.end>n.start,`zero-duration note ${n.id} needs an explicit grace-note interpretation`);
  if(!profile.bars) warnings.add('Bar map inferred from meter and PPQ; the final full nominal bar may contain padding rests.');
  const bars=resolveBars(profile.bars?profile.bars.bars:nominalBars(raw,notes),raw,notation,warnings);
  const defaults=profile.parts?null:inferParts(notes,raw), parts=profile.parts??defaults.parts, routes=profile.routes??defaults?.routes;
  check(Array.isArray(parts)&&parts.length&&Array.isArray(routes)&&routes.length,'provide parts and nonempty routes together');
  const partById=new Map(), staffIds=new Set();
  for(const p of parts) {
    check(typeof p.id==='string' && p.id.length&&!partById.has(p.id),'invalid or duplicate part id'); partById.set(p.id,p);
    check(typeof p.name==='string'&&p.name.length&&!/["\\\r\n]/u.test(p.name),'invalid instrument name');
    check([1,2].includes(p.staffs?.length),'parts require 1 or 2 staffs');
    for(const [si,s] of p.staffs.entries()) {
      check(typeof s.id==='string'&&/^[a-zA-Z0-9_]+$/.test(s.id)&&!staffIds.has(s.id),`invalid or duplicate layout staff id ${s.id}`); staffIds.add(s.id);
      s.clef??=si?'bass':'treble'; check(/^(treble|bass|alto|tenor|percussion)(?:[_^](?:8|15))?$/.test(s.clef),`unsupported clef ${s.clef}`);
      int(s.ottava??0,'ottava',-2,2); check(!s.stem||['up','down'].includes(s.stem),'stem must be up or down');
    }
  }
  const sourceIds=new Set(notes.map(n=>n.id));
  for(const [i,r] of routes.entries()) {
    const p=partById.get(r.part); check(p,`unknown route part ${r.part}`);
    for(const [k,max] of [['track',65535],['channel',15],['program',127],['startTick',Infinity],['endTick',Infinity],['pitchMin',127],['pitchMax',127]]) if(r[k]!==undefined) int(r[k],`route ${i} ${k}`,0,max);
    check((r.startTick??0)<(r.endTick??Infinity)&&(r.pitchMin??0)<=(r.pitchMax??127),`invalid route range ${i}`);
    if(r.noteIds) check(Array.isArray(r.noteIds)&&r.noteIds.every(id=>sourceIds.has(id)),`unknown noteIds in route ${i}`);
    if(r.staff!==undefined) check(p.staffs.some((s,j)=>s.id===r.staff||j+1===r.staff),`invalid staff on route ${i}`);
    if(r.grid!==undefined) int(r.grid,`route ${i} grid`,1); if(r.voice!==undefined) int(r.voice,`route ${i} voice`,1,64);
  }
  const hits=routes.map(()=>0);
  for(const n of notes) {
    const found=routes.map((r,i)=>matches(r,n)?i:-1).filter(i=>i>=0);
    check(found.length,`unassigned source note ${n.id}`); check(found.slice(1).every(i=>routes[i].fallback===true),`overlapping routes ${found} for ${n.id}; later catchalls must be explicit fallback:true`);
    n.route=found[0];hits[n.route]++; if(found.length>1) n.fallbackMatches=found.slice(1);
    const r=routes[n.route],p=partById.get(r.part); n.part=p.id;
    n.staff=r.staff===undefined?(p.staffs.length===2 && n.pitch<60?2:1):p.staffs.findIndex((s,i)=>s.id===r.staff||i+1===r.staff)+1;
    if(r.staff===undefined&&p.staffs.length===2) warnings.add('Unspecified grand-staff assignments split at MIDI 60 (lower pitches on staff 2).');
  }
  for(const [i,h] of hits.entries()) if(!h) warnings.add(`Route ${i} selected no notes.`);
  const partsNotes=groupBy(notes,n=>n.part);
  const used=new Set(parts.filter(p=>profile.parts&&p.channel!=null).map(p=>p.channel));
  for(const p of parts){const ns=partsNotes.get(p.id)??[], programs=new Set(ns.map(n=>n.program));
    if(p.program===undefined){p.program=ns[0]?.program??0;if(programs.size>1)warnings.add(`Part ${p.id} has multiple source programs; using first for split metadata.`);}int(p.program,'program',0,127);
    if(!profile.parts||p.channel===undefined){const preferred=ns[0]?.channel??0;const ch=!used.has(preferred)?preferred:Array.from({length:16},(_,i)=>i).find(i=>i!==9&&!used.has(i));p.channel=ch??preferred;used.add(p.channel);} int(p.channel,'channel',0,15);
  }
  if(new Set(parts.map(p=>p.channel)).size!==parts.length) warnings.add('Some output channels are shared: isolated part splitting may require a channel override.');
  const segments=[],byId=new Map(),tieCandidates=[];
  let first=0;
  for(const n of notes) {
    while(first+1<bars.length&&bars[first].end<=n.start) first++;
    check(n.start>=bars[first].start&&n.end<=bars.at(-1).end,`bars do not cover note ${n.id} (${n.start}..${n.end})`);
    const list=[];byId.set(n.id,list);
    for(let i=first;i<bars.length&&bars[i].start<n.end;i++) {
      const b=bars[i], start=Math.max(n.start,b.start), end=Math.min(n.end,b.end);
      const grid=(routes[n.route].grid??b.grid)*notation.unit/b.unit;
      check(Number.isInteger(grid)&&b.units%grid===0,`bar ${b.bar}: snap step ${grid} does not divide ${b.units} score units`);
      const rawStart=mapUnit(b,start),rawEnd=mapUnit(b,end),slot=Math.min(b.units-grid,Math.round(rawStart/grid)*grid),stop=Math.min(b.units,Math.max(slot+grid,Math.round(rawEnd/grid)*grid));
      const s={id:n.id,part:n.part,staff:n.staff,pitch:n.pitch,bar:b.bar,start,end,slot,duration:stop-slot,startUnit:b.scoreStart+slot,endUnit:b.scoreStart+stop,continuesBefore:start>n.start,continuesAfter:end<n.end,grid,rawStart,rawEnd};
      if(list.length) tieCandidates.push({id:n.id,fromBar:b.bar-1,toBar:b.bar}); list.push(s);segments.push(s);
    }
    n.startUnit=list[0].startUnit;n.endUnit=list.at(-1).endUnit;
  }
  // Color the quantized intervals, not the performed intervals. Only merge
  // different pitches with compatible releases and a bounded SOURCE onset span.
  const lanes=new Map();
  for(const [key, ns] of groupBy(notes,n=>`${n.part}/${n.staff}`)) {
    const groups=[]; let atSlot=[];
    for(const n of ns.sort((a,b)=>a.startUnit-b.startUnit||a.start-b.start||a.pitch-b.pitch)) {
      if(atSlot[0]?.start!==n.startUnit) atSlot=[];
      const forced=routes[n.route].voice;
      let g=atSlot.find(g=>g.end===n.endUnit && g.forced===forced && n.start-g.firstTick<=notation.simultaneityTicks && !g.notes.some(x=>x.pitch===n.pitch) && byId.get(g.notes[0].id).length===byId.get(n.id).length);
      if(!g){g={start:n.startUnit,end:n.endUnit,firstTick:n.start,notes:[],forced}; groups.push(g);atSlot.push(g);}g.notes.push(n);
    }
    const ends=[],reserved=groupBy(groups.filter(g=>g.forced),g=>g.forced);
    for(const g of groups){let voice=g.forced??1;
      if(!g.forced)while((ends[voice]??0)>g.start||reserved.get(voice)?.some(r=>r.start<g.end&&r.end>g.start)) voice++;
      check((ends[voice]??0)<=g.start,`overlapping forced voice ${voice} at ${key}:${g.start}`); ends[voice]=g.end;
      for(const n of g.notes){n.voice=voice;for(const s of byId.get(n.id)) s.voice=voice;}
    }
    lanes.set(key,ends.length-1);
  }
  const events=groupBy(segments,s=>`${s.bar}/${s.part}/${s.staff}/${s.voice}`),printed=[];
  const layout=p=>p.staffs.map(s=>s.id).join('-');
  const lines=['[title "MIDI transcription draft"]',`[staves "${parts.map(p=>p.staffs.length===2?`{${layout(p)}}`:parts.length===1?`<${layout(p)}>`:layout(p)).join(' ')}"]`,...parts.map(p=>`[instrument-${layout(p)} "${p.name}"]`),''];
  let lastTempo,lastMeter;
  for(const b of bars){
    const meter=`${b.n}/${b.d}`, tempo=notation.tempoBpm??Math.round(60000000/activeAt(raw.tempos,b.start).us);
    if(!notation.tempoBpm&&raw.tempos.some(t=>t.tick>b.start&&t.tick<b.end)) warnings.add('Interior SMF tempo changes are retained in audit metadata, not engraved within a bar.');
    for(const [pi,p] of parts.entries()) for(const [si,s] of p.staffs.entries()) {
      const staff=si+1, vs=lanes.get(`${p.id}/${staff}`)??1;
      for(let voice=1;voice<=vs;voice++) {
        const tokens=[],xs=events.get(`${b.bar}/${p.id}/${staff}/${voice}`)??[];
        if(p.staffs.length>1)tokens.push(`\\staff "${staff}"`);
        if(pi===0&&si===0&&voice===1){if(lastMeter!==meter)tokens.push(`\\time ${meter}`);if(lastTempo!==tempo)tokens.push(`\\tempo 4 = ${tempo}`);}
        if(b.bar===1&&voice===1){tokens.push(`\\clef "${s.clef}"`); if(s.ottava) tokens.push(`\\ottava #${s.ottava}`);}
        if(xs.length&&(s.stem||vs>1))tokens.push((s.stem??(voice%2?'up':'down'))==='up'?'\\stemUp':'\\stemDown');
        const shift=s.clef.match(/([_^])(8|15)$/), transpose=(shift?(shift[1]==='_'?-1:1)*(shift[2]==='8'?12:24):0);
        let ref=60,cursor=0;
        const rest=gap=>{for(const d of durationParts(gap,notation.unit)) tokens.push('r'+d.token);};
        for(const [slot,heads] of [...groupBy(xs,x=>x.slot)].sort((a,b)=>a[0]-b[0])) {
          check(slot>=cursor,'internal voice collision'); rest(slot-cursor);heads.sort((a,b)=>a.pitch-b.pitch);
          const pitches=heads.map(x=>x.pitch),ids=heads.map(x=>x.id),chunks=durationParts(heads[0].duration,notation.unit);cursor=slot;
          for(const [j,d] of chunks.entries()) {
            const written=pitches.map(p=>p-transpose),atoms=written.map((p,i)=>pitchToken(p,i?written[i-1]:ref)); ref=written[0];
            const tie=j+1<chunks.length || (notation.tiePolicy!=='none' && heads.every(x=>x.continuesAfter));
            tokens.push((atoms.length===1?atoms[0]:`<${atoms.join(' ')}>`)+d.token+(tie?'~':''));
            printed.push({bar:b.bar,part:p.id,staff,voice,slot:cursor,duration:d.value,pitches,ids,tie});cursor+=d.value;
          }
        }
        rest(b.units-cursor);
        const endPart=voice===vs&&staff===p.staffs.length;
        tokens.push(!endPart?'\\'.repeat(2):pi<parts.length-1?'\\'.repeat(3):`| % ${b.bar}`); lines.push(tokens.join(' '));
      }
    }
    lastTempo=tempo;lastMeter=meter;lines.push('');
  }
  const order=profile.parts?'explicit profile order':'descending median then maximum sounding pitch; percussion channel last';
  const common={source:path.resolve(input),sourceHash:raw.sha256,ppq:raw.ppq,unit:notation.unit,bars};
  const audit={...common,profile:configPath?path.resolve(configPath):null,notation,order,parts:parts.map(({id,name,staffs,channel,program})=>({id,name,staves:staffs.length,staffs,channel,program})),notes,segments,printed,tieCandidates,
    sourceCounts:{total:raw.notes.length,selected:notes.length,byTrack:Object.fromEntries(raw.tracks.map(t=>[t.index,t.noteCount]))},excludedIds,sourceSelection:source,routes,routeHits:hits,
    quantizationDecisions:segments.map(({id,bar,start,end,grid,rawStart,rawEnd,slot,duration})=>({id,bar,start,end,grid,rawStart,rawEnd,slot,duration})),
    sourceMetadata:{tempos:raw.tempos,meters:raw.meters,keys:raw.keys,programChanges:raw.programChanges,unsupported:raw.unsupported},verification:profile.verification??{},toleranceQuarter:profile.verification?.onsetToleranceQuarter??notation.grid/notation.unit/2,warnings:[...warnings]};
  fs.mkdirSync(outDir,{recursive:true}); const write=(name,text)=>fs.writeFileSync(path.join(outDir,name),text,{flag:'wx'});
  write('score.lyl',lines.join('\n')+'\n');write('bars.json',JSON.stringify(common,null,2)+'\n');write('audit.json',JSON.stringify(audit,null,2)+'\n');
  console.log(JSON.stringify({output:path.resolve(outDir),bars:bars.length,notes:notes.length,segments:segments.length,warnings:audit.warnings},null,2));
}
try {
  const [input,...args]=process.argv.slice(2), options=new Map();
  for(let i=0;i<args.length;i+=2){check(['--config','--out-dir'].includes(args[i])&&args[i+1]&&!args[i+1].startsWith('--')&&!options.has(args[i]),'invalid CLI options');options.set(args[i],args[i+1]);}
  check(input&&!input.startsWith('-')&&options.has('--out-dir'),'usage: node transcribe.mjs INPUT.mid [--config PROFILE.json] --out-dir OUT');
  transcribe(input,options.get('--config'),options.get('--out-dir'));
} catch(e){console.error(`transcribe-midi: ${e.message}`);process.exitCode=1;}
