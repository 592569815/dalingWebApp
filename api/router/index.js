var path = require('path');
var product = require('./product');
var account = require('./account')

exports.register = function(express){
    var app = express();

    app.use(express.static(path.join(__dirname, '/')));
    
    app.get('/', function(request, response){
        response.send('Home Page');
    })    

    product.register(app);
    account.register(app);

    app.listen(1703);
}