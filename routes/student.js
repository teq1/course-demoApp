/**
 *
 * @date    03/01/14 14:06
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */
var db = require('../config/dbschema');

exports.addStudent = function(req, res) {
    console.log("POST: ");
    console.log(req.body);
    //Fake studentId
    var studentId = function(req) {
        var firstLetterName = req.body.name.charAt(0);
        var firstLetterSurname = req.body.surname.charAt(0);
        var d = new Date();
        var monthIdentyficator = d.getMonth();
        var dayIdentyficator = d.getDay();
        var randomNum = Math.floor(Math.random() * 1000000) + 2;
        var studentId = firstLetterName + firstLetterSurname + monthIdentyficator + dayIdentyficator + randomNum;
        return studentId;
    };
    //console.log(req.connection);

    var student = new db.StudentModel({
                                          studentId: studentId(req),
                                          name: req.body.name,
                                          surname: req.body.surname,
                                          email: req.body.email,
                                          address: req.body.address,
                                          phone: req.body.phone,
                                          info: req.body.info,
                                          userAgent: req.useragent,
                                          ip: req.connection.remoteAddress,
                                          paymentConfirmation: req.body.paymentConfirmation,
                                          paymentConfirmationDate: req.body.paymentConfirmationDate,
                                          courseId: req.body.courseId
                                      });
    student.save(function(err) {
        if (!err) {
            return console.log("Created student!");
        } else {
            return console.log(err);
        }
    });
    return res.send(student);
};

exports.showStudents = function(req, res) {
    return db.StudentModel.find(function(err, students) {
        if(!err && students){
            return res.send(students);
        } else {
            return console.log(err);
        }
    });
};
//TODO referencje albo mapowanie
exports.showStudent = function(req, res) {
    return db.StudentModel.findById(req.params.id, function(err, student) {
        if (!err) {
            var courseId = student.courseId;
            db.CourseModel.find({courseId: courseId}, function(err, course){
                if(course){
                    student.courseId = course[0];
                }
                return res.send(student);
            });
        } else {
            return console.log(err);
        }
    })
};