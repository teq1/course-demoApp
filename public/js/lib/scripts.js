/**
 *
 * @date    11/28/13 8:13 PM
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */




$(document).ready(function(){

    $('.carousel').carousel({
        interval: 2000
    });

    $('#CourseTabNav a').on("click", function (e) {
        e.preventDefault();
    });
});