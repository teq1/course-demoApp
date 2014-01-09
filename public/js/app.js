'use strict';
angular.module('biApp', ['domModule', 'restangular', 'ui.bootstrap']).
    config(function($routeProvider, $locationProvider, RestangularProvider) {
               $routeProvider.
                   when('/', {
                            templateUrl: 'partials/main-page',
                            controller: 'AppCtrl'
                        });

               $locationProvider.html5Mode(true);
           });
