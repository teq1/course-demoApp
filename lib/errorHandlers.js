/**
 *
 * @date    10/12/13 01:20
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */
exports.logErrors = function (err, req, res, next) {
    console.error('logErrors', err.toString());
    next(err);
};

exports.clientErrorHandler = function (err, req, res, next) {
    console.error('clientErrors ', err.toString());
    res.send(500, { error: err.toString()});
    if (req.xhr) {
        console.error(err);
        res.send(500, { error: err.toString()});
    } else {
        next(err);
    }
};

exports.errorHandler = function (err, req, res, next) {
    console.error('lastErrors ', err.toString());
    res.send(500, {error: err.toString()});
};