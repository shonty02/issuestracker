const mongoose = require('../connection');

const mySchema = new mongoose.Schema({
    title : String,
    description : String,
    assignedBy : {type: mongoose.Types.ObjectId, ref: 'users'},
    assignedTo : {type: mongoose.Types.ObjectId, ref: 'users'},
    resolved : {type : Boolean, default: false},
    resolvedOn : Date,
    createdAt :{type : Date, default: new Date()}
})

const myModel = mongoose.model( "issue", mySchema );

module.exports = myModel;