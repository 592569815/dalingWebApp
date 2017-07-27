var bodyParser = require('body-parser');

//新引入的模块；
var url =require("url");
var multer = require("multer");

//设置上传的目录，  
//这里指定了一个临时目录（上传后的文件均保存到该目录下），  
//真正开发是一般加入path模块后使用path.join(__dirname,'temp');  
// var upload = multer({ dest:  "./web/img" });  


var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './web/img')
    },
    filename: function (request, file, callback) {
        //获取文件后缀
        var fileFormat = (file.originalname).split(".");
        // callback(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        callback(null,file.originalname);
    }
})

var upload = multer({ storage: storage }) ; 


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var db = require('../dbhelpter');
exports.register = function(app){

    //分页或懒加载；

    app.post('/getProducts', urlencodedParser, function(request, response){
        //请求数据库
        db.getProducts("products",request.body,function(res){
            if(res.status){

                response.send(res.details);
            }
        });
       
    });

    //添加商品；
    //单位件上传   
    //注意上传界面中的 <input type="file" name="avatar"/>中的name必须是下面代码中指定的名称  
    app.post('/addProducts',  upload.fields([{name:'pic',maxCount:10}]), function (request, response, next) {

        //添加商品参数；  
        var add_goods =  request.body;

        //获取图片名称；
        add_goods["img"] = request.files.pic[0].filename;
         
        console.log(add_goods)
            
         //请求数据库
        db.addProducts("products",add_goods,function(res){
            if(res.status){

                response.send({status: true, message: res.message,details:res.details});
            }else{
                 response.send({status: false, message: res.message,details:res.details});
            }
        });
    });    

    //更新商品；
    app.post('/updateProducts', urlencodedParser, function(request, response){
       
        console.log(888,request.body)
        //请求数据库
        db.updateProducts("products",request.body,function(res){
            if(res.status){

                response.send({status: true, message: res.message,details:res.details})
            }
        })
    });      

    //删除商品；
    app.post('/deleteProducts',urlencodedParser, function(request, response){
        //请求数据库
         db.deleteProducts("products",request.body,function(res){
            if(res.status){

                response.send({status: true, message: res.message,details:res.details})
            }
        })
    });  

    //商品模糊查询；
    app.post("/queryProducts",urlencodedParser,function(request,response){

        var keyWord = request.body.keyWord;
        console.log(keyWord)
        db.queryProducts("products",keyWord,function(res){
            if(res.status){

                response.send(res);
            }
        })
    })     
}