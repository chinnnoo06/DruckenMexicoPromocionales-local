const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

module.exports = model("User", UserSchema, "users");