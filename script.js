document.addEventListener('DOMContentLoaded', function () {
    const roundsContainer = document.getElementById('rounds-container');
    const roundTimes = document.getElementById('round-times');
    let lastStartTime = new Date(); // Initialize start time for the first round
    let times = []; // Array to store time for each round

    for (let i = 0; i < 108; i++) {
        const round = document.createElement('div');
        round.classList.add('round');
        round.textContent = i + 1; // Adds numbering
        roundsContainer.appendChild(round);

        round.addEventListener('click', function () {
            const currentTime = new Date();
            if (i > 0) { // Ensures this is not the first round
                const timeTaken = (currentTime - lastStartTime) / 1000;
                times[i] = { // Store the timing information instead of displaying it immediately
                    round: i,
                    startTime: lastStartTime,
                    endTime: currentTime,
                    timeTaken: timeTaken.toFixed(2)
                };
            }
            lastStartTime = currentTime; // Update last start time for the next round

            // Highlight the current round
            if (!this.classList.contains('clicked')) {
                this.classList.add('clicked');
            }
        });
    }

    // Button to display all times
    const displayTimesButton = document.createElement('button');
    displayTimesButton.textContent = 'Display All Round Times';
    document.body.appendChild(displayTimesButton);

    displayTimesButton.addEventListener('click', function() {
        roundTimes.innerHTML = ''; // Clear previous times display
        for (let i = 1; i < times.length; i++) { // Start from 1 as round 0 does not exist
            if(times[i]) { // Check if timing information exists
                const timeInfo = times[i];
                displayTimeForRound(timeInfo.round, timeInfo.startTime, timeInfo.endTime, timeInfo.timeTaken);
            }
        }
    });

    // Button to hide the displayed times
    const hideTimesButton = document.createElement('button');
    hideTimesButton.textContent = 'Hide Round Times';
    document.body.appendChild(hideTimesButton);

    hideTimesButton.addEventListener('click', function() {
        roundTimes.innerHTML = ''; // Clear the display of round times
    });

    function displayTimeForRound(roundNumber, startTime, endTime, timeTaken) {
        let timeDisplay = document.createElement('div');
        timeDisplay.innerHTML = `Round ${roundNumber}: Start Time - ${startTime.toLocaleTimeString()}, End Time - ${endTime.toLocaleTimeString()}, Time Taken - ${timeTaken} seconds`;
        roundTimes.appendChild(timeDisplay);
    }
});
