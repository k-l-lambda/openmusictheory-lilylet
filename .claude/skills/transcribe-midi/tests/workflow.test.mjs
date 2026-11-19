// Synthetic fixtures only: no private MIDI, network, or machine paths.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {readMidi} from '../smf.mjs';
import {parseCode} from '@k-l-lambda/lilylet';
const skill=fileURLToPath(new URL('../',import.meta.url));
function temp(t){const d=fs.mkdtempSync(path.join(os.tmpdir(),'midi-skill-test-'));t.after(()=>fs.rmSync(d,{recursive:true,force:true}));return d;}
function run(d,script,args,success=true){const r=spawnSync(process.execPath,[path.join(skill,script),...args],{cwd:d,encoding:'utf8'});if(success)assert.equal(r.status,0,r.stderr+'\n'+r.stdout);else assert.notEqual(r.status,0,'expected error: '+script);return r;}
function vlq(n){const a=[n&127];while(n>>=7)a.unshift(128|(n&127));return a;}
function save(d,tracks){const chunk=(name,b)=>{b=Buffer.from(b);const len=Buffer.alloc(4);len.writeUInt32BE(b.length);return Buffer.concat([Buffer.from(name),len,b]);}; const out=[chunk('MThd',[0,tracks.length===1?0:1,0,tracks.length,0,96])];for(const events of tracks){let prev=0;const bytes=[];for(const [t,...message] of events){bytes.push(...vlq(t-prev),...message);prev=t;}out.push(chunk('MTrk',[...bytes,0,255,47,0]));}const mid=path.join(d,'input.mid');fs.writeFileSync(mid,Buffer.concat(out));return mid;}
const json=p=>JSON.parse(fs.readFileSync(p));
const allNotes=m=>m.notes.map(n=>[n.start,n.end,n.pitch,n.velocity]).sort();
test('format 0: track zero is music; meter and tempo timeline; adjacent repeated attacks',t=>{
 const d=temp(t), mid=save(d,[[[0,255,88,4,3,2,24,8],[0,192,11],[0,144,84,80],[96,128,84,40],[96,144,84,97],[192,128,84,40],[192,144,79,80],[288,255,88,4,2,2,24,8],[288,255,81,3,9,39,192],[336,128,79,40],[336,144,76,90],[480,128,76,40]]]);
 assert.deepEqual(readMidi(mid).meters.map(x=>[x.tick,x.n,x.d]),[[0,3,4],[288,2,4]]);
 run(d,'transcribe.mjs',[mid,'--out-dir','draft']);const audit=json(path.join(d,'draft/audit.json'));assert.equal(audit.notes.length,4);assert.deepEqual(audit.bars.map(x=>[x.n,x.d]),[[3,4],[2,4]]);const score='draft/score.lyl'; const code=fs.readFileSync(path.join(d,score),'utf8');assert.equal(parseCode(code).measures.length,2);assert.match(code,/~\s*/);
 run(d,'verify.mjs',[mid,score,'draft/audit.json','ok']);
 // Parseable but wrong: move the entire first pitched attack by an octave.
 const bad=code.replace(/(\s)([cdefgab](?:s|f)?[,']*)(?=\d)/,(m,sp,n)=>sp+n+"'");assert.notEqual(bad,code);fs.writeFileSync(path.join(d,'bad.lyl'),bad);run(d,'verify.mjs',[mid,'bad.lyl','draft/audit.json','bad-check'],false);
 run(d,'transcribe.mjs',[mid,'--out-dir','draft'],false);
});
test('default part order is register-based, not source track number; drums last',t=>{
 const d=temp(t);const tr=(ch,prog,note)=>[[0,192+ch,prog],[0,144+ch,note,80],[96,128+ch,note,0]];
 const mid=save(d,[tr(0,0,43),tr(9,0,81),tr(2,11,84)]);run(d,'transcribe.mjs',[mid,'--out-dir','draft']);const a=json(path.join(d,'draft/audit.json'));assert.deepEqual(a.parts.map(p=>p.program),[11,0,0]);assert.equal(a.parts[2].channel,9);
 run(d,'split-midi.mjs',[mid,'draft/audit.json','split.mid']);assert.deepEqual(allNotes(readMidi(path.join(d,'split.mid'))),allNotes(readMidi(mid)));run(d,'split-midi.mjs',[mid,'draft/audit.json','split.mid'],false);
});
