var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.register = function(app){
    app.get('getProducts', function(request, response){
        //请求数据库
        response.send({status: true, message: null})
    })

    app.post('addProducts', function(request, response){
        //请求数据库
        response.send({status: true, message: null})
    })    

    app.post('updateProducts', function(request, response){
        //请求数据库
        response.send({status: true, message: null})
    })      

    app.post('deleteProducts', function(request, response){
        //请求数据库
        response.send({status: true, message: null})
    })       
}