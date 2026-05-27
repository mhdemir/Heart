const body = document.getElementById('main-body');
const callScreen = document.getElementById('call-screen');
const questionScreen = document.getElementById('question-screen');
const finaleScreen = document.getElementById('finale-screen');

const acceptBtn = document.getElementById('accept-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const reallyBtn = document.getElementById('really-btn');

const callVideo = document.getElementById('call-video');
const ringtoneSound = document.getElementById('ringtone-sound');
const boomSound = document.getElementById('boom-sound');
const recordScratch = document.getElementById('record-scratch-sound');
const princeSound = document.getElementById('prince-sound');

const collageContainer = document.getElementById('collage-container');

const yesTexts = [
    "jajaja", "yurrrr", "Ja unbedingt omg ich liebe dich", "100 mal ja", 
    "mh ok", "bite drücken grün", "miau", "ich flehe sie an", 
    "du bist die schönste auf die ganze Welt", "und die schlimmste", 
    "aschloh", "DIGGA ES REICHT", "bitte ich liebe dich doch", 
    "magst du mich überhaupt", "ich wusste es"
];

let noClickCount = 0;
let yesFontSize = 2;

const entryScreen = document.getElementById('entry-screen');
const enterBtn = document.getElementById('enter-btn');

// --- STEP 0: START EXPERIENCE ---
enterBtn.addEventListener('click', () => {
    entryScreen.classList.add('hidden');
    callScreen.classList.remove('hidden');
    
    // Now audio can play
    ringtoneSound.play();
    callVideo.play();
});

// --- STEP 1: ACCEPT CALL ---
acceptBtn.addEventListener('click', () => {
    callScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    callVideo.pause();
    ringtoneSound.pause();

    // After 2 seconds, switch from "psst..." to the question
    setTimeout(() => {
        document.getElementById('psst-text').classList.add('hidden');
        document.getElementById('question-content').classList.remove('hidden');
    }, 2000);
});

// --- STEP 2: NO BUTTON ---
noBtn.addEventListener('click', () => {
    // Play BOOM sound
    boomSound.currentTime = 0;
    boomSound.play();

    if (noClickCount < yesTexts.length) {
        yesBtn.innerText = yesTexts[noClickCount];
    } else {
        yesBtn.innerText = "JETZT DRÜCK ENDLICH!!!";
    }

    noClickCount++;
    yesFontSize += 0.5;
    
    yesBtn.style.fontSize = yesFontSize + "em";
    yesBtn.style.padding = (15 + (noClickCount * 5)) + "px " + (30 + (noClickCount * 10)) + "px";
});

// --- STEP 3: INITIAL YES CLICK (TONAL SHIFT) ---
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    finaleScreen.classList.remove('hidden');
    body.classList.add('finale-active');
    
    // Play record scratch
    recordScratch.play();

    // Show shock text and "ja wirklich" button
    document.getElementById('shock-text').classList.remove('hidden');
    setTimeout(() => {
        reallyBtn.classList.remove('hidden');
    }, 1500);
});

// --- STEP 4: "JA WIRKLICH" CLICK (THE REVEAL) ---
reallyBtn.addEventListener('click', () => {
    reallyBtn.classList.add('hidden');
    document.getElementById('shock-text').classList.add('hidden');
    
    document.getElementById('realization-sequence').classList.remove('hidden');
    
    const ohText = document.getElementById('oh-text');
    const hahaText = document.getElementById('haha-text');

    // Fade in "oh..."
    ohText.classList.remove('hidden');

    setTimeout(() => {
        // Fade in "haha..."
        hahaText.classList.remove('hidden');
    }, 2000);

    setTimeout(() => {
        startCollage();
    }, 4500);
});

// --- STEP 5: THE COLLAGE FINALE ---
function startCollage() {
    // Hide previous sequence
    document.getElementById('realization-sequence').classList.add('hidden');
    
    // Show final text
    const finalLoveText = document.getElementById('final-love-text');
    finalLoveText.classList.remove('hidden');
    finalLoveText.classList.add('fade-in');

    // Prepare collage
    for (let i = 1; i <= 40; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/${i}.jpeg`;
        img.alt = `Moment ${i}`;
        img.classList.add('fade-in');
        
        // Random position and rotation for a stacked look
        // Spreading them across the entire screen (-20% to 80% start positions)
        const randomTop = Math.random() * 100 - 20; 
        const randomLeft = Math.random() * 100 - 20; 
        const randomRotation = (Math.random() * 80) - 40; // More variety in rotation
        
        img.style.top = randomTop + "%";
        img.style.left = randomLeft + "%";
        img.style.transform = `rotate(${randomRotation}deg)`;
        
        // Sequential delay: every image starts 0.5s after the previous one
        img.style.animationDelay = (i * 0.5) + "s"; 
        
        collageContainer.appendChild(img);
    }
    
    collageContainer.classList.remove('hidden');
    princeSound.play();
}
