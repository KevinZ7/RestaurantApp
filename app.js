/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    function createDonutCard(...donutData...) {

        // Render Dount Card to page


        //header data
        let $headerContent = $('<header>');
        let $donutImg = $('<img>').attr("src", ...).addClass('card-display');
        //compile header
        $headerContent.append($donutImg);

        //section data
        let $donutContent = $('<section>').addClass('donut-content');
        let $donutName = $('<h3>').text(...).addClass('');
        let $donutDescription = $('<p>').text(...).addClass('');
        let $donutPrice = $('<span>').text(...).addClass('');
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