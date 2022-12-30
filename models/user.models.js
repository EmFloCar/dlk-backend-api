const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.pre('save', function(next) {
    if(this.IsNew || this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if(err) {
                next(err);
            } else {
                this.password = hash;
                next();
            }
        });
    } else {
        next();
    }   
});


const User = mongoose.model('user', userSchema);
module.exports = User;