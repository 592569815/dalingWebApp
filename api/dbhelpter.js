//npm install mongodb --save-dev
var  mongodb = require('mongodb');
//联接 mongodb 服务器
var  server  = new mongodb.Server('localhost', 27017);
//指定要操作哪个数据库 => use  1000phone
var devDB = '1000phone';
var utDB = '2000phone';
var uatDB = '3000phone';
var productionDB = 'daling';
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

    //所有商品查询；
    getAccounts:function(collectionName, callback){
        
        db.open(function(err,db){
            if(!err){console.log("getAccounts方法");
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
    },

    //商品更新；
    updateProducts:function(collectionName, goodsUpdate, callback){
        db.open(function(error, db){
            if(!error){
                //查找对应 id 的商品；
                db.collection(collectionName,function(err,collection){
                    console.log(goodsUpdate.id);
                    // var id = Number(goodsUpdate.id);
                    goodsUpdate.id = Number(goodsUpdate.id);
                    collection.find({id:goodsUpdate.id}).toArray(function(err,docs){
                            console.log(docs)
                        if(!err){
                            //得到商品信息；
                            // console.log(docs)
                            if(docs.length > 0){
                            
                                //更新内容；
                                collection.update({'id':goodsUpdate.id},{'$set':goodsUpdate},upsert=true,multi=true);
                                db.close();
                                if(callback && typeof callback == "function"){
                                    callback({status:true,message:"更新成功！",details:goodsUpdate});
                                }
                            }else{
                                console.log("找不到对应 id 的商品");
                                db.close();
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"找不到 id 为的商品",details:null});
                                }
                            }
                        }else{
                            console.log(err)
                        }
                    })
                });
            }
        });
    },

    //商品删除；
    deleteProducts:function(collectionName, goodsDelete, callback){
        db.open(function(error, db){
            if(!error){
                //查找对应 id 的商品；
                db.collection(collectionName,function(err,collection){
                    console.log(goodsDelete.id);
                    // var id = Number(goodsUpdate.id);
                    goodsDelete.id = Number(goodsDelete.id);
                    collection.find({id:goodsDelete.id}).toArray(function(err,docs){
                            console.log(docs)
                        if(!err){
                            //得到商品信息；
                            // console.log(docs)
                            if(docs.length > 0){
                            
                                //更新内容；
                                collection.remove({'id':goodsDelete.id});
                                db.close();
                                if(callback && typeof callback == "function"){
                                    callback({status:true,message:"该商品已经删除！",details:goodsDelete});
                                }
                            }else{
                                console.log("找不到对应 id 的商品");
                                db.close();
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"找不到 id 为的商品",details:null});
                                }
                            }
                        }else{
                            console.log(err)
                        }
                    })
                });
            }
        });
    },

    //商品懒加载；
    getProducts:function(collectionName, num_obj, callback){

        //默认显示20个商品；
        var obj ={page:1,qty:20};
        var targetObj = {};
        //对象扩展；
        Object.assign(targetObj,obj,num_obj);


        var page = targetObj.page - 1;
        var qty = Number(targetObj.qty);

        console.log(targetObj,page,qty)
         db.open(function(error, db){
            if(!error){
                //查找对应 id 的商品；
                db.collection(collectionName,function(err,collection){
                    // if(err) return;
                    var total = 0;

                    collection.find().toArray(function(err,docs){
                        // if(err) return 
                        if(!err){
                            total = docs.length;
                        }
                    });
                  
                    collection.find().limit(qty).skip(page*qty).toArray(function(err,docs){
                            // console.log(docs)
                        if(!err){
                            //得到商品信息；
                            // console.log(docs)
                            if(docs.length > 0){
                                
                                //输出商品数量；
                                var data = {};
                                                            
                                data["data"] = docs;
                                data["total"] = total;

                                // console.log(data);
                               
                                if(callback && typeof callback == "function"){
                                     db.close();
                                    callback({status:true,message:"商品获取成功！",details:data});
                                    return;
                                }
                            }else{
                                console.log("商品获取失败！");
                                // db.close();
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"商品获取失败！",details:null});
                                    return;
                                }
                            }
                            // db.close();
                        }else{
                            // db.close();
                            console.log(err);
                        };
                      
                    });
                });
            }
            
        });

    },

    //添加商品；
    addProducts:function(collectionName, goodsObj, callback){
        var id = Number(goodsObj.id);
        var price = Number(goodsObj.price);
        goodsObj.id = id;
        goodsObj.price = price;
        //打开数据库
        db.open(function(error,db){
            if(!error){
                db.collection(collectionName,function(err,collection){
                    if(!err){
                        collection.find({id:id}).toArray(function(err,docs){
                            //商品id存在，提示更换id；
                            if(docs.length > 0){
                                db.close();
                                //回调函数；
                                if(callback && typeof callback == "function"){
                                    callback({status:false,message:"商品id已存在，请更换id！",data:null});
                                };
                            }else{
                                collection.insert(goodsObj,{safe:true},function(err,result){
                                    console.log("商品添加成功！");
                                    db.close();
                                    //回调函数；
                                    if(callback && typeof callback == "function"){
                                        callback({status:true,message:"商品添加成功！",data:goodsObj});
                                    };
                                })
                            }
                        })
                        
                    }
                })
            }
        })
    },

    //商品模糊查询；
    queryProducts:function(collectionName, data, callback){
        db.open(function(err,db){
            if(!err){
                db.collection(collectionName,function(err,collection){

                    if(!err){

                        // db.collection.find( { field: /acme.*corp/i } );
                        // db.test_info.find({"tname": {$regex: '测试', $options:'i'}}) 
                        var name = data.name;
                        var keyWord = new RegExp(data.keyWord,"i");
                        console.log(data.name)

                        collection.find({[name]:{$regex:keyWord}}).toArray(function(err,docs){
                            console.log(66666666,docs)
                            if(docs){
                                if(docs.length > 0){
                                    if(callback && typeof callback == "function"){
                                        callback({status:true,message:"找到符合条件的商品",data:docs})
                                    }
                                }else{
                                    if(callback && typeof callback == "function"){
                                        callback({status:false,message:"没有找到符合条件的商品",data:null})
                                    }
                                }

                            }else{
                                if(callback && typeof callback == "function"){
                                    callback({status:false,message:"没有找到符合条件的商品",data:null})
                                }
                            }
                        })
                    }
                })
            }
            db.close();
        })
    },

    //价格排序；
    sortPrice:function(collectionName, sortPrice, callback){

        //默认显示20个商品；
        var obj ={page:1,qty:20};
        var targetObj = {};
        //对象扩展；
        Object.assign(targetObj,obj,sortPrice);


        var page = targetObj.page - 1;
        var qty = Number(targetObj.qty);
        var up_down = Number(sortPrice.status);
        var name = sortPrice.options;

        db.open(function(error, db){
        
            if(!error){
                //查找对应 id 的商品；
                db.collection(collectionName,function(err,collection){
                    // if(err) return;
                    var total = 0;
                   
                    collection.find().sort({[name]:up_down}).limit(qty).skip(page*qty).toArray(function(err,docs){
                        if(!err){
                            //得到商品信息；
                            if(docs.length > 0){
                                
                                //输出商品数量；
                                var data = {};
                                                            
                                data["data"] = docs;

                                if(callback && typeof callback == "function"){
                                    callback({status:true,message:"商品获取成功！",details:data});
                                    return;
                                }
                            }else{
                                console.log("商品获取失败！");
                                 if(callback && typeof callback == "function"){
                                    callback({status:false,message:"商品获取失败！",details:null});
                                    return;
                                }
                            }
                        }else{
                            console.log(err)
                        }
                    });
                    db.close();
                });
            }  
        });
    }
}
