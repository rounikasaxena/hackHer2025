// TIMER FUNCTIONALITY

let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll(".timer-display");
let session = document.getElementById("pomodoro-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let restartBtn = document.getElementById("restart");
let timerMsg = document.getElementById("timer-message");

let currentTimer = pomodoro; // Default to Pomodoro
let myInterval = null;

// Show the default timer
function showDefaultTimer() {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
}

showDefaultTimer();

// Hide all timers
function hideAll() {
    timers.forEach((timer) => {
        timer.style.display = "none";
    });
}

// Click event for Pomodoro session
session.addEventListener("click", () => {
    hideAll();
    pomodoro.style.display = "block";

    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");

    currentTimer = pomodoro;
});

// Click event for Short Break
shortBreak.addEventListener("click", () => {
    hideAll();
    short.style.display = "block";

    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");

    currentTimer = short;
});

// Click event for Long Break
longBreak.addEventListener("click", () => {
    hideAll();
    long.style.display = "block";

    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");

    currentTimer = long;
});

// Start the timer
function startTimer(timerDisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0];
    let durationInMilliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationInMilliseconds;

    myInterval = setInterval(function () {
        const timeRemaining = endTimestamp - Date.now();

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerDisplay.querySelector(".time").textContent = "00:00";
            const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
            alarm.play();
        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            timerDisplay.querySelector(".time").textContent = formattedTime;
        }
    }, 1000);
}

// Reset timer function
function resetTimer() {
    clearInterval(myInterval);

    // Reset timer displays
    document.querySelector("#pomodoro-timer .time").textContent = "25:00";
    document.querySelector("#short-timer .time").textContent = "5:00";
    document.querySelector("#long-timer .time").textContent = "10:00";

    // Show the default Pomodoro timer
    showDefaultTimer();

    // Reset active classes
    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");

    currentTimer = pomodoro; // Reset current timer
}

// Event listeners for Timer Buttons
restartBtn.addEventListener("click", resetTimer);

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer);
        timerMsg.style.display = "none";
    } else {
        timerMsg.style.display = "block";
    }
});

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(myInterval);
    }
});


// Toggle Side Panel
function toggleSidePanel() {
    const sidePanel = document.getElementById("side-panel");
    if (sidePanel.style.width === "250px") {
        sidePanel.style.width = "0"; // Close the panel
    } else {
        sidePanel.style.width = "250px"; // Open the panel
    }
}

// TO-DO LIST FUNCTIONALITY

const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function addTask() {
    if (todoInput.value.trim() === "") return; // Ignore empty tasks

    const li = document.createElement("li"); // Create a new list item
    li.textContent = todoInput.value;

    const deleteButton = document.createElement("button"); // Create a delete button
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        li.remove(); // Remove the task when clicked
    };

    li.appendChild(deleteButton); // Add delete button to the list item
    todoList.appendChild(li); // Add the list item to the unordered list
    todoInput.value = ""; // Clear the input field
}

// Event listeners for To-Do List functionality
addTodoButton.addEventListener("click", addTask);
todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask(); // Add task on pressing Enter
    }
});

// PAGE TRANSITION FUNCTIONALITY

function navigateToPage(page) {
    // Redirect to the specified page using its file path
    window.location.href = page;
}

// Add Event Listeners for Side Panel Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.querySelector('a[href="profile.html"]');
    const petLink = document.querySelector('a[href="editpet.html"]');
    const friendsLink = document.querySelector('a[href="friends.html"]');
    const logoutLink = document.querySelector('a[href="intropage.html"]');

    if (profileLink) profileLink.addEventListener('click', () => navigateToPage('profile.html'));
    if (petLink) petLink.addEventListener('click', () => navigateToPage('editpet.html'));
    if (friendsLink) friendsLink.addEventListener('click', () => navigateToPage('friends.html'));
    if (logoutLink) logoutLink.addEventListener('click', () => navigateToPage('intropage.html'));

    // --- Add the bunny image toggling logic here ---
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const restartButton = document.getElementById('restart');
    const sleepingBunny = document.getElementById('sleepingBunny');
    const idleBunny = document.getElementById('idleBunny');
    const cheerBunny = document.getElementById('cheerBunny');

    startButton.addEventListener('click', function() {
        sleepingBunny.style.display = 'none';
        idleBunny.style.display = 'block';
        cheerBunny.style.display = 'none'; //ensure cheer bunny is hidden
    });

    restartButton.addEventListener('click', function() {
        idleBunny.style.display = 'none';
        sleepingBunny.style.display = 'none';
        cheerBunny.style.display = 'block'; //ensure cheer bunny is hidden
    });

    stopButton.addEventListener('click', function(){
        idleBunny.style.display = 'block';
        sleepingBunny.style.display = 'none';
        cheerBunny.style.display = 'none'; //ensure cheer bunny is hidden
    });
});