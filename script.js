let cardBtn = document.querySelectorAll(".card");
let restard = document.querySelector('#restard');
let taming = document.querySelector('#taming');

let emojies = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😎"];

let fullEmojies = [...emojies, ...emojies];

let flippedCards = [];
let startTime, timerInterval;
let timeLeft = 300; // 5 минут в секундах

function shuffleEmojies() {
    return fullEmojies.map((emoji) => ({ emoji, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((obj) => obj.emoji);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    taming.innerText = `tayming: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 300;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            taming.innerText = "You Lose!";
        }
    }, 1000);
}

let randomEmojies = shuffleEmojies();

function setupCards() {
    randomEmojies = shuffleEmojies();
    flippedCards = [];
    startTimer();
    
    cardBtn.forEach((btn, index) => {
        btn.innerHTML = `
        <div class="front"></div>
        <div class="back">${randomEmojies[index]}</div>`;
        btn.classList.remove("flipped", "wrong", "yes");
        btn.classList.add("flipped");
    });
    
    setTimeout(() => {
        cardBtn.forEach(btn => btn.classList.remove("flipped"));
    }, 2000);
}

cardBtn.forEach((btn, index) => {
    btn.innerHTML = `
    <div class="front"></div>
    <div class="back">${randomEmojies[index]}</div>`;
    btn.classList.add("flipped");
});

setTimeout(() => {
    cardBtn.forEach(btn => btn.classList.remove("flipped"));
}, 2000);

cardBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("flipped") && flippedCards.length < 2) {
            btn.classList.add("flipped");
            flippedCards.push({ btn, emoji: randomEmojies[index] });

            if (flippedCards.length === 2) {
                setTimeout(() => {
                    if (flippedCards[0].emoji === flippedCards[1].emoji) {
                        flippedCards.forEach(card => card.btn.classList.add("yes"));
                        setTimeout(() => {
                            flippedCards.forEach(card => {
                                card.btn.classList.add("card");
                            });
                            if (document.querySelectorAll(".yes").length === cardBtn.length) {
                                clearInterval(timerInterval);
                            }
                        }, 500);
                        flippedCards = [];
                    } else {
                        flippedCards.forEach(card => card.btn.classList.add("wrong"));
                        setTimeout(() => {
                            flippedCards.forEach(card => {
                                card.btn.classList.remove("flipped", "wrong");
                            });
                            flippedCards = [];
                        }, 500);
                    }
                }, 1000);
            }
        }
    });
});

restard.addEventListener("click", setupCards);
setupCards();
