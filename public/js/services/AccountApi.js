/**
 *
 * @date    11/28/13 4:00 PM
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular) {
    'use strict';
    var AccountApi = function(Restangular, $http) {

        //get students
        var studentsAll = Restangular.all('api').one('students');
        this._getStudents = function(){
            return studentsAll.get().then(function(students) {
                return students;
            });
        };

        //get courses
        var coursesAll = Restangular.all('getdata').one('courses');
        this.getCourses = function(){
            //PRZEROBIC NA BEZ THAN - zwracac resolved promise
            return coursesAll.get().then(function(courses) {
                return courses;
            });
        };

        //get course types
        var coursesTypesAll = Restangular.all('getdata').one('coursetype');
        this.getCourseTypes = function(){
            return coursesTypesAll.get().then(function(coursetype) {
                return coursetype;
            });
        };


        // add alement ( student, course stc ) sprawdzic czy da sie przerobic na restangular z innym headerem
        this._addElement = function(url, data) {
            $http({
                      method: 'POST',
                      url: url,
                      data: $.param(data),
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                  })
                .success(function(data) {
                             console.log(data);
                         })
                .error(function(data) {
                           console.log(data);
                       })
        };

    };

    angular.
        module('biApp').
        service('AccountApi', ['Restangular', '$http', AccountApi]);

}(angular));