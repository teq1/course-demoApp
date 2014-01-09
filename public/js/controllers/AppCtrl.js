/**
 *
 * @date    11/28/13 4:00 PM
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular) {
    'use strict';
    var controller = function($scope, $http, AccountApi) {

        // get course types via restangular
        $scope.CourseTabs = AccountApi.getCourseTypes();



        //TODO przerobić na dyrektywe
        var parallaxScroll = function(){
            var parallaxer = new ParallaxScroller();
            parallaxer
                .addLayer('#Qoute', 0.2, 'background', "no-repeat")
                .addLayer('#main-video', 0.2, 'background', "no-repeat")
                .addLayer('.collage-gallery', 0.1, 'background', "no-repeat")
                .addLayer('.page-header-template', 0.2, 'background', "no-repeat");
        }; parallaxScroll();


    };

    angular.
        module('biApp').
        controller('AppCtrl', ['$scope', '$http', 'AccountApi', controller]);

}(angular));