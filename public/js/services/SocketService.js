/**
 *
 * @date    06/01/14 15:28
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular){
    var SocketService = function($rootScope, $timeout){
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $timeout(function () {
                        callback.apply(socket, args);
                    }, 0);
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    };

    angular.
        module('biApp').
        service('SocketService', ['$rootScope', '$timeout', SocketService])
}(angular));