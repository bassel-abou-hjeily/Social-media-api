const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,

    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
        trim: true,
        maxLength: 20,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        trim: true,
        maxLength: 150,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: [true, "Phone Number is required"],
        trim: true,
        maxLength: 20,

    },
    profilePicture: {
        type: String,
        default: "",
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",

    },
    ],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",

    },
    ],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",

    },
    ],
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,

    },
    passwordConfirm: {
        type: String,
        trim: true,
        minLength: 8,
    },
    passwordChangedAt: Date,

},
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {// if the password field is not modified
            return next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;

    } catch (err) {
        console.log(err)
    }

});
userSchema.methods.checkPassword = async function (
    candidatePassword, // coming from the frontend
    userPassword // the hashed saved password coming from the DB
) {
    return await bcrypt.compare(candidatePassword, userPassword)

}
module.exports = mongoose.model("User", userSchema);