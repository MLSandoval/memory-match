const cardImageURLArray = [
    'assets/images/CardImages/Arches1.png',
    'assets/images/CardImages/CraterLake1.png',
    'assets/images/CardImages/DeathValley1.png',
    'assets/images/CardImages/GrandCanyon1.png',
    'assets/images/CardImages/JoshuaTree1.png',
    'assets/images/CardImages/Sequoia1.png',
    'assets/images/CardImages/SmokyMountains1.png',
    'assets/images/CardImages/YellowstoneLogo1.png',
    'assets/images/CardImages/Yosemite1.png'
];
const parkImageURLArray = [
    'assets/images/MatchImages/ArchesImage600.png',
    'assets/images/MatchImages/CraterLakeImage600.png',
    'assets/images/MatchImages/DeathValley600.png',
    'assets/images/MatchImages/GrandCanyon600.png',
    'assets/images/MatchImages/JoshuaTreeImage600.png',
    'assets/images/MatchImages/SequoiaImage600.png',
    'assets/images/MatchImages/SmokyMountainsImage600.png',
    'assets/images/MatchImages/YellowstoneImage600.png',
    'assets/images/MatchImages/YosemiteImage600.png'
];

const bgParkImages = [
    'assets/images/BGs/Arches.jpg',
    'assets/images/BGs/CraterLakeResized.jpg',
    'assets/images/BGs/DeathValleyResized.jpg',
    'assets/images/BGs/GrandCanyon.jpg',
    'assets/images/BGs/JoshuaTreeRezised.jpg',
    'assets/images/BGs/SequoiaResized.jpg',
    'assets/images/BGs/SmokyMountains.jpg',
    'assets/images/BGs/YellowStone.jpg',
    'assets/images/BGs/Yosemite.jpg'
];

const parkQuotes = [
    '"Travel makes one modest. You see what a tiny place you occupy in the world." \n - Gustave Flaubert',
    '"Traveling - it leaves you speechless, then turns you into a storyteller." \n - Ibn Battuta',
    '"I only went out for a walk, and finally concluded to stay out till sundown, for going out, I found, was really going in." \n - John Muir',
    '"Another glorious day, the air as delicious to the lungs as nectar to the tongue." \n - John Muir',
    '"The clearest way into the Universe is through a forest wilderness." \n - John Muir',
    '"This grand show is eternal. It is always sunrise somewhere; the dew is never all dried at once; a shower is forever falling; vapor ever rising." \n - John Muir',
    '"Adventure is worthwhile." \n - Aesop',
    '"We travel not to escape life, but for life not to escape us." \n - Anonymous',
    '"The world is a book, and those who do not travel read only one page." \n - Saint Augustine',
    '"Not all those who wander are lost." \n - J.R.R. Tolkien'
];

const DOMElements = {};
DOMElements.gameContainer = $('#game-container');
let flippedStatus = [];
let stats = null;
let finalMatchCaption = null;

$(document).ready(function(){
    createCards(cardImageURLArray, parkImageURLArray);
    // shuffleCardsArr();
    appendCardsToDom();
    assignClickHandlers();
    updateStats();
});

const assignClickHandlers = () => {
    $('.card-container').on('click', flipCard); 
    $('#modal-button').on('click', resetGame);
}

const createCards = (cardImages, matchImages) => {
    cardImages = cardImages.concat(cardImages);
    matchImages = matchImages.concat(matchImages);
    let cardsArr = [];
    for(let i = 0; i < cardImages.length; i++){
        let cardContainer = $("<div>").addClass('card-container').attr('match-image', matchImages[i]);
        let cardBack = $("<div>").addClass('card card-back').css('background-image', `url('assets/images/CardImages/CardBack1.png')`);
        let cardFace = $("<div>").addClass('card card-face').css('background-image', `url('${cardImages[i]}')`);
        cardContainer.append(cardBack, cardFace);
        cardsArr.push(cardContainer);
    }
    DOMElements.cards = cardsArr;
    DOMElements.cardRows = [
        $('.card-row1'), 
        $('.card-row2'), 
        $('.card-row3')
    ];
}

const shuffleCardsArr = () => {
    console.log('shuffle cards called.');
    let max = DOMElements.cards.length;
    let temp;
    let index;
    while (max) {
        index = Math.floor(Math.random() * max--);
        temp = DOMElements.cards[max];
        DOMElements.cards[max] = DOMElements.cards[index];
        DOMElements.cards[index] = temp;
    }
}

const appendCardsToDom = () => {
    for (let i = 0; i < DOMElements.cards.length; i++) {
        switch (true) {
            case i < 6: DOMElements.cardRows[0].append(DOMElements.cards[i]);
                break;
            case i < 12: DOMElements.cardRows[1].append(DOMElements.cards[i]);
                break;
            case i < 18: DOMElements.cardRows[2].append(DOMElements.cards[i]);
                break;
        }
    }
}

const flipCard = (event) => {
    switch(flippedStatus.length){
        case 0:
            if(!$(event.currentTarget).hasClass('is-flipped')){
                $(event.currentTarget).toggleClass('is-flipped');
                flippedStatus[0] = event.currentTarget;
            }
            break;
        case 1: 
            if(!$(event.currentTarget).hasClass('is-flipped')) {
                $(event.currentTarget).toggleClass('is-flipped');
                flippedStatus[1] = event.currentTarget;
                setTimeout(() => {checkMatch(flippedStatus)}, 800);
            }
            break;
        default: 
            console.log('flipped status error');
    }
}

const checkMatch = (flippedCards) => {
    let card1 = flippedCards[0].children[1];
    let card2 = flippedCards[1].children[1];
    if ($(card1).css('background-image') !== $(card2).css('background-image')){
        $(flippedCards[0]).toggleClass('is-flipped');
        $(flippedCards[1]).toggleClass('is-flipped');
        stats.attempts++;
    }else{
        let match = $(flippedCards[1]).attr('match-image');
        $(flippedCards[0]).off('click', flipCard);
        $(flippedCards[1]).off('click', flipCard);
        stats.attempts++;
        stats.matches++;
        fetchMatchData(match);
    }
    flippedStatus = [];
    updateStats();
}

const fetchMatchData = (searchTarget) =>{
    if(!DOMElements.infoTrails){
        DOMElements.infoTrails = $('#trails-ul');
    }
    let lat;
    let lon;
    let caption;
    switch(searchTarget){
        case 'assets/images/MatchImages/ArchesImage600.png':
            lat = 38.733;
            lon = -109.592514;
            caption = 'Arches National Park, Utah';
            break;
        case 'assets/images/MatchImages/CraterLakeImage600.png':
            lat = 42.9446;
            lon = -122.1090;
            caption = 'Crater Lake, Oregon';
            break;
        case 'assets/images/MatchImages/DeathValley600.png':
            lat = 36.5323;
            lon = -116.9325;
            caption = 'Death Valley, California';
            break;
        case 'assets/images/MatchImages/GrandCanyon600.png':
            lat = 36.1070;
            lon = -112.1130;
            caption = 'Grand Canyon, Arizona';
            break;
        case 'assets/images/MatchImages/JoshuaTreeImage600.png':
            lat = 33.8818;
            lon = -115.9006;
            caption = 'Joshua Tree National Park, California';
            break;
        case 'assets/images/MatchImages/SequoiaImage600.png':
            lat = 36.4864;
            lon = -118.5658;
            caption = 'Sequoia National Park, California';
            break;
        case 'assets/images/MatchImages/SmokyMountainsImage600.png':
            lat = 35.6117;
            lon = -83.4895;
            caption = 'Smoky Mountains National Park, Tennessee';
            break;
        case 'assets/images/MatchImages/YellowstoneImage600.png':
            lat = 44.4280;
            lon = -110.5885;
            caption = 'Yellowstone National Park, Wyoming';
            break;
        case 'assets/images/MatchImages/YosemiteImage600.png':
            lat = 37.8651;
            lon = -119.5383;
            caption = 'Yosemite National Park, California';
            break;
        default: console.log('No matching search target.');
    }
    fetch(`../proxy_trails.php?lat=${lat}&lon=${lon}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(result => {
        appendTrails(result, searchTarget, caption);
    })
    .catch(error => console.log('Trails fetch error: ', error));
}

const appendTrails = (data, match, caption) =>{
    DOMElements.infoTrails.html('');
    DOMElements.infoTrails.fadeOut(400, () => {
        data.trails.forEach((element) => {
            const name = element.name;
            const hyperlink = element.url;
            let li = $('<li>');
            let anchor = $('<a>').text(name).attr({
                'href': hyperlink,
                'target': '_blank'
            });
            li.append(anchor);
            DOMElements.infoTrails.append(li);
        });
        if(!DOMElements.trailsAndCampgrounds) DOMElements.trailsAndCampgrounds = $('ul');
        if(stats.matches === 9)
            DOMElements.trailsAndCampgrounds.css('opactiy', 0)
        DOMElements.trailsAndCampgrounds.fadeIn(400);
    });
    if(stats.matches === 1) hideInitialText();
    displayMatchImage(match, caption);
}

const hideInitialText = () => {
    if (!DOMElements.imageCaption) {
        DOMElements.imageCaption = $('#image-caption');
        DOMElements.initialInstructionsText = $('#initial-instructions-text');
        DOMElements.initialInfoBox = $('#initial-info-box');
        DOMElements.infoDisplay = $('#info-box');
    }
    DOMElements.initialInfoBox.fadeOut(250, () => {
        DOMElements.infoDisplay.fadeIn(250);
    });
}

const displayMatchImage = (imageURL, caption) => {
    if (!DOMElements.matchImage || stats.matches === 1) {
        DOMElements.initialInstructionsText.fadeOut(250, ()=>{
            DOMElements.matchImage = $('#image-square');
            DOMElements.matchImage.fadeOut(350, () => {
                setParkCaption(caption);
                DOMElements.matchImage.css({
                    'background-image': `url(${imageURL})`,
                    'background-color': 'white',
                    'border': '1px solid white'
                }).fadeIn(250);
            });
        });
    } else {
        DOMElements.matchImage.fadeOut(350, () => {
            setParkCaption(caption);
            DOMElements.matchImage.fadeIn(350).css({
                'background-image': `url(${imageURL})`,
                'border': '1px solid white'
            });
        });
    }
}

const setParkCaption = (caption) => {
    console.log('display park caption called: ', caption);
    if(stats.matches === 9) finalMatchCaption = caption;
    DOMElements.imageCaption.text(caption);  
}

const updateStats = () =>{
    if(stats === null){
        stats = {
            attempts: 0,
            gamesPlayed: 0,
            matches: 0
        };
        DOMElements.stats = {};
        DOMElements.stats.attempts = $('#attempts-text');
        DOMElements.stats.gamesPlayed = $('#games-played-text');
        DOMElements.stats.matches = $('#matches-text');
    };
    if (stats.matches === 9) {
        stats.gamesPlayed++;
        setTimeout(displayModal, 1250);
    };
    DOMElements.stats.attempts.text(`Attempts: ${stats.attempts}`);
    DOMElements.stats.gamesPlayed.text(`Games Played: ${stats.gamesPlayed}`);
    DOMElements.stats.matches.text(`Matches: ${stats.matches}`);
}

const displayModal = () => {
    setFinalMatchData();
    setEndQuote();
    setModalBG();
    DOMElements.gameContainer.fadeOut(1000, () => {
        DOMElements.modal.fadeIn(1000, () => {
            DOMElements.modal.css('display', 'flex');
            getAndSetHeight();
        });
    });
}

const setModalBG = () => {
    if (!DOMElements.modal) DOMElements.modal = $('#modal');
    let finalMatchParkURL = DOMElements.matchImage.css('background-image');
    let parkIndex;
    parkImageURLArray.forEach((element, index) => {
        if (finalMatchParkURL.includes(element)) parkIndex = index;
    });
    DOMElements.modal.css({
        'background': `url(${bgParkImages[parkIndex]})`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center'
    });
}

const setFinalMatchData = () => {
    if(!DOMElements.modalCaption){
        DOMElements.modalCaption = $('#final-match-caption');
        DOMElements.finalMatchInfo = $('#final-match-info');
    }
    DOMElements.modalCaption.text(finalMatchCaption);
    $('#trail').clone().css('opacity', '1').addClass('text-small').appendTo(DOMElements.finalMatchInfo);
    DOMElements.trailsAndCampgrounds.css('opacity', '1');
}

const getAndSetHeight = () =>{
    let height = DOMElements.finalMatchInfo.height();
    DOMElements.textWrapper.height(height);
}

const setEndQuote = () => {
    if (!DOMElements.modalText) {
        DOMElements.modalText = $('#modal-text');
        DOMElements.textWrapper = $('#text-wrapper');
    };
    let max = parkQuotes.length;
    let temp;
    let index;
    while (max) {
        index = Math.floor(Math.random() * max--);

        temp = parkQuotes[max];
        parkQuotes[max] = parkQuotes[index];
        parkQuotes[index] = temp;
    }
    DOMElements.modalText.text(parkQuotes[0]);
}

const hoverResetButton = () => {
    console.log('this on hover: ', this);
}

const resetGame = () => {
    
    DOMElements.cardRows[0].html('');
    DOMElements.cardRows[1].html('');
    DOMElements.cardRows[2].html('');
    shuffleCardsArr();
    appendCardsToDom();
    DOMElements.cards.forEach((element) => {
        $(element).removeClass('is-flipped').on('click', flipCard);
    });
    stats.attempts = 0;
    stats.matches = 0;
    updateStats();
    DOMElements.modal.fadeOut(1500, () => {
        DOMElements.finalMatchInfo.html('');
        DOMElements.matchImage.fadeOut(0, () => {
            DOMElements.initialInstructionsText.fadeIn(0);
        });
        DOMElements.infoDisplay.fadeOut(0, () => {
            DOMElements.initialInfoBox.fadeIn(0);
        });
        DOMElements.gameContainer.fadeIn(1000);
    });
};