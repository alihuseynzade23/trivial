var questions = [
    {
        question: "What was the first full length CGI movie?",
        answers: [
            "A Bug's Life",
            "Monsters Inc.",
            "Toy Story",
            "The Lion King",
        ],
        correctAnswer: "Toy Story",
        image: "/images/toystory.gif",
    },
    {
        question: "Which of these is NOT a name of one of the Spice Girls?",
        answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
        correctAnswer: "Fred Spice",
        image: "images/spicegirls.gif",
    },
    {
        question: "Which NBA team won the most titles in the 90s?",
        answers: [
            "New York Knicks",
            "Portland Trailblazers",
            "Los Angeles Lakers",
            "Chicago Bulls",
        ],
        correctAnswer: "Chicago Bulls",
        image: "/images/bulls.gif",
    },
    {
        question:
            "Which group released the hit song, 'Smells Like Teen Spirit'?",
        answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
        correctAnswer: "Nirvana",
        image: "images/nirvanabark.gif",
    },
    {
        question:
            'Which popular Disney movie featured the song, "Circle of Life"?',
        answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
        correctAnswer: "The Lion King",
        image: "/images/lionking.gif",
    },
    {
        question:
            'Finish game line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."',
        answers: ["Dice", "Mirror", "Fresh", "Cab"],
        correctAnswer: "Fresh",
        image: "/images/fresh.gif",
    },
    {
        question: "What was Doug's best friend's name?",
        answers: ["Skeeter", "Mark", "Zach", "Cody"],
        correctAnswer: "Skeeter",
        image: "/images/skeeter.gif",
    },
    {
        question:
            "What was the name of the principal at Bayside High in Saved By The Bell?",
        answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
        correctAnswer: "Mr.Belding",
        image: "/images/belding.gif",
    },
];

let panel = document.getElementById("quiz-area");
let startButton = document.getElementById("start");
let startOverButton = document.createElement("button");
let intervalId;
let answeredQuestionInterval;

// Start of functionality
var game = {
    currentQuestion: 0,
    counter: 30,
    correctAnswers: 0,
    incorrectAnswers: 0,

    timerCountdown: () => {
        game.counter--;

        if (game.counter >= 0) {
            // Update the displayed timer
            let timerH3 = document.querySelector("h3.timer");
            timerH3.textContent =
                "Time remaining: " + game.counter + " Seconds";
        } else {
            clearInterval(intervalId);
            game.timeUp();
        }
    },

    loadQuestion: () => {
        intervalId = setInterval(game.timerCountdown, 1000);

        let timerH3 = document.createElement("h3");
        timerH3.textContent = "Time remaining: " + game.counter + " Seconds";
        timerH3.classList.add("timer"); // Add a class to the timer element
        panel.append(timerH3);

        let questionText = document.createElement("h3");
        questionText.textContent = questions[game.currentQuestion].question;
        questionText.style.marginBottom = "2rem";
        panel.append(questionText);

        for (
            let i = 0;
            i < questions[game.currentQuestion].answers.length;
            i++
        ) {
            let answerBtn = document.createElement("button"); // Создаем кнопку для ответа
            let answerBtnTextContent =
                questions[game.currentQuestion].answers[i];
            answerBtn.value = answerBtnTextContent;
            answerBtn.textContent = answerBtnTextContent;
            answerBtn.style.margin = "1rem auto";
            panel.append(answerBtn);

            answerBtn.addEventListener("click", (e) => {
                if (
                    answerBtn.value ===
                    questions[game.currentQuestion].correctAnswer
                ) {
                    game.answeredCorrectly();
                } else {
                    game.answeredIncorrectly();
                }
            });
        }
    },
    answeredCorrectly: () => {
        clearInterval(intervalId);
        game.correctAnswers++;
        panel.innerHTML = "";

        panel.innerHTML = `<h3>Correct!</h3>
        <img src="${questions[game.currentQuestion].image}"
        />`;
        answeredQuestionInterval = setInterval(() => {
            clearInterval(answeredQuestionInterval);
            game.nextQuestion();
        }, 3000);
    },

    answeredIncorrectly: () => {
        clearInterval(intervalId);
        game.incorrectAnswers++;
        panel.innerHTML = "";
        panel.innerHTML = `<h3>Nope!</h3>
        <h4>The Correct Answer was: ${
            questions[game.currentQuestion].correctAnswer
        }</h4>
        <img src="${questions[game.currentQuestion].image}"
        />`;
        answeredQuestionInterval = setInterval(() => {
            clearInterval(answeredQuestionInterval);
            game.nextQuestion();
        }, 3000);
    },

    timeUp: () => {
        panel.innerHTML = "";
        panel.innerHTML = `<h3>Out of Time!</h3>
        <h4>The Correct Answer was: ${
            questions[game.currentQuestion].correctAnswer
        }</h4>
        <img src="${questions[game.currentQuestion].image}"
        />`;
    },

    nextQuestion: () => {
        panel.innerHTML = "";
        game.currentQuestion++;
        game.loadQuestion();

        if (game.currentQuestion === questions.length) {
            game.results();
            clearInterval(intervalId);
        }
    },

    results: () => {
        // Nado proverit yesli mi doshli do konca voprosa
        // Obnuli vse
        // I pokaji rezultati
        // Plus pokaji knopku reset

        panel.innerHTML = "";
        panel.innerHTML = `
        <h1>Test</h1>
        `;
    },

    reset: () => {},
};

// CLICK EVENTS
startButton.addEventListener("click", () => {
    startButton.style.display = "none";

    game.loadQuestion();
});

// game.answerBtn.addEventListener("click", () => {
//     if (answerBtn.value !== questions[game.currentQuestion].correctAnswer) {
//         game.answeredIncorrectly();
//     }
// });
