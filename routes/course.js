/**
 *
 * @date    03/01/14 17:03
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */
var db = require('../config/dbschema');

exports.addCourse = function(req, res) {
    console.log("POST: ");
    console.log(req.body);

    var course = new db.CourseModel({
                                        courseId: req.body.courseId,
                                        courseName: req.body.courseName,
                                        courseTypeId: req.body.courseTypeId,
                                        info: req.body.info,
                                        startDate: req.body.startDate,
                                        signupsDate: req.body.signupsDate
                                    });

    course.save(function(err) {
        if (!err) {
            return console.log("Course created!");
        } else {
            return console.log(err);
        }
    });
    return res.send(course);
};

exports.showCourses = function(req, res) {
    return db.CourseModel.find(function(err, course) {
        if (!err) {
            return res.send(course);
        } else {
            return console.log(err);
        }
    })
};

exports.showCourse = function(req, res) {
    return db.CourseModel.findById(req.params.id, function(err, course) {
        if (!err) {
            return res.send(course);
        } else {
            return console.log(err);
        }
    })
};