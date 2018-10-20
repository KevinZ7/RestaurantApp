/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    function createDonutCard(...donutData...) {

        //header data
        let $headerContent = $('<header>');
        let $donutImg = $('<img>').attr("src", ...).addClass('donut-card__img');
        //compile header
        $headerContent.append($donutImg);

        //section data
        let $donutContent = $('<section>').addClass('donut-card__body-text');
        let $donutName = $('<h3>').text(...).addClass('donut-card__name');
        let $donutDescription = $('<p>').text(...).addClass('donut-card__description');
        let $donutPrice = $('<span>').text(...).addClass('donut-card__price');
        //compile section
        $donutContent.append($donutName, $donutDescription, $donutPrice);

        //bring together
        let $donutCard = $('<article>').addClass('donut-card');
        $donutCard.append($donutImg, $donutContent);

        return $donutCard;

        function renderDonutCardToPage(donuts) {
            donuts.forEach(function (donut) {
                $("#...").prepend(createDonutCard(donut));
            })
        }

    }

});