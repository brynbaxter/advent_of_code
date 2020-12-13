let input = `30
73
84
136
132
117
65
161
49
68
139
46
21
127
109
153
163
160
18
22
131
146
62
113
172
150
171
98
93
130
170
59
1
110
2
55
37
44
148
102
40
28
35
43
56
169
33
5
141
83
15
105
142
36
116
11
45
82
10
17
159
140
12
108
29
72
121
52
91
166
88
97
118
99
124
149
16
9
143
104
57
79
123
58
96
24
162
23
92
69
147
156
25
133
34
8
85
76
103
122`;

// let input = document.querySelector('pre').innerText;

let adaptorArray = input
  .split('\n')
  .map((x) => parseInt(x, 10))
  .sort((a, b) => {
    return a - b;
  });

let currentJoltage = 0;
let oneJoltDiffs = 0;
let twoJoltDiffs = 0;
let threeJoltDiffs = 0;

for (let i = 0; i < adaptorArray.length; i++) {
  let joltageDifference = adaptorArray[i] - currentJoltage;
  currentJoltage = adaptorArray[i];
  switch (joltageDifference) {
    case 1:
      oneJoltDiffs++;
      break;
    case 2:
      break;
    case 3:
      threeJoltDiffs++;
      break;
    default:
      break;
  }
}

currentJoltage += 3;
threeJoltDiffs += 1;
let joltDiffsProduct = oneJoltDiffs * threeJoltDiffs;

console.log(`currentJoltage: ${currentJoltage}`);
console.log(`oneJoltDiffs: ${oneJoltDiffs}`);
console.log(`twoJoltDiffs: ${twoJoltDiffs}`);
console.log(`threeJoltDiffs: ${threeJoltDiffs}`);
console.log(`joltDiffsProduct: ${joltDiffsProduct}`);
