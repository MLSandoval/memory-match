const cardImageURLArray = [
    'assets/images/CardImages/Arches1.png',
    'assets/images/CardImages/CraterLake1.png',
    'assets/images/CardImages/DeathValley1.png',
    'assets/images/CardImages/GrandCanyon1.png',
    'assets/images/CardImages/GrandTeton1.png',
    'assets/images/CardImages/JoshuaTree1.png',
    'assets/images/CardImages/Seqoia1.png',
    'assets/images/CardImages/SmokyMountains1.png',
    'assets/images/CardImages/YellowstoneLogo1.png',
    'assets/images/CardImages/Yosemite1.png'
];
const parkImageURLArray = [];
const DOMElements = {};


$(document).ready(function(){
    createCards(cardImageURLArray);

});

const createCards = (cardImages) => {
    let elementsArray = [];

    for(let i = 0; i < 9; i++){
        let cardContainer = $("<div>").addClass('card-container');
        let cardBack = $("<div>").addClass('card-back');
        let cardReverse = $("<div>").css('background-image', `url('${cardImages[i]}')`)
        
        cardContainer.append(cardBack, cardReverse);
        elementsArray.push(cardContainer);
    }

    DOMElements.cards = elementsArray;
    DOMElements.cardRows = [];
    DOMElements.cardRows.push($('.card-row1'), $('.card-row2'), $('.card-row3'));
    console.log(DOMElements);

    //must double cards before appending, and add shuffle feature
    for(let i = 0; i < elementsArray.length; i++){
        switch(i){
            case 0:
            case 1: 
            case 2:
            case 3:
            case 4:
            case 5: DOMElements.cardRows[0].append(DOMElements.cards[i]);
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11: DOMElements.cardRows[1].append(DOMElements.cards[i]);
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17: DOMElements.cardRows[2].append(DOMElements.cards[i]);
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