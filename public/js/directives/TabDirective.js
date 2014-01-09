/**
 *
 * @date    03/01/14 01:19
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular){
    'use strict';
    var TabDirective = function(){

        var link = function(scope, element, attrs){
            scope.activeTab = 0;
            scope.toggleVisibleTab = function(index){
                scope.activeTab = index;
            }
        };

        return {
            scope: {
                tabDirective: '='
            },
            link: link,
            template: '<aside class="col-md-4">' +
                      '<div class="list-group">' +
                      '<a class="list-group-item" ' +
                      'data-ng-repeat="tabNav in tabDirective" ' +
                      'data-ng-click="toggleVisibleTab($index)" ' +
                      'data-ng-class="{active: activeTab==$index}">' +
                      '<h4 class="list-group-item-heading">{{tabNav.name}}</h4>' +
                      '<p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>' +
                      '</a>' +
                      '</div></aside>' +

                      '<article class="col-md-8 fade in" data-ng-class="{hide: activeTab!=$index}" data-ng-repeat="tab in tabDirective">' +
                      '<h2>{{tab.header}}</h2>' +
                      '<h6>{{tab.subheader}}</h6>' +
                      '<p>{{tab.desc}}</p>' +
                      '<p> Donec lacinia congue felis in faucibus.</p>' +
                      '<div class="row article-gallery">' +
                      '<div class="col-md-2"><img src="http://placehold.it/74x74"></div>' +
                      '<div class="col-md-2"><img src="http://placehold.it/74x74"></div>' +
                      '</div><a class="arrow-link">Cras purus odio, vestibulum in vulputate</a>' +
                      '</article>'
        }
    };

    angular.
        module('domModule').
        directive("tabDirective", [TabDirective]);
}(angular));