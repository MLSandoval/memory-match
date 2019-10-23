const cardImageURLArray = [
    'assets/images/CardImages/Arches1.png',
    'assets/images/CardImages/CraterLake1.png',
    'assets/images/CardImages/DeathValley1.png',
    'assets/images/CardImages/GrandCanyon1.png',
    'assets/images/CardImages/JoshuaTree1.png',
    'assets/images/CardImages/Seqoia1.png',
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
    'assets/images/MatchImages/SeqoiaImage600.png',
    'assets/images/MatchImages/SmokyMountainsImage600.png',
    'assets/images/MatchImages/YellowstoneImage600.png',
    'assets/images/MatchImages/YosemiteImage600.png'
];

const DOMElements = {};
let flippedStatus = [];
let stats = null;



$(document).ready(function(){
    createCards(cardImageURLArray, parkImageURLArray);
    // shuffleCardsArr();
    appendCardsToDom();
    assignClickHandlers();
    updateStats();
});

const assignClickHandlers = () => {
    $('.card-container').on('click', flipCard); 
}

const createCards = (cardImages, matchImages) => {
    cardImages = cardImages.concat(cardImages);
    matchImages = matchImages.concat(matchImages);

    let cardsArr = [];
    for(let i = 0; i < cardImages.length; i++){
        let cardContainer = $("<div>").addClass('card-container').attr('match-image', matchImages[i]);
        let cardBack = $("<div>").addClass('card card-back').css('background-image', `url('assets/images/CardImages/CardBack1.png')`);
        let cardFace = $("<div>").addClass('card card-face').css('background-image', `url('${cardImages[i]}')`);
        // console.log('cardFace: ', cardFace);
     
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
    let m = DOMElements.cards.length;
    let t;
    let i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = DOMElements.cards[m];
        DOMElements.cards[m] = DOMElements.cards[i];
        DOMElements.cards[i] = t;
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
        // console.log('they match!', flippedCards)
        $(flippedCards[0]).off('click', flipCard);
        $(flippedCards[1]).off('click', flipCard);
        stats.attempts++;
        stats.matches++;
        let match = displayMatchImage($(flippedCards[1]).attr('match-image'));
        
        fetchMatchData(match);
    }
    flippedStatus = [];
    updateStats();
}

const displayMatchImage = (imageURL) => {
    if(!DOMElements.matchImage){
        DOMElements.matchImage = $('.image-square').after();
        console.log($('.image-square').after());
    }

    DOMElements.matchImage.css({
        'background-image': `url(${imageURL})`,
        'background-color': 'transparent',
        border: '1px solid white'
    });
    return imageURL;
}

const fetchMatchData = (searchTarget) =>{
    if(!DOMElements.infoCampgrounds){
        DOMElements.infoCampgrounds = $('#campgrounds-ul');
        DOMElements.infoTrails = $('#trails-ul');
    }

    let lat;
    let lon;

    switch(searchTarget){
        case 'assets/images/MatchImages/ArchesImage600.png':
            lat = 38.733;
            lon = -109.592514;
            break;
        case 'assets/images/MatchImages/CraterLakeImage600.png':
            lat = 42.9446;
            lon = -122.1090;
            break;
        case 'assets/images/MatchImages/DeathValley600.png':
            lat = 36.5323;
            lon = -116.9325;
            break;
        case 'assets/images/MatchImages/GrandCanyon600.png':
            lat = 36.1070;
            lon = -112.1130;
            break;
        case 'assets/images/MatchImages/JoshuaTreeImage600.png':
            lat = 33.8818;
            lon = -115.9006;
            break;
        case 'assets/images/MatchImages/SeqoiaImage600.png':
            lat = 36.4864;
            lon = -118.5658;
            break;
        case 'assets/images/MatchImages/SmokyMountainsImage600.png':
            lat = 35.6117;
            lon = -83.4895;
            break;
        case 'assets/images/MatchImages/YellowstoneImage600.png':
            lat = 44.4280;
            lon = -110.5885;
            break;
        case 'assets/images/MatchImages/YosemiteImage600.png':
            lat = 37.8651;
            lon = -119.5383;
            break;
        default: console.log('No matching search target.');
    }
  
    fetch(`../proxy_campgrounds.php?lat=${lat}&lon=${lon}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(result => {
      
        result.campgrounds.forEach((element)=>{
            const name = element.name;
            const hyperlink = element.url;
            
            let li = $('<li>');
            let anchor = $('<a>').text(name).attr({
                'href': hyperlink,
                'target': '_blank'
            });
            li.append(anchor);
            DOMElements.infoCampgrounds.append(li);
        });
    })
    .catch(error => console.log(' campgrounds fetch error: ', error));

    fetch(`../proxy_trails.php?lat=${lat}&lon=${lon}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(result => result.json())
    .then(result => {
        
        result.trails.forEach((element) => {
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
    })
    .catch(error => console.log('trails fetch error: ', error));
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
    }

    if (stats.matches === 9) {
        stats.gamesPlayed++;
        displayModal();
    }

    DOMElements.stats.attempts.text(`Attempts: ${stats.attempts}`);
    DOMElements.stats.gamesPlayed.text(`Games Played: ${stats.gamesPlayed}`);
    DOMElements.stats.matches.text(`Matches: ${stats.matches}`);

   
}

const displayModal = () => {
    $('.game-container').fadeOut(2000).delay(1000);
    $('.modal').fadeIn(2000).toggleClass('hidden');
}


//image slider code//
// $(function(){
//     autoslide();
// });

// function autoslide() {
//     if (!$('.slider .active').is(':last-child')) {
//         $('.slider .active').delay(3000).fadeOut(2000, function () {
//             $(this).removeClass('active').next().addClass('active').fadeIn();
//             autoslide();
//             console.log(this);
//         })
//     } else {
//         $('.slider .active').removeClass('active').delay(3000).fadeOut(2000, function () {
//             $('.slider .image').eq(0).addClass('active').fadeOut(2000);
//             autoslide();
//         })
//     }
// };