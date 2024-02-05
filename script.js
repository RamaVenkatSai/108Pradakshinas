document.addEventListener('DOMContentLoaded', function () {
    const roundsContainer = document.getElementById('rounds-container');
    const roundTimes = document.getElementById('round-times');
    let lastStartTime = new Date(); // Initialize start time for the first round

    for (let i = 0; i < 108; i++) {
        const round = document.createElement('div');
        round.classList.add('round');
        round.textContent = i + 1; // Adds numbering
        roundsContainer.appendChild(round);

        round.addEventListener('click', function () {
            const currentTime = new Date();
            if (i > 0) { // Ensures this is not the first round
                // Calculate time taken for the previous round
                const timeTaken = (currentTime - lastStartTime) / 1000;
                displayTimeForRound(i, lastStartTime, currentTime, timeTaken.toFixed(2));
            }
            lastStartTime = currentTime; // Update last start time for the next round

            // Highlight the current round
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
            }

            // Check if it's the last round and display its time
            if (i === 107) {
                displayTimeForRound(108, lastStartTime, currentTime, "N/A");
            }
        });
    }

    function displayTimeForRound(roundNumber, startTime, endTime, timeTaken) {
        let timeDisplay = document.getElementById(`time-for-round-${roundNumber}`);
        if (!timeDisplay) {
            timeDisplay = document.createElement('div');
            timeDisplay.id = `time-for-round-${roundNumber}`;
            roundTimes.appendChild(timeDisplay);
        }

        timeDisplay.innerHTML = `Round ${roundNumber}: Start Time - ${startTime.toLocaleTimeString()}, End Time - ${endTime.toLocaleTimeString()}, Time Taken - ${timeTaken} seconds`;
    }
});
