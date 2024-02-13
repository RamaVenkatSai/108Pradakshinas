document.addEventListener('DOMContentLoaded', function () {
    const roundsContainer = document.getElementById('rounds-container');
    const roundTimes = document.getElementById('round-times');
    let lastStartTime = new Date(); // Initialize start time for the first round

    // Create a button for displaying round 1 time manually
    const displayRound1TimeBtn = document.createElement('button');
    displayRound1TimeBtn.textContent = 'Display Round 1 Time';
    document.body.appendChild(displayRound1TimeBtn);
    displayRound1TimeBtn.addEventListener('click', function() {
        const currentTime = new Date();
        // Manually calculate and display time for round 1
        const timeTaken = (currentTime - lastStartTime) / 1000;
        displayTimeForRound(1, lastStartTime, currentTime, timeTaken.toFixed(2));
    });

    for (let i = 0; i < 108; i++) {
        const round = document.createElement('div');
        round.classList.add('round');
        round.textContent = i + 1; // Adds numbering
        roundsContainer.appendChild(round);

        round.addEventListener('click', function () {
            const currentTime = new Date();
            // Skip automatic time display for round 1
            if (i >= 1) { // Now allows the event for all rounds but skips automatic display logic for round 1
                // Calculate time taken for the previous round
                const timeTaken = (currentTime - lastStartTime) / 1000;
                displayTimeForRound(i + 1, lastStartTime, currentTime, timeTaken.toFixed(2));
            }
            lastStartTime = currentTime; // Update last start time for the next round

            // Highlight the current round
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
            }

            // Special handling for the last round's time display
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
