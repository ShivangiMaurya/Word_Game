document.addEventListener("DOMContentLoaded", () => {
const words = ["javascript", "programming", "frontend", "coding" ,"ninja", "closures", "eventloop", "callbacks"];

    let selectedWord, guessedLetters, attemptsLeft, timeLeft, timer;

    const wordDisplay = document.getElementById("wordDisplay");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");
    const timeDisplay = document.getElementById("timeLeft");
    const letterInput = document.getElementById("letterInput");
    const guessButton = document.getElementById("guessButton");
    const retryButton = document.getElementById("retryButton");

    function initializeGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = new Set();
        attemptsLeft = 6;
        timeLeft = 30;

        message.textContent = "";
        guessButton.disabled = false;
        letterInput.disabled = false;
        letterInput.value = "";

        updateDisplay();
        startTimer();
    }

    function updateDisplay() {
        wordDisplay.textContent = selectedWord.split('')
            .map(letter => guessedLetters.has(letter) ? letter : "_").join(" ");
        attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
        timeDisplay.textContent = `Time Left: ${timeLeft}s`;
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                message.textContent = `⏳ Time's up! The word was "${selectedWord}".`;
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        guessButton.disabled = true;
        letterInput.disabled = true;
        clearInterval(timer);
    }

    guessButton.addEventListener("click", () => {
        const guess = letterInput.value.toLowerCase();
        if (guess && /^[a-z]$/.test(guess) && !guessedLetters.has(guess)) {
            guessedLetters.add(guess);
            if (!selectedWord.includes(guess)) {
                attemptsLeft--;
            }
            updateDisplay();
        }

        letterInput.value = "";

        if (!wordDisplay.textContent.includes("_")) {
            message.textContent = "🎉 You Win! 🎉";
            endGame();
        } else if (attemptsLeft === 0) {
            message.textContent = `Game Over! The word was "${selectedWord}".`;
            endGame();
        }
    });

    retryButton.addEventListener("click", initializeGame);

    initializeGame();
});


