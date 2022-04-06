const mongoose = require('../connection');

const mySchema = new mongoose.Schema({
    title : String,
    members : [{type: mongoose.Types.ObjectId, ref: 'users'}],
    admin : {type: mongoose.Types.ObjectId, ref: 'users'},
    description : String,
    issues : Array,
    createdAt :{type : Date, default: new Date()}
})

const myModel = mongoose.model( "teams",mySchema )

module.exports = myModel;


