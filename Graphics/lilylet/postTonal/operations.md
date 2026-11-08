# Twelve-tone operations on the Op. 27 row: T₁₁, T₁₀I, R

Transposing **P₁₁** by *T₁₁* gives **P₁₀**; inverting with *T₁₀I* (subtract each pitch class from 10) gives **I₀**; reading a row backwards (*R*) gives its retrograde, labelled by its final pitch class (**R₁₀**, **RI₀**). Under each row are its ordered pitch-class intervals.

```lyl
\omit Score.TimeSignature \omit Score.BarLine \key c \major \clef "treble" b'4^\markup "P₁₁" g fs bf a gs d' c ef cs f e | %1
```

$$
\def\arraycolsep{1.6pt}
\begin{array}{rlccccccccccccccccccccccc}
 & \mathbf{P}_{11}{:} & 11 &  & 7 &  & 6 &  & 10 &  & 9 &  & 8 &  & 2 &  & 0 &  & 3 &  & 1 &  & 5 &  & 4 \\
 & \scriptsize\textit{intervals:} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{6}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{3}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  \\
\scriptstyle T_{11} & \Big\downarrow &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  \\
 & \mathbf{P}_{10}{:} & 10 &  & 6 &  & 5 &  & 9 &  & 8 &  & 7 &  & 1 &  & 11 &  & 2 &  & 0 &  & 4 &  & 3 \\
 &  &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{6}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{3}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  \\
\scriptstyle R & \Big\downarrow &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  \\
 & \mathbf{R}_{10}{:} & 3 &  & 4 &  & 0 &  & 2 &  & 11 &  & 1 &  & 7 &  & 8 &  & 9 &  & 5 &  & 6 &  & 10 \\
 &  &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{2}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{9}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{2}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{6}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  \\
 & \scriptsize\text{(from }\mathbf{P}_{10}\text{)} &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  \\
\scriptstyle T_{10}I & \Big\downarrow &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  \\
 & \mathbf{I}_{0}{:} & 0 &  & 4 &  & 5 &  & 1 &  & 2 &  & 3 &  & 9 &  & 11 &  & 8 &  & 10 &  & 6 &  & 7 \\
 &  &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{6}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{2}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{9}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{2}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{1}}{\scriptstyle\vee} &  \\
\scriptstyle R & \Big\downarrow &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  &  \\
 & \mathbf{RI}_{0}{:} & 7 &  & 6 &  & 10 &  & 8 &  & 11 &  & 9 &  & 3 &  & 2 &  & 1 &  & 5 &  & 4 &  & 0 \\
 &  &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{3}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{10}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{6}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{4}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{11}}{\scriptstyle\vee} &  & \underset{\scriptstyle\mathit{8}}{\scriptstyle\vee} & 
\end{array}
$$
