const express = require("express");
const utils = require("utility");
const Router = express.Router();
const model = require("./model");
const User = model.getModel('user');
const Chat = model.getModel("chat");
const _filter = {'pwd': 0, "__v": 0};

Router.get("/list",function(req,res){
    const {type} = req.query;
    User.find({type},function(err,doc){
        return res.json({code: 0, data: doc})
    })
})

Router.get("/info", function (req, res) {
    const {userid} = req.cookies;
    if(!userid){
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function(err, doc){
        if(err){
            return res.json({code: 1, msg: '后端出错'});
        }
        if(doc){
            return res.json({code: 0, data: doc});
        }
    });
})

Router.post("/login", function(req, res){
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
        if(!doc){
            return res.json({code: 1, msg: "用户名或密码错误"
            })
        }else{
            res.cookie('userid', doc._id);
            return res.json({code: 0, data: doc});
        }
    })
})

Router.post("/register",function(req, res){
    const {user, pwd, type} = req.body;
    const md5pwd = md5Pwd(pwd);
    User.findOne({user},function(err, doc){
        if(doc){
            return res.json({code:1, msg:'用户名已存在'})
        }
        const userModel = new User({user, type, pwd:md5Pwd(pwd)});
        userModel.save(function(e, d){
            if(e){
                return res.json({code: 1, msg: '后端出错了'});
            }
            const {user, type, _id} = d;
            res.cookie("userid", _id);
            return res.json({code: 0, data: {user, type, _id}})
        })      
    })
});

Router.post('/update', function(req, res){
    const userid = req.cookies.userid;
    if(!userid){
        return res.json({code: 1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function(err, doc){
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 0, data});
    })
})

Router.get("/getmsglist", function(req, res){
    const user = req.cookies.userid;
    User.find({}, function(err, doc){
        let users = {};
        doc.forEach(val => {
            users[val._id] = {name: val.user, avatar: val.avatar}
        })
        Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc){
            if(!err){
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})

Router.post("/readmsg", function(req, res){
    const userid = req.cookies.userid;
    const {from} = req.body;
    Chat.update(
        {from, to: userid}, 
        {"$set": {read: true}}, 
        {"multi": true},
        function(err, doc){
            console.log(doc)
            if(!err){
                return res.json({code: 0, num: doc.nModified})
            }
            return res.json({code: 1, msg: "error"})
        }
    )
})

function md5Pwd(pwd){
    const salt = "react-chat-zjx";
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;