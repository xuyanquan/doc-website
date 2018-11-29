let connect = require('connect');
let serveStatic = require('serve-static');
let morgan = require('morgan');

let app = connect()
	.use(morgan('combined'))
	.use('/', serveStatic(__dirname + '/assets'))
	.use('/', serveStatic(__dirname + '/doc'))
	// .use('/', function (req, res) {
	// 	res.writeHead(302, {'Location': '/index.html'});
	//     res.end();
	// })
	.use(function (err, req, res, next) {
		console.log(err)
		res.end()
	})
	.listen(3080, function () {
		console.log('Server running on 3080...');
	})
