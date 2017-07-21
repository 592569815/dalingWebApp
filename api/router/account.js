var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelpter');

exports.register = function(app){

    app.post('/login', urlencodedParser, function(request, response){
        //请求数据库
        db.add('users', request.body, function(data){
            if(data.status){
                response.send({status: true, message: null, data: null})
            } else {
                response.send({status: false, message: null})
            }
        })
        
    })

    app.post('/regitster', urlencodedParser, function(request, response){
        //请求数据库
        response.send({status: true, message: null})
    })

    app.get('/getAccounts', function(request, response){
        //请求数据库
        response.send({status: true, message: null, data: [{name: 'sam', age: 18}, {}]})
    })

}