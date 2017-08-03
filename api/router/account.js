var bodyParser = require('body-parser');

//新引入的模块；
var url =require("url");
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var db = require('../dbhelpter');

exports.register = function(app){
    //用户登录；
    app.post('/login', urlencodedParser, function(request, response){
        //请求数据库
        db.login('user', request.body, function(data){
            console.log(data.status)
            if(data.status){
                //登录成功返回提示信息；
                response.send({status: true, message: data.message, data: null})
            } else { 
                //登录失败返回提示信息；
                response.send({status: false, message: data.message,data:null})
            }
        })
        
    });

    //用户注册；
    app.post('/register', urlencodedParser, function(request, response){
        //请求数据库
        db.register("user",request.body, function(data){
            if(data.status){
                //注册成功返回提示信息；
                response.send({status: true, message: data.message, data: null})
            } else { 
                //注册成功返回提示信息；
                response.send({status: false, message: data.message,data:null})
            }
        });
    });

    //单个商品查询
    app.get('/getAccount', function(request, response){

        //get请求提取参数；
        var urlObj = url.parse(request.url,true);

        //商品id;
        var goodsId = Number(urlObj.query.id);
        

        //请求数据库
        db.getAccount("products",goodsId,function(data){
            if(data.status){
                response.send({status: true, message: data.message, data:data.details});
            }else{
                response.send({status:false,message:"商品不存在！",data:null});
            }
        })
    });

    //所有商品查询；
    app.get("/getAccounts", function(request,response){
        console.log(99999)
        db.getAccounts("products",function(data){
             if(data.status){
                response.send({status: true, message: data.message, data:data.allGoods});
            }else{
                response.send({status:false,message:"商品不存在！",data:null});
            }
        })
    });

    //用户管理收货地址；
    app.post("/getAddress", urlencodedParser,function(request,response){
        db.getAddress("user_address",request.body,function(data){
            if(data.status){
                response.send(data);
            }
        })
    });

    //用户删除收货地址；
    app.post("/delAddress", urlencodedParser,function(request,response){
        
        db.delAddress("user_address",request.body,function(data){
            if(data.status){
                response.send(data);
            }
        })
    });

    app.post("/ajax", urlencodedParser, function(request,response){
        console.log(999)
        response.send(request.body);
    });

}