var path = require('path');
var product = require('./product');
var account = require('./account')

exports.register = function(express){
    var app = express();


    //跨域；
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        if(req.method=="OPTIONS") {
            res.send(200);/*让options请求快速返回*/
        } else{
            next();
        }
    });

    app.use(express.static(path.join(path.resolve(__dirname,"../../"), '/')));
    
    app.get('/', function(request, response){
        response.send('Home Page');
    })    

    product.register(app);
    account.register(app);

    app.listen(1234);
}