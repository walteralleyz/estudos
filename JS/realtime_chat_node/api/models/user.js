const mongoose = require("mongoose"),
uuidv1 = require("uuid/v1"),
crypto = require("crypto"),
{ObjectId} = mongoose.Schema,

user_schema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    contacts: [{type: ObjectId, ref: "UserChat"}]
});

user_schema.virtual("password")
.set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
});

user_schema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return "";
        try {
            return crypto
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex");
        } catch(error) {
            return "";
        }
    }
}

module.exports = mongoose.model("UserChat", user_schema);