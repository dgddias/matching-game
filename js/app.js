/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardOpen = [];

$('.card').on('click', function () {

    //let classe = $(this).children().attr('class');

    // cards can be flipped
    if (cardOpen.length < 2){
        $(this).toggleClass("open show");
        cardOpen.push($(this));
    }
    // check if cards match
    if (cardOpen.length === 2){
        checkOpen();
    }
});


function checkOpen() {


    if((cardOpen[0].find('i').attr('class')) === (cardOpen[1].find('i').attr('class'))){
        cardOpen.forEach(function(e){
           /* card.animateCss('tada', function(){*/
                e.toggleClass("open show match");

        });
    } else {

    }

}


// event handler for when the card is clicked
function cardClick(event){
    // check opened or matched card
    let classes = $(this).attr("class");
    if (classes.search('open') * classes.search('match') !== 1){
        // both should be -1
        return;
    }
    // start game if needed
    if (!started) {
        started = true;
        timeCount = 0;
        timerPtr = setTimeout(startTimer, 1000);
    }
    // cards can be flipped
    if (openCards.length < 2){
        $(this).toggleClass("open show");
        openCards.push($(this));
    }
    // check if cards match
    if (openCards.length === 2){
        checkOpenCards();
    }
}
