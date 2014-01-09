/**
 * Module dependencies
 */
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    user_routes = require('./routes/user'),
    department_routes = require('./routes/departments'),
    coursetype_routes = require('./routes/coursetype'),
    course_routes = require('./routes/course'),
    student_routes = require('./routes/student'),
    models = require('./models'),
    http = require('http'),
    path = require('path'),
    db = require('./config/dbschema'),
    pass = require('./config/pass'),
    mongoose = require('mongoose'),
    lessMiddleware = require('less-middleware'),
    errorHandlers = require('./lib/errorHandlers'),
    passport = require('passport'),
    useragent = require('express-useragent');




var app = module.exports = express();
app.configure(function() {
    app.use(lessMiddleware({src: __dirname + '/public',compress: true }));
    app.use(express.static(__dirname + '/public'));
    app.use(errorHandlers.logErrors);
    app.use(errorHandlers.clientErrorHandler);
    app.use(errorHandlers.errorHandler);
    app.use(useragent.express());
});



// all environments
app.set('port', process.env.APP_PORT || 8000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'superTajneFrazaKtoraZostanieZmieniona' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// dev
if (app.get('env') === 'development') {
    app.use(express.errorHandler());
}
// prod
if (app.get('env') === 'production') {
    //TODO logi
    //TODO dumpy bazy
}


/**
 * Routes
 */
// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//  API
app.get('/api' ,pass.ensureAuthenticated, function (req, res) {
    //TODO loguj każde wejście na ten endpoint
    res.send('API is running!');
});
// Fake test rout
app.get('/api/name', api.name);

// Department routs
app.get('/getdata/departments' , department_routes.showDepartments); // PUBLIC
app.get('/getdata/departments/:id' , department_routes.showDepartment); // PUBLIC
app.post('/api/departments/add', pass.ensureAuthenticated, pass.ensureAdmin(), department_routes.addDepartment);

// Course types routs
app.get('/getdata/coursetype' , coursetype_routes.showCoursetypes); // PUBLIC
app.get('/getdata/coursetype/:id' , coursetype_routes.showCoursetype); // PUBLIC
app.post('/api/coursetype/add', pass.ensureAuthenticated, pass.ensureAdmin(), coursetype_routes.addCoursetypes);

// Courses routs
app.get('/getdata/courses' , course_routes.showCourses); // PUBLIC
app.get('/getdata/courses/:id' , course_routes.showCourse); // PUBLIC
app.post('/api/course/add', pass.ensureAuthenticated, pass.ensureAdmin(), course_routes.addCourse);

// Student routs
app.get('/api/students', student_routes.showStudents);
app.post('/api/students/add', pass.ensureAuthenticated, pass.ensureAdmin(), student_routes.addStudent);
app.get('/api/student/:id', pass.ensureAuthenticated, pass.ensureAdmin(), student_routes.showStudent);
//app.put('/api/student/:id', pass.ensureAuthenticated, pass.ensureAdmin(), student_routes.updateStudent);
//app.delete('/api/student/:id', pass.ensureAuthenticated, pass.ensureAdmin(), student_routes.deleteStudent);


// User pages
app.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getlogin);
app.post('/login', user_routes.postlogin);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.get('/logout', user_routes.logout);

// redirect others
//TODO serve 404
app.get('*', routes.index);


/**
 * Start Server
 */
var ip = process.env.APP_IP || '0.0.0.0';
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'), ip, function(){
    console.log('Express server listening on port ' + app.get('port') + ip);
});

io.sockets.on('connection', require('./routes/socket'));


