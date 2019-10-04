const cardImageURLArray = [
    'assets/images/CardImages/Arches1.png',
    'assets/images/CardImages/CraterLake1.png',
    'assets/images/CardImages/DeathValley1.png',
    'assets/images/CardImages/GrandCanyon1.png',
    // 'assets/images/CardImages/GrandTeton1.png',
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
    // 'assets/images/MatchImages/GrandTeton600.png',
    'assets/images/MatchImages/JoshuaTreeImage600.png',
    'assets/images/MatchImages/SeqoiaImage600.png',
    'assets/images/MatchImages/SmokyMountainsImage600.png',
    'assets/images/MatchImages/YellowstoneImage600.png',
    'assets/images/MatchImages/YosemiteImage600.png'
];

const DOMElements = {};

$(document).ready(function(){
    createCards(cardImageURLArray);
    assignClickHandlers();

});

const assignClickHandlers = () => {
    
    // $('.card-row').on('click', '.card-container-inner', function(event){
    //     console.log('this on click: ', this);
    //     console.log('event.currenttarget on click: ', event.currentTarget);
    //     $($(event.currentTarget).children()[1]).addClass('hidden');
    //     console.log('event.currentTarget: ' ,event.currentTarget);
    //     $($(event.currentTarget).children()[0]).removeClass('hidden');

    // })

    $('.card-container').on('click', function(event){
        console.log(event);
        $(event.currentTarget).toggleClass('is-flipped');
    })
}

const createCards = (cardImages) => {
    cardImages = cardImages.concat(cardImages);

    let flipCardsArr = [];
    for(let i = 0; i < cardImages.length; i++){
        let cardContainer = $("<div>").addClass('card-container');
        let cardContainerInner = $("<div>").addClass('card-container-inner');
        let cardBack = $("<div>").addClass('card-back').css('background-image', `url('assets/images/CardImages/CardBack1.png')`);
        let cardImage = $("<img>").text('text');
        //addClass hidden back to card reverse
        let cardFace = $("<div>").addClass('card-face').css('background-image', `url('${cardImages[i]}')`);

        cardContainerInner.append(cardFace, cardBack);
        cardContainer.append(cardContainerInner);
        flipCardsArr.push(cardContainer);
    }

    DOMElements.cards = flipCardsArr;
    DOMElements.cardRows = [
        $('.card-row1'), 
        $('.card-row2'), 
        $('.card-row3')
    ];

    shuffleCardsArr();
    appendCardsToDom();
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
        console.log('card append loop i: ', i);

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