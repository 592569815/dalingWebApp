//npm install mongodb --save-dev
var  mongodb = require('mongodb');
//联接 mongodb 服务器
var  server  = new mongodb.Server('localhost', 27017);
//指定要操作哪个数据库 => use  1000phone
var devDB = '1000phone';
var utDB = '2000phone';
var uatDB = '3000phone';
var productionDB = '4000phone';
var  db = new mongodb.Db(productionDB, server);

module.expres = {
    add: function(collection, data, callback){
        db.open(function(error, db){
            db.collection(collection, function(error, collection){
                collection.insert(data, function(){
                    if(callback && typeof callback == 'function()'){
                        callback()
                    }
                })
            })
            db.close();
        })
    },
    delete: function(){},
    query: function(){},
    update: function(){}
}
