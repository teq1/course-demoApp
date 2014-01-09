/**
 *
 * @date    11/28/13 4:00 PM
 * @author  Wiktor Jamro <w.jamro@smartrecruiters.com>
 *
 */

(function(angular) {
    'use strict';
    var controller = function($scope, $http, AccountApi, Restangular, SocketService) {
        $scope.appVersion = "0.1";

        //Events
        $scope.NEW_STUDENT = 'newStudent';
        $scope.NEW_COURSE = 'newCourse';

        // Notyfications
        //TODO przerobić na osobny kontroler
        $scope.notifications = [
            {
                name: "Witaj w panelu courseapp. Wersja: " +  $scope.appVersion,
                type: "alert-info"
            }
        ];

        // Tabs - TODO sprawdź czy $timeout ma opcji nie łapania w digestach
        setTimeout(function(){
            if($scope.coursesTabs) {
                console.log($scope.coursesTabs.$$v[0].courseId);
                //resolve promise without geting data in hard way
                $scope.currentCourse = $scope.coursesTabs.$$v[0].courseId;
            }
        },200);
        $scope.currentCourseTab = function(course){
            $scope.currentCourse = course;
            console.log(course);
        };

        //Get all students - secure
        $scope.students = AccountApi._getStudents();
        $scope.$on($scope.NEW_STUDENT, function(_, data){
            console.log(event);
            $scope.students = AccountApi._getStudents();
        });

        //Get all courses - public
        $scope.courses = AccountApi.getCourses();
        $scope.coursesTabs = AccountApi.getCourses();
        $scope.$on($scope.NEW_COURSE, function(_, data){
            console.log(event);
            $scope.courses = AccountApi.getCourses();
            $scope.coursesTabs = AccountApi.getCourses();
        });

        //Add student - secure
        $scope.addStudentModel = {};
        $scope.addStudent = function(){
            // Get Course id instead sending whole course object
            if($scope.addStudentModel.courseId){
                $scope.addStudentModel.courseId = $scope.addStudentModel.courseId.courseId;
            }
            AccountApi._addElement("/api/students/add", $scope.addStudentModel);
            $scope.notifications.push({
                name: 'Student : ' + $scope.addStudentModel.name + " " + $scope.addStudentModel.surname + " - został dodany!",
                type: 'alert-success'
                });
            $scope.$broadcast($scope.NEW_STUDENT);
        };

        //Add course - secure
        $scope.addCourseModel = {};
        $scope.addCourse = function(){
            AccountApi._addElement("/api/course/add", $scope.addCourseModel);
            $scope.notifications.push({
                name: 'Kurs : ' + $scope.addCourseModel.courseName + " - został dodany!",
                type: 'alert-success'
                });
            $scope.$broadcast($scope.NEW_COURSE);
        };


        //Get course name from ID
        $scope.getCourseName = function(id){
            var courseName;
            var v = $scope.courses.$$v;
            if(v){
                var vLen = v.length;
                for ( var i = 0; i < vLen; i++){
                    if ( id === v[i].courseId){
                        courseName = v[i].courseName;
                    }
                }
            }
            return courseName;
        };

        //Datepicker
        var today = new Date();
        $scope.addCourseModel.startDate = today;
        $scope.addCourseModel.signupsDate = today;

        // Get data via Sockets - OFF :P
        SocketService.on('send:name', function (data) {
            $scope.SocketTest = data.name;
        });


    };

    angular.
        module('biApp').
        controller('AccountCtrl', ['$scope', '$http', 'AccountApi', 'Restangular', 'SocketService', controller]);

}(angular));