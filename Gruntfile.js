var db = require('./config/dbschema');

module.exports = function(grunt) {

    //TODO finish init mongo task
//    grunt.initConfig({
//                        shell: {
//                            mongo: {
//                                command: 'mongod',
//                                options: {
//                                    async: true
//                                }
//                            }
//                        }
//                    });
//
//    grunt.registerTask('initMongo', 'init mongo :)', function(){
//
//    });

    grunt.registerTask('dbseed', 'seed the database', function() {
        grunt.task.run('adduser:admin:admin@example.com:tajnehasloktoreniebawemzmienie:true');
    });
    grunt.registerTask('adduser', 'add a user to the database', function(usr, emailaddress, pass, adm) {
        adm = (adm === "true");

        var user = new db.userModel({ username: usr
                                        , email: emailaddress
                                        , password: pass
                                        , admin: adm });

        var done = this.async();
        user.save(function(err) {
            if(err) {
                console.log('Error: ' + err);
                done(false);
            } else {
                console.log('saved user: ' + user.username);
                done();
            }
        });
    });
};