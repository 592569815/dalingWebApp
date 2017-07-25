//npm install mongodb --save-dev
var  mongodb = require('mongodb');
//联接 mongodb 服务器
var  server  = new mongodb.Server('localhost', 27017);
//指定要操作哪个数据库 => use  1000phone
var devDB = '1000phone';
var utDB = '2000phone';
var uatDB = '3000phone';
var productionDB = 'chen';
var  db = new mongodb.Db(productionDB, server);

module.exports = {
    //用户登录；
    login: function(collectionName, data, callback){
        //要查找的用户名信息；
        var username = data.username;
        var password = data.password;
        db.open(function(error, db){
            //没有报错时，使用集合
            if(!error){
                db.collection(collectionName,function(err,collection){
                    // console.log(collection)
                    if(collection){
                    console.log("username",data.username);
                        //查找所有用户匹配是否存在；
                        collection.find({username:username}).toArray(function(err,docs){
                            // console.log(docs,docs[0]);
                            //遍历所有文档，查看用户是否存在；
                            if(docs.length > 0){
                                console.log("用户存在，")
                                if(docs[0].password == password){
                                    console.log("登录成功！")
                                    //关闭数据库；
                                    db.close();

                                    if(callback && typeof callback == 'function'){
                                        console.log("callback")
                                        callback({status:true,message:"登录成功！",data:docs[0]});
                                    }
                                }else{
                                    //关闭数据库；
                                    db.close();

                                    //用户或者密码不正确，输出提示信息
                                    if(callback && typeof callback == 'function'){
                                        callback({status:false,message:"密码不正确",data:null});
                                    }
                                }
                            }else{
                                //关闭数据库；
                                db.close();
                                console.log("用户不存在！")

                                //用户或者密码不正确，输出提示信息
                                if(callback && typeof callback == 'function'){
                                    callback({status:false,message:"用户不存在",data:null});
                                }       
                            }
                        });
                    }
                });
            };
        })
    },

    //用户注册；
    register: function(collectionName, data, callback){
        var username = data.username;
         db.open(function(error, db){
            if(!error){
                db.collection(collectionName,function(err,collection){
                    if(!collection){
                        //如果当前集合不存在，则创建一个集合；
                        db.createCollection(collectionName, function(err, collection){
                            //报错信息；
                            if(err){
                                console.log(err);
                            }else{
                                collection.insert(data,{safe:true},function(err,result){
                                    console.log("noCollection,注册成功！");
                                    db.close();
                                    if(callback && typeof callback == 'function'){
                                        callback({status:true,message:"注册成功！",data:null});
                                    }
                               });
                            }
                        });
                    }else{
                        //集合存在时，查找用户名；
                        collection.find({username:username}).toArray(function(err,docs){

                            console.log(docs)
                            if(docs.length > 0){
                                console.log("用户已存在！");
                                db.close();
                                if(callback && typeof callback == 'function'){
                                    callback({status:false,message:"用户已存在！",data:null});
                                }
                            }else{
                                collection.insert(data,{safe:true},function(err,result){
                                    console.log("注册成功！");
                                    db.close();
                                    if(callback && typeof callback == 'function'){
                                        callback({status:true,message:"注册成功！",data:null});
                                    }
                               });
                            }
                        })
                    }
                 });
            }
         })
    },

    //单个商品查询；
    getAccount:function(collectionName, goodsId, callback){
        db.open(function(error, db){
            if(!error){
                //查找对应 id 的商品；
                db.collection(collectionName,function(err,collection){
                    console.log(goodsId,goodsId.id)
                    collection.find({id:goodsId}).toArray(function(err,docs){
                        if(!err){
                            //得到商品信息；
                            // console.log(docs)
                            if(docs.length > 0){
                                console.log("找到 id 为 " + goodsId + " 的商品");
                                db.close();
                                if(callback && typeof callback == "function"){
                                    callback({status:true,message:"找到 id 为 " + goodsId + " 的商品",details:docs});
                                }
                            }else{
                                console.log("找不到对应 id 的商品");
                                db.close();
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"找不到 id 为 " + goodsId + " 的商品",details:null});
                                }
                            }
                        }else{
                            console.log(err)
                        }
                    })
                });
            }
        })
    },

    //所有商品；
    getAccounts:function(collectionName, callback){
        db.open(function(err,db){
            if(!err){
                db.collection(collectionName,function(err,collection){
                    collection.find().toArray(function(err,docs){
                        if(!err){
                            //得到商品信息；
                            if(docs.length > 0){
                                console.log("找到所有商品信息");
                                db.close();
                                if(callback && typeof callback == "function"){
                                    callback({status:true,message:"找到所有商品信息",allGoods:docs});
                                }
                            }else{
                                console.log("当前数据库没有商品");
                                db.close();
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"当前数据库没有商品",details:null});
                                }
                            }
                        }else{
                            console.log(err)
                        }
                    })
                })
            }
        })
    }
}
