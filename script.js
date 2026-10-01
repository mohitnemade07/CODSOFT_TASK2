const quizQuestions = [
    {
        question: "You receive an email saying your account will be closed in 30 minutes unless you click a link. What should you do?",
        options: [
            "Click the link immediately",
            "Reply with your password",
            "Verify the message through the organization's official website",
            "Forward the email to your friends"
        ],
        answer: 2
    },

    {
        question: "Which is a warning sign of a phishing email?",
        options: [
            "An expected message from a known contact",
            "A suspicious sender address",
            "A normal company newsletter",
            "A message you were expecting"
        ],
        answer: 1
    },

    {
        question: "What should you check before entering your password on a website?",
        options: [
            "The exact website domain",
            "The number of images on the page",
            "The website background color",
            "The font used by the website"
        ],
        answer: 0
    },

    {
        question: "Which technique creates pressure so a victim acts without thinking?",
        options: [
            "Encryption",
            "Urgency",
            "Backup",
            "Authentication"
        ],
        answer: 1
    },

    {
        question: "What is a good response to a suspicious email asking for an OTP?",
        options: [
            "Send the OTP quickly",
            "Click the attached file",
            "Verify the request through a trusted channel",
            "Reply asking for another OTP"
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    showQuiz();
}

function showQuiz() {
    const main = document.querySelector("main");

    const question = quizQuestions[currentQuestion];

    main.innerHTML = `
        <section class="quiz-container">
            <span class="module-number">
                QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}
            </span>

            <h2>${question.question}</h2>

            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option"
                        onclick="checkAnswer(${index})">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <p id="quiz-feedback"></p>
        </section>
    `;
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = quizQuestions[currentQuestion].answer;
    const feedback = document.getElementById("quiz-feedback");
    const buttons = document.querySelectorAll(".quiz-option");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        feedback.textContent = "✓ Correct! Good security awareness.";
        feedback.className = "correct";
    } else {
        feedback.textContent =
            "✗ Incorrect. Review the security guidance and stay cautious.";
        feedback.className = "incorrect";
    }

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            showQuiz();
        } else {
            showResult();
        }
    }, 1200);
}

function showResult() {
    const main = document.querySelector("main");

    const percentage =
        Math.round((score / quizQuestions.length) * 100);

    let message;

    if (percentage === 100) {
        message = "Excellent! You have strong phishing awareness.";
    } else if (percentage >= 60) {
        message = "Good job! Review the modules to strengthen your awareness.";
    } else {
        message = "Keep learning! Review the training modules and try again.";
    }

    main.innerHTML = `
        <section class="quiz-result">
            <h2>Quiz Complete!</h2>

            <p class="score">
                Your Score: ${score}/${quizQuestions.length}
            </p>

            <p class="percentage">
                ${percentage}%
            </p>

            <p>${message}</p>

            <button onclick="location.reload()">
                Return to Training
            </button>
        </section>
    `;
}