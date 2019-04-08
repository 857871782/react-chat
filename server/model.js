const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/react-chat";
mongoose.connect(DB_URL,{ useNewUrlParser: true });

const model = {
    user: {
        'user': {type:String, require:true},
        'pwd': {type:String, require:true},
        'type': {type:String, require:true},
        'avatar': {type:String},
        'desc': {type:String},
        //职位名
        'title': {type:String},
        //boss
        'company': {type:String},
        'money': {type:String}

    },
    chat: {
        "chatid": {type: String, require: true},
        "from": {type: String, require: true},
        "to": {type: String, require: true},
        "content": {type: String, require: true, default: ''},
        "read": {type: Boolean, default: false},
        "create_time": {type: Number, default: new Date().getTime()}
    }
}

for(let m in model){
    mongoose.model(m,new mongoose.Schema(model[m]))
}

module.exports = {
    getModel: function(name){
        return mongoose.model(name)
    }
}