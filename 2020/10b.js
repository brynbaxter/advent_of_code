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

let adaptorArray = input.split('\n').map((x) => parseInt(x, 10));
adaptorArray.push(0);
adaptorArray = adaptorArray.sort((a, b) => {
  return a - b;
});

console.log(adaptorArray);

let currentJoltage = 0;

let streak2 = 0;
let streak3 = 0;
let streak4 = 0;
let streak5 = 0;
let streak6 = 0;
let streak7 = 0;

let singleStepStreak = 0;
let maxSingleStepStreak = 0;

for (let i = 0; i < adaptorArray.length + 1; i++) {
  let joltageDifference = adaptorArray[i] - currentJoltage;
  currentJoltage = adaptorArray[i];
  if (joltageDifference == 1) {
    singleStepStreak++;
    if (singleStepStreak > maxSingleStepStreak) {
      maxSingleStepStreak = singleStepStreak;
    }
  } else if (joltageDifference == 3 || i == adaptorArray.length) {
    switch (singleStepStreak) {
      case 0:
      case 1:
        break;
      case 2:
        streak2++;
        break;
      case 3:
        streak3++;
        break;
      case 4:
        streak4++;
        break;
      case 5:
        streak5++;
        break;
      case 6:
        streak6++;
        break;
      case 7:
        streak7++;
        break;
      default:
        console.log('What the heck is going on!?!?');
    }

    console.log('singleStepStreak', singleStepStreak);

    singleStepStreak = 0;
  }
  console.log(adaptorArray[i]);
}

console.log('');
console.log('streak2', streak2);
console.log('streak3', streak3);
console.log('streak4', streak4);

console.log(2 ** streak2 * 4 ** streak3 * 7 ** streak4);
