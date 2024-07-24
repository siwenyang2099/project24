let currentAudio = null;
let currentImgElement = null;

const giftCards = [
    {
        id: 1,
        image: 'images/cat1.jpg',
        sound: 'sounds/cat1.mp3',
        tipText: 'Tip dancing Maxwell'
    },
    {
        id: 2,
        image: 'images/cat2.jpg',
        sound: 'sounds/cat2.mp3',
        tipText: 'Tip home-seeker Happy',
        loop: true
    },
    {
        id: 3,
        image: 'images/cat3.jpg',
        sound: 'sounds/cat3.mp3',
        tipText: 'Tip cry-baby Banana',
        loop: true
    },
    {
        id: 4,
        image: 'images/cat4.jpg',
        sound: 'sounds/cat4.mp3',
        tipText: 'Tip your Driver',
        loop: true
    },
    {
        id: 5,
        image: 'images/cat5.jpg',
        sound: 'sounds/cat5.mp3',
        tipText: 'Tip your Lawyer',
        loop: true
    },
    {
        id: 6,
        image: 'images/cat6.jpg',
        sound: 'sounds/cat6.mp3',
        tipText: 'Tip sad Twins',
        loop: true
    },
    {
        id: 7,
        image: 'images/cat7.jpg',
        sound: 'sounds/cat7.mp3',
        tipText: 'Tip Comedian',
        loop: true
    },
    {
        id: 8,
        image: 'images/cat8.jpg',
        sound: 'sounds/cat8.mp3',
        tipText: 'Tip Body-Guard',
        loop: true
    }
];

function toggleSound(sound, imgElement, loop = false) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        currentImgElement.classList.remove('bouncing', 'circling', 'flying');
        document.body.classList.remove('circling', 'flying');
        if (currentImgElement === imgElement) {
            currentImgElement = null;
            return;
        }
    }

    currentAudio = new Audio(sound);
    currentAudio.loop = loop;
    currentAudio.play();

    currentImgElement = imgElement;

    if (sound.includes('cat4.mp3')) {
        document.body.classList.add('circling');
        currentAudio.addEventListener('ended', () => {
            document.body.classList.remove('circling');
        });
    } else if (sound.includes('cat8.mp3')) {
        document.body.classList.add('flying');
        currentAudio.addEventListener('ended', () => {
            document.body.classList.remove('flying');
        });
    } else {
        imgElement.classList.add('bouncing');
    }
}

function createGiftCard(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'gift-card';
    if (card.id === 5 || card.id === 8) {
        cardElement.classList.add(`gift-card-${card.id}`);
    }
    cardElement.innerHTML = `
        <div class="pool-float">
            <img src="${card.image}" alt="Cat Image" onclick="toggleSound('${card.sound}', this, ${card.loop})">
            <button class="tip-button" onclick="playTipSound()">
                $ ${card.tipText}
            </button>
        </div>
    `;
    return cardElement;
}

function displayGiftCards() {
    const container = document.getElementById('gift-cards-container');
    giftCards.forEach(card => {
        const cardElement = createGiftCard(card);
        container.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', displayGiftCards);

function playTipSound() {
    const tipAudio = new Audio('sounds/tip.mp3');
    tipAudio.play();
}
