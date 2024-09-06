document.addEventListener('DOMContentLoaded', () => {
    const words = [
        { word: 'JAVASCRIPT', hint: 'A popular programming language' },
        { word: 'HTML', hint: 'Markup language for creating web pages' },
        { word: 'CSS', hint: 'Stylesheet language used for describing the look of a document' },
        { word: 'JJC', hint: ' What is the song you love most which was saung by SM' },
    
    ];
    
    let selectedWord, hint, displayedWord, attemptsLeft;
    
    const hintDisplay = document.getElementById('hintText');
    const wordDisplay = document.getElementById('wordDisplay');
    const letterInput = document.getElementById('letterInput');
    const guessButton = document.getElementById('guessLetter');
    const attemptsDisplay = document.getElementById('attemptsLeft');
    const messageDisplay = document.getElementById('message');
    const restartButton = document.getElementById('restartGame');
    
    guessButton.addEventListener('click', makeGuess);
    restartButton.addEventListener('click', startGame);
    
    startGame();
    
    function startGame() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const wordObject = words[randomIndex];
        selectedWord = wordObject.word;
        hint = wordObject.hint;
        displayedWord = '_'.repeat(selectedWord.length);
        attemptsLeft = 6; // Number of allowed attempts
        
        hintDisplay.textContent = hint;
        wordDisplay.textContent = displayedWord;
        attemptsDisplay.textContent = attemptsLeft;
        letterInput.value = '';
        letterInput.focus();
        messageDisplay.textContent = 'Try to guess the hidden word!';
        guessButton.disabled = false;
        restartButton.classList.add('hidden');
    }
    
    function makeGuess() {
        const guessedLetter = letterInput.value.toUpperCase();
        letterInput.value = '';
        letterInput.focus();
        
        if (!guessedLetter || guessedLetter.length !== 1 || !/[A-Z]/.test(guessedLetter)) {
            messageDisplay.textContent = 'Please enter a single valid letter.';
            return;
        }
        
        let newDisplayedWord = '';
        let correctGuess = false;
        
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === guessedLetter) {
                newDisplayedWord += guessedLetter;
                correctGuess = true;
            } else {
                newDisplayedWord += displayedWord[i];
            }
        }
        
        if (correctGuess) {
            displayedWord = newDisplayedWord;
            wordDisplay.textContent = displayedWord;
            if (displayedWord === selectedWord) {
                messageDisplay.textContent = 'Congratulations! You guessed the word!';
                guessButton.disabled = true;
                restartButton.classList.remove('hidden');
                return;
            }
        } else {
            attemptsLeft--;
            attemptsDisplay.textContent = attemptsLeft;
            if (attemptsLeft === 0) {
                messageDisplay.textContent = `Game over! The word was "${selectedWord}".`;
                guessButton.disabled = true;
                restartButton.classList.remove('hidden');
                return;
            }
        }
        
        messageDisplay.textContent = correctGuess ? 'Good guess!' : 'Try again!';
    }
});
