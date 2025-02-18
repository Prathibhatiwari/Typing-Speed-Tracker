document.addEventListener('DOMContentLoaded', () => {
    const typingArea = document.getElementById('typing-area');
    const startButton = document.getElementById('start-button');
    const timerDisplay = document.getElementById('timer');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    let testDuration = 0;
    let timerInterval;
    let startTime;
    let typedCharacters = 0;
    let errors = 0;

    function startTest() {
        const selectedDuration = document.getElementById('test-duration').value;
        testDuration = parseInt(selectedDuration) * 60;
        startTime = Date.now();
        typedCharacters = 0;
        errors = 0;

        typingArea.value = '';
        typingArea.focus();

        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        typingArea.addEventListener('input', updateMetrics);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = testDuration - elapsedTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            typingArea.removeEventListener('input', updateMetrics);
            typingArea.disabled = true;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateMetrics() {
        const text = typingArea.value;
        typedCharacters = text.length;

        const wordsTyped = text.split(/\s+/).filter(Boolean).length;
        const wpm = Math.round((wordsTyped / ((Date.now() - startTime) / 1000)) * 60);
        wpmDisplay.textContent = wpm;

        const totalCharacters = text.replace(/\s+/g, '').length;
        errors = text.length - totalCharacters;
        const accuracy = Math.round(((totalCharacters - errors) / totalCharacters) * 100);
        accuracyDisplay.textContent = accuracy;
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    startButton.addEventListener('click', startTest);
    darkModeToggle.addEventListener('click', toggleDarkMode);
});
