var questions = [{
    question: "What was the first full length CGI movie?",
    answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
    correctAnswer: "Toy Story",
    image: "/images/toystory.gif"
  }, {
    question: "Which of these is NOT a name of one of the Spice Girls?",
    answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
    correctAnswer: "Fred Spice",
    image: "/images/spicegirls.gif"
  }, {
    question: "Which NBA team won the most titles in the 90s?",
    answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
    correctAnswer: "Chicago Bulls",
    image: "/images/bulls.gif"
  }, {
    question: "Which group released the hit song, 'Smells Like Teen Spirit'?",
    answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
    correctAnswer: "Nirvana",
    image: "/images/nirvanabark.gif"
  }, {
    question: "Which popular Disney movie featured the song, \"Circle of Life\"?",
    answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
    correctAnswer: "The Lion King",
    image: "/images/lionking.gif"
  }, {
    question: "Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near, the license plate said...\"",
    answers: ["Dice", "Mirror", "Fresh", "Cab"],
    correctAnswer: "Fresh",
    image: "/images/fresh.gif"
  }, {
    question: "What was Doug's best friend's name?",
    answers: ["Skeeter", "Mark", "Zach", "Cody"],
    correctAnswer: "Skeeter",
    image: "/images/skeeter.gif"
  }, {
    question: "What was the name of the principal at Bayside High in Saved By The Bell?",
    answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
    correctAnswer: "Mr.Belding",
    image: "/images/belding.gif"
  }];

const gameArea = document.getElementById('game-area')
const button = document.getElementById('startButton');
let intervalId;
let timerElement;


const game = {
  timer: 30, 
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentQuestion: 0,

  countdown: () => {
    timerElement.innerHTML = `Time Remaining: ${game.timer} seconds`;
    // console.log('test')
    game.timer--;

    if (game.timer < 0) {
      clearInterval(intervalId);
      // Добавьте здесь логику для завершения игры
    }
  },

  correctAnswered: () => {
    newBtn.addEventListener('click', () => {
      // Check if the clicked answer is correct
      if (newBtn.innerHTML === questions[game.currentQuestion].correctAnswer) {
        console.log('Correct', game.correctAnswers)       
        game.correctAnswers++;
  }
    })
  },

  incorrectAnswered: () => {
    newBtn.addEventListener('click', () => {
      // Check if the clicked answer is correct
      if (newBtn.innerHTML === questions[game.currentQuestion].correctAnswer) {
        console.log('Incorrect', game.incorrectAnswers)
        game.incorrectAnswers++;
  }
    })
  },


  loadQuestions: () => {
    // Create the timer element at the beginning
    if (!timerElement) {
      timerElement = document.createElement('span');
      gameArea.append(timerElement);
    }
    // Create the question heading
    let newH2 = document.createElement('h2');
    newH2.innerHTML = `${questions[game.currentQuestion].question}`;
    gameArea.append(newH2);

    // Create answer buttons here...
    for (let i = 0; i < questions[game.currentQuestion].answers.length; i++) {
      let newBtn = document.createElement('button');
      newBtn.innerHTML = `${questions[game.currentQuestion].answers[i]}`;
      newBtn.style.width = '400px';
      newBtn.style.margin = '5px';
      gameArea.append(newBtn);

      // Add click event listener to answer button
      newBtn.addEventListener('click', () => {
        // Check if the clicked answer is correct
       

        // Increment the currentQuestion counter
        game.currentQuestion++;

        // Clear the gameArea
        gameArea.innerHTML = '';

        // Check if there are more questions, if not, end the game
        if (game.currentQuestion < questions.length) {
          // Load the next question
          game.loadQuestions();
        } else {
          // Add logic to end the game when all questions are answered
          // Display the final score or result
        }
      });
    }
  }
}



button.addEventListener('click', () => {
  button.style.display = 'none'
  intervalId = setInterval(game.countdown, 1000);
  game.loadQuestions()
})

