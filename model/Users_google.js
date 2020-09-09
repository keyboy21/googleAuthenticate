const mongoose = require('mongoose');
const FindandCreate = require("mongoose-find-or-create")
const User = mongoose.Schema({
    googleID: {
        type: String,
        unique: true,
    },
    name: String,
    surname: String,
    profilePhoto: String

})

User.plugin(FindandCreate)
module.exports = mongoose.model('Users', User)