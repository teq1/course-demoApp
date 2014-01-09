/**
 *
 * @date    03/01/14 17:03
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */
var db = require('../config/dbschema');

exports.addDepartment = function(req, res){
    console.log("POST: ");
    console.log(req.body);

    var department = new db.DepartmentModel({
                                                departmentId: req.body.departmentId,
                                                departmentName: req.body.departmentName
                                            });

    department.save(function(err){
        if(!err){
            return console.log("Department created!");
        } else {
            return console.log(err);
        }
    });
    return res.send(department);
};

exports.showDepartments = function(req, res){
    return db.DepartmentModel.find(function(err, department){
        if (!err) {
            return res.send(department);
        } else {
            return console.log(err);
        }
    })
};

exports.showDepartment = function(req, res){
    return db.DepartmentModel.findById(req.params.id, function(err, department){
        if (!err) {
            return res.send(department);
        } else {
            return console.log(err);
        }
    })
};

