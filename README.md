# Birthday Countdown & Surprise Experience 

## 📖 Project Overview
This is a Single Page Application (SPA) built with Vanilla HTML, CSS, and JavaScript. It serves as a persistent birthday countdown timer that transitions into an immersive, multi-stage interactive surprise experience when the target date is reached.

The application uses localStorage to persist user data, ensuring the countdown continues running even if the browser is closed or refreshed.

🛠 Tech Stack
HTML5: Semantic structure with a unique "Screen/Stage" architecture.

CSS3: Flexbox/Grid layouts, Glassmorphism UI, CSS Animations (@keyframes), and CSS Variables.

JavaScript (ES6+): Logic for time calculation, DOM manipulation, state management, and Typewriter effects.

External Library: canvas-confetti (via CDN) for the particle effects in Stage 1.

---
📂 File Structure

```
/project-root
│
├── index.html      # Main DOM structure (Screens + Stages)
├── style.css       # Visual styles, animations, and responsive design
├── script.js       # Game state, Timer logic, and Interaction handlers
└── README.md       # Documentation
```
---
## 🧠 Core Architecture: "Screens" & "Stages"
The application does not use page navigation. Instead, it uses a Visibility Toggle System.

1. The Screen System
   
  There are three main parent containers (.screen). Only one is visible at a time using the .active CSS class.

  *  #setup-screen: Input form for Name, Date, and Birth Year.

  *  #countdown-screen: The running timer.

  *  #surprise-screen: The container that holds the post-countdown interactive journey.

2. The Stage System (Inside Surprise Screen)
Once the timer hits 0, the #surprise-screen activates. Inside it, the user progresses through 4 sequential Stages:

* Stage 1 (Confetti): Visual celebration + "Make a Wish" CTA.

* Stage 2 (The Cake): CSS-drawn cake + Wish Input + Candle blowing animation.

* Stage 3 (The Letter): Typewriter text effect + Motivational message.

* Stage 4 (The Horizon): Life statistics dashboard + Goal display.

---

## 💾 State Management (LocalStorage)
The app persists data to the browser's localStorage to prevent data loss on refresh.


| Key | Description | Used In |
|---|---|---|
|birthdayName | The name of the person.| Setup, Stage 1 |
| birthdayDate | The target birthday date (YYYY-MM-DD). | Setup, Timer Logic, Stage 4 |
|birthYear| The year they were born (YYYY). | Setup, Stage 4 (Stat Calculation) |
|birthdayWish| The user's input from Stage 2. | Stage 2 (Save), Stage 4 (Display) |

---

## 💻 Code Breakdown
1. script.js (Key Functions)
   
#### Timer Logic

* startCountdown(): Reads inputs, validates, saves to Storage, and triggers the timer.

* startTimerLogic(): Runs a setInterval (1000ms).

  * Calculates delta between now and targetDate.

  * Trigger: If distance < 0, it calls triggerSurprise().

#### Surprise Mechanics

* triggerSurprise(): Hides Countdown, shows Surprise Screen, launches Confetti.

* launchFireworks(): Uses canvas-confetti to create random particle bursts.

* blowCandles(): Adds .out class to CSS flames (opacity: 0), saves the wish, reveals the "Next" button.

* typeWriter(text, id): A recursive function that injects text one character at a time to simulate typing.

* calculateLifeStats(): Performs Date math to calculate "Days Alive," "Heartbeats," and "Season of Birth."

#### Utilities

* switchScreen(element): Helper to handle class toggling (hidden vs active).

* hardReset(): Critical for Debugging. Clears localStorage and reloads the page (location.reload()).

2. style.css (Key Styles)
* :root Variables: Colors (--bg-gradient, --accent-color) are defined here for easy theming.

* .screen Class: Uses position: absolute; opacity: 0; pointer-events: none; to hide elements without removing them from the DOM flow until needed.

* Cake Animation: The .flame class uses @keyframes flicker to simulate wind/movement.

* Glassmorphism: .card uses backdrop-filter: blur(10px) and semi-transparent backgrounds.

## 🚀 How to Update / Customize
### Changing the Message (Stage 3)
In script.js, locate the const messages array:
```js
const messages = [
    "Your custom message here...",
    "Another message option..."
];
```
The code automatically picks a random message from this array.

### changing the Theme Colors
In style.css, modify the root variables:

```css
:root {
    --bg-gradient: linear-gradient(...); /* Change background */
    --accent-color: #ff9a9e; /* Change button colors */
}
```
### Modifying the Confetti
In script.js, inside launchFireworks(), you can adjust:

* particleCount: Density of confetti.

* spread: How wide the explosion is.

* duration: How long the loop runs.

---

## ⚠️ Dependency Note
This project requires an internet connection to load the Confetti library: <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
