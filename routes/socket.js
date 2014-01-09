/**
 *
 * @date    06/01/14 14:51
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

module.exports = function (socket) {
    socket.emit('send:name', {
        name: 'Sockety działają ziom!'
    });

};