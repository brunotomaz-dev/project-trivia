const userMock = {
  name: "Bruno Tomaz",
  email: 'meuemail@mail.com'
}

export const stringRanking = '[{"gravatarEndPoint":"https://www.gravatar.com/avatar/1cb6abcfe8b268401155c97f5c7b71ed","email":"leonardo@schneider.com","name":"Leonardo Schneider","score":176},{"gravatarEndPoint":"https://www.gravatar.com/avatar/a005d9223ef4561f21b282cec39ac7ec","email":"felipe@donatto.com","name":"Felipe Donatto","score":70},{"gravatarEndPoint":"https://www.gravatar.com/avatar/d87da56c4a662552aedaa8fcf6115f66","email":"bruno@tomaz.com","name":"Bruno Tomaz","score":204},{"gravatarEndPoint":"https://www.gravatar.com/avatar/89e4e654019119f10b00f1eaf1b9a37d","email":"danilo@leao.com","name":"Danilo Leão","score":107}]'

export const results = [
  {
    category: "Sports",
    type: "multiple",
    difficulty: "medium",
    question: "Which team was the 2015-2016 NBA Champions?",
    correct_answer: "Cleveland Cavaliers",
    incorrect_answers: [
      "Golden State Warriors",
      "Toronto Raptors",
      "Oklahoma City Thunders"
    ]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "hard",
    question: "Which was the first M-rated video game developed by Squaresoft/Square Enix?",
    correct_answer: "Parasite Eve",
    incorrect_answers: [
      "Final Fantasy VIII",
      "Front Mission",
      "Vagrant Story"
    ]
  },
  {
    category: "Science: Mathematics",
    type: "boolean",
    difficulty: "hard",
    question: "L&#039;H&ocirc;pital was the mathematician who created the homonymous rule that uses derivatives to evaluate limits with indeterminations.",
    correct_answer: "False",
    incorrect_answers: [
      "True"
    ]
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question: "What is the boss round featured in the &quot;Call Of Duty: Zombies&quot; map &quot;Five&quot;?",
    correct_answer: "The Pentagon Thief",
    incorrect_answers: [
      "Hellhounds",
      "Jumping Jacks",
      "Napalm Zombie"
    ]
  },
  {
    category: "Animals",
    type: "multiple",
    difficulty: "medium",
    question: "What is the collective noun for rats?",
    correct_answer: "Mischief",
    incorrect_answers: [
      "Pack",
      "Race",
      "Drift"
    ]
  }
];

export const firstInitialState = {
  player: {
    name:"Leonardo",
    assertions: 0,
    email:"leo@gmail.com",
    gravatarEndPoint:"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 0,
  },
  gameReducer: {},
}

export const secondInitialState = {
  player: {
    name: "Leonardo",
    assertions: 5,
    email: "leo@gmail.com",
    gravatarEndPoint: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 200,
  },
  gameReducer: {},
}

export const thirdInitialState = {
  player: {
    name: "Leonardo",
    assertions: 5,
    email: "leo@gmail.com",
    gravatarEndPoint: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 200,
  },
  gameReducer: {
    questions: results,
    responseCode: 0,
  },
}

export const fourthInitialState = {
  player: {
    name: "Leonardo",
    assertions: 5,
    email: "leo@gmail.com",
    gravatarEndPoint: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
    score: 200,
  },
  gameReducer: {
    questions: results,
    responseCode: 3,
  },
}

export const clear = {
  player: {
    name: '',
    assertions: 0,
    email: '',
    gravatarEndPoint: '',
    score: 0,
  },
  gameReducer: {},
}

export default userMock;
