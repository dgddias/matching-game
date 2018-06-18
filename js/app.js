
const cards = ["fa-car", "fa-plane", "fa-umbrella", "fa-home", "fa-anchor", "fa-diamond", "fa-bicycle", "fa-bomb"];
let cardOpen = [];
let count = 0;
let cardmatch = 0;
let stars = 3;

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
    - loop through each card
*/
function loadArray() {

    shuffle(cards.concat(cards)).forEach(loadpage);
}

/*
  - add each card's HTML to the page
 */

function loadpage(card) {

    $(".panel-custom .container").append(`<div class="col-md-3 col-sm-3 col-xs-6">
                        <ul class="list-unstyled">
                            <li class="card">
                                <i class="fa ${card}"></i>
                            </li>
                        </ul>
                    </div>`);

}

/*
check match
 */
function checkOpen() {

    if ((cardOpen[0].find('i').attr('class')) === (cardOpen[1].find('i').attr('class'))) {
        cardmatch++;
        cardOpen.forEach(function (e) {

            e.toggleClass("open showcard match");
        });
    } else {

        cardOpen.forEach(function (e) {
            e.animateCss('shake', function () {
                e.toggleClass("open showcard");
            });
        });
    }

    cardOpen = [];
    count += 1;
    addMoves();
    if (cardmatch === 8) {

        endGame();
    }

}

/*
function endgame
 */
function endGame() {

    if (stars === 3) {
        swal({
            title: "Good job!",
            text: `"You won the game with ${count} movies and ${stars} stars"`,
            imageUrl: './img/good-job.png',
            confirmButtonClass: "btn btn-primary",
            closeOnConfirm: false,
        }, function (isConfirm) {

            resetGame();

        });
    } else if (stars === 2) {

        swal({
            title: "Not Bad!",
            text: `"You won the game with ${count} movies and ${stars} stars, tente melhorar!!!"`,
            imageUrl: './img/not-bad.png',
            confirmButtonClass: "btn btn-primary",
            closeOnConfirm: false,
        }, function (isConfirm) {

            resetGame();

        });


    } else {

        swal({
            title: "Bad!",
            text: `"You won the game with ${count} movies and ${stars} stars, tente melhorar!!!"`,
            imageUrl: './img/sad.jpg',
            confirmButtonClass: "btn btn-primary",
            closeOnConfirm: false,
        }, function (isConfirm) {

            resetGame();

        });

    }
}

/*
function newGame
 */
function resetGame() {

    location.reload();

}

/*
function count move
 */
function addMoves() {

    $(".moves").html(count);

    if (count === 15) {
        stars = 2;
        removeStars();
    }
    if (count === 20) {
        stars = 1;
        {
            removeStars();

        }
    }

}

/*
function load stars and add HTML to the page
 */
function loadStars() {

    for (let i = 0; i < 3; i++) {

        $('.score-panel .stars').append(`<li><i class="fa fa-star" style="color: #ebe111"></i></li>`);
    }

}

/*
function remove stars Html
 */

function removeStars() {

    let stars = $(".fa-star");
    $(stars[stars.length - 1]).toggleClass("fa-star fa-star-o");
}

/*
function animate.css
 */
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = (function (el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            };

            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t];
                }
            }
        })(document.createElement('div'));

        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);

            if (typeof callback === 'function') callback();
        });

        return this;
    },
});

/*
start DOM
 */
$(document).ready(function () {
    loadArray();
    loadStars();

    $('.card').on('click', function () {

        let classes = $(this).attr('class');
        if (classes.search('open') * classes.search('match') !== 1) {
            // both should be -1
            return;
        }

        // cards can be flipped
        if (cardOpen.length < 2) {
            $(this).toggleClass("open showcard");
            cardOpen.push($(this));
        }
        // check if cards match
        if (cardOpen.length === 2) {
            checkOpen();
        }
    });

});