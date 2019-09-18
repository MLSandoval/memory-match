const cardImageURLArray = [];
const parkImageURLArray = [];
const DOMElements = {};


$(document).ready(function(){
    createCardElements(cardImageURLArray);

});

const createCards = (cardImages) => {
    let elementsArray = [];

    for(let i = 0; i < cardImages.length; i++){
        let tempCardBack = $("<div>").addClass('card-back');
        

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