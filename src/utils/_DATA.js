let users = {
  maverick: {
    id: 'maverick',
    name: 'Tom Cruise',
    avatarURL: "https://openclipart.org/download/303984/1531069798.svg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  iceman: {
    id: 'iceman',
    name: 'Val Kilmer',
    avatarURL: "https://openclipart.org/download/4034/SaraSara-Ice-cube-2.svg",
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  goose: {
    id: 'goose',
    name: 'Anthony Edwards',
    avatarURL: "https://openclipart.org/download/248178/Gans-coloured.svg",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'maverick',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['maverick'],
      text: 'Follow orders and do as you are told.',
    },
    optionTwo: {
      votes: [],
      text: 'Be a rebel and do your own thing.'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'goose',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'Die during a plane ejection.',
    },
    optionTwo: {
      votes: ['goose', 'maverick'],
      text: 'Die while singing karaoke.'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'maverick',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'Listen to Kenny Loggins.',
    },
    optionTwo: {
      votes: ['maverick'],
      text: 'Listen to the band Berlin.'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'iceman',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'Look good playing volleyball.',
    },
    optionTwo: {
      votes: ['maverick'],
      text: 'Look good flying a jet.'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'iceman',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['iceman'],
      text: 'Help an Ewok on a quest with a baby.',
    },
    optionTwo: {
      votes: ['goose'],
      text: 'Wear a Batman costume with plastic nipples.'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'goose',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['goose'],
      text: "Be married to 80's Meg Ryan.",
    },
    optionTwo: {
      votes: ['iceman'],
      text: "Be married to 80's Tom Cruise."
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}