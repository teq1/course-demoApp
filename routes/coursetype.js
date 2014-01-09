/**
 *
 * @date    03/01/14 17:03
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */
var db = require('../config/dbschema');

exports.addCoursetypes = function(req, res) {
    console.log("POST: ");
    console.log(req.body);

    var coursetype = new db.CourseTypeModel({
                                                courseTypeId: req.body.courseTypeId,
                                                name: req.body.name,
                                                departmentId: req.body.departmentId,
                                                header: req.body.header,
                                                subheader: req.body.subheader,
                                                desc: req.body.desc,
                                                price: req.body.price
                                            });

    coursetype.save(function(err) {
        if (!err) {
            return console.log("CourseType created!");
        } else {
            return console.log(err);
        }
    });
    return res.send(coursetype);
};

exports.showCoursetypes = function(req, res) {
    return db.CourseTypeModel.find(function(err, coursetype) {
        if (!err) {
            return res.send(coursetype);
        } else {
            return console.log(err);
        }
    })
};

exports.showCoursetype = function(req, res) {
    return db.CourseTypeModel.findById(req.params.id, function(err, coursetype) {
        if (!err) {
            return res.send(coursetype);
        } else {
            return console.log(err);
        }
    })
};