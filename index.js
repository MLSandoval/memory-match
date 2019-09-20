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
    createCardElements(cardImageURLArray);

});

const createCards = (cardImages) => {
    let elementsArray = [];

    for(let i = 0; i < 9; i++){
        let cardContainer = $("<div>").addClass('card-container');
        let cardBack = $("<div>").addClass('card-back');
        let cardReverse = $("<div>").css('background-image', `${cardImages[i]}`)
        

        elementsArray.push(tempCard);
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