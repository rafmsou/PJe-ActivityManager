var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  , http = require('http')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// var issuer = require('./agent/requestIssuer.js');
// issuer.requestProcessData('1001877-88.2014.5.02.0000', function(){ console.log('callback called') });
//issuer.requestProcessData('1001313-03.2013.05.02.0467', function(){ CONSOLE.log('callback called') });
