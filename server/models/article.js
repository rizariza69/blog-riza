const mongoose = require('mongoose')
// var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const articleSchema =  new Schema({
    title: String,
    description: String,
    comment: [],
    userId: { type: Schema.Types.ObjectId, ref: 'Users' }
},{
    timestamps: true
})

const Articles = mongoose.model("Article", articleSchema)

module.exports = Articles