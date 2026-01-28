const User = require("../models/User")

const userRepository = {
    async register(data) {
        return User.create(data)
    },

    async findById(id) {
        return User.findById(id);
    },

    async findByUserName(username) {
        return User.findOne({ username })
    }
}

module.exports = userRepository