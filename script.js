// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const countdownScreen = document.getElementById('countdown-screen');
const surpriseScreen = document.getElementById('surprise-screen');

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const greetingEl = document.getElementById('greeting');

let targetDate;
let timerInterval;

// 1. Check if user data exists on load
window.addEventListener('load', () => {
    const savedDate = localStorage.getItem('birthdayDate');
    const savedName = localStorage.getItem('birthdayName');
    
    if (savedDate && savedName) {
        targetDate = new Date(savedDate).getTime();
        greetingEl.innerText = `Counting down for ${savedName}`;
        switchScreen(countdownScreen);
        startTimerLogic();
    } else {
        switchScreen(setupScreen);
    }
});

// 2. Setup Function
function startCountdown() {
    const name = document.getElementById('nameInput').value;
    const dateStr = document.getElementById('dateInput').value;
    const year = document.getElementById('yearInput').value;

    if (!name || !dateStr || !year) return alert("Please fill in all details!");

    // Save to LocalStorage
    localStorage.setItem('birthdayName', name);
    localStorage.setItem('birthdayDate', dateStr);
    localStorage.setItem('birthYear', year);

    // Set Date logic (Ensure it's the *upcoming* birthday)
    // Note: For simplicity, we are taking the direct date input for now.
    targetDate = new Date(dateStr).getTime();
    
    greetingEl.innerText = `Counting down for ${name}`;
    switchScreen(countdownScreen);
    startTimerLogic();
}

// 3. The Timer Logic
function startTimerLogic() {
    timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // CHECK FOR 12 AM (Surprise Trigger)
        if (distance < 0) {
            clearInterval(timerInterval);
            triggerSurprise();
            return;
        }

        // Math for time
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        daysEl.innerText = formatTime(days);
        hoursEl.innerText = formatTime(hours);
        minutesEl.innerText = formatTime(minutes);
        secondsEl.innerText = formatTime(seconds);

    }, 1000);
}

// Helper: Add leading zero (e.g., "9" -> "09")
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Helper: Screen Switcher
function switchScreen(screenToShow) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    
    screenToShow.classList.remove('hidden');
    screenToShow.classList.add('active');
}

// 4. The Trigger
function triggerSurprise() {
    // 1. Switch to the surprise screen
    switchScreen(surpriseScreen);
    
    // 2. Personalize the name
    const savedName = localStorage.getItem('birthdayName');
    document.getElementById('bday-name-display').innerText = savedName;

    // 3. Play Audio (Optional - we can add this later)
    
    // 4. Launch the Confetti Fireworks
    launchFireworks();
}

function nextSurprise() {
    alert("This will go to the Cake Stage next!");
}

function launchFireworks() {
    var duration = 15 * 1000; // Fireworks last for 15 seconds
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}

// Placeholder for the next button
function startStage2() {
    alert("Moving to the Cake Stage! (We will code this next)");
    // Logic to hide stage-1 and show stage-2 will go here
}

// --- STAGE 2 LOGIC ---

function startStage2() {
    // 1. Hide Stage 1
    document.getElementById('stage-1').classList.remove('active-stage');
    document.getElementById('stage-1').classList.add('hidden-stage');
    
    // 2. Show Stage 2
    document.getElementById('stage-2').classList.remove('hidden-stage');
    document.getElementById('stage-2').classList.add('active-stage');
}

function blowCandles() {
    const wish = document.getElementById('wish-text').value;
    
    // Optional: Save wish to local storage to show it next year!
    if(wish) {
        localStorage.setItem('birthdayWish', wish);
    }

    // 1. Extinguish Flames (CSS Class)
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.classList.add('out');
    });

    // 2. Change Title
    const title = document.querySelector('.wish-title');
    title.innerText = "Your wish is released into the universe... ✨";

    // 3. Hide Input & Blow Button
    document.querySelector('.wish-input-container').style.display = 'none';

    // 4. Show Next Button with a slight delay
    setTimeout(() => {
        const nextBtn = document.getElementById('next-stage-btn');
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('fade-in');
    }, 2000);
}

function startStage3() {
    alert("Moving to the Motivational Card! (Next Step)");
}

function hardReset() {
    // 1. Confirm action (optional, but good so you don't click by accident)
    if(!confirm("Restart the whole experience?")) return;

    // 2. Clear ALL storage
    localStorage.clear();

    // 3. Reload the page (This stops confetti, resets candles, resets DOM)
    location.reload();
}

// --- STAGE 3 LOGIC ---

// A library of messages based on general vibe
const messages = [
    "Another year around the sun. Remember, you are not just getting older, you are leveling up. The challenges you faced this year were just training for the victories coming next. Trust your timing.",
    "The world is lucky to have you in it. Your kindness, your resilience, and your energy make a difference. This year, prioritize your happiness and chase those wild dreams.",
    "Happy Birthday! May this year bring you the courage to say 'Yes' to adventure and 'No' to anything that dims your light. You are capable of amazing things."
];

function startStage3() {
    // 1. Hide Stage 2
    document.getElementById('stage-2').classList.remove('active-stage');
    document.getElementById('stage-2').classList.add('hidden-stage');
    
    // 2. Show Stage 3
    document.getElementById('stage-3').classList.remove('hidden-stage');
    document.getElementById('stage-3').classList.add('active-stage');

    // 3. Select a random message (or pick specific one based on age logic later)
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    // 4. Start Typing
    typeWriter(randomMsg, 'typing-area');
}

function typeWriter(text, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = ""; // Clear existing
    let i = 0;
    const speed = 50; // Speed in ms

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Typing finished
            element.innerHTML += "<span class='cursor'></span>"; // Add blinking cursor at end
            revealSignatureAndButton();
        }
    }
    type();
}

function revealSignatureAndButton() {
    // Show signature
    document.querySelector('.signature').style.opacity = '1';
    
    // Show next button after a small pause
    setTimeout(() => {
        const btn = document.getElementById('final-btn');
        btn.classList.remove('hidden');
        btn.classList.add('fade-in');
    }, 1000);
}

function startStage4() {
    alert("Moving to the Final Stage: The Year Ahead!");
}

// --- STAGE 4 LOGIC ---

function startStage4() {
    // 1. Hide Stage 3
    document.getElementById('stage-3').classList.remove('active-stage');
    document.getElementById('stage-3').classList.add('hidden-stage');
    
    // 2. Show Stage 4
    document.getElementById('stage-4').classList.remove('hidden-stage');
    document.getElementById('stage-4').classList.add('active-stage');

    // 3. Populate Data
    calculateLifeStats();
    displayWish();
}

function calculateLifeStats() {
    // Retrieve data
    const birthYear = localStorage.getItem('birthYear'); // e.g., 2003
    const birthdayDate = localStorage.getItem('birthdayDate'); // e.g., 2024-10-25
    
    if(!birthYear || !birthdayDate) return;

    // Construct full Date of Birth (DOB)
    // We take the Month and Day from the input, and the Year from the year input
    const dateObj = new Date(birthdayDate);
    const dob = new Date(birthYear, dateObj.getMonth(), dateObj.getDate());
    const now = new Date();

    // Calculate Diff
    const diffTime = Math.abs(now - dob);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    // Heartbeats: Avg human heart rate ~80 bpm
    // Minutes alive * 80
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const heartbeats = diffMinutes * 80;

    // Season Logic
    const month = dob.getMonth(); // 0-11
    let season = "";
    if (month >= 2 && month <= 4) season = "Spring";
    else if (month >= 5 && month <= 7) season = "Summer";
    else if (month >= 8 && month <= 10) season = "Autumn";
    else season = "Winter";

    // Animate Numbers (Helper function to make numbers count up)
    animateValue("stat-days", 0, diffDays, 2000);
    animateValue("stat-hours", 0, diffHours, 2000);
    animateValue("stat-hearts", 0, heartbeats, 2000);
    document.getElementById("stat-season").innerText = season;
}

function displayWish() {
    const savedWish = localStorage.getItem('birthdayWish');
    const wishDisplay = document.getElementById('final-wish-display');
    
    if(savedWish) {
        wishDisplay.innerText = `"${savedWish}"`;
    } else {
        wishDisplay.innerText = "\"To live a happy and fulfilled year.\""; // Fallback
    }
}

// Helper: Number Counter Animation
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Format with commas (e.g., 1,200,000)
        const currentVal = Math.floor(progress * (end - start) + start);
        obj.innerHTML = currentVal.toLocaleString(); 

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}