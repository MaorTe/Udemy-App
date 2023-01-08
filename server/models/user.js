const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Course = require('./course');

const userSchema = new mongoose.Schema({
   userRole: {
      type: String,
      required: false,
      enum: ['user', 'admin'],
      default: 'user',
   },
   name: {
      type: String,
      required: true,
      trim: true,
   },
   avatar: {
      type: Buffer,
   },
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('Email is invalid');
         }
      },
   },
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
         if (value.toLowerCase().includes('password')) {
            throw 'Password cannot contain "password" less than 7 letters';
         }
      },
   },
   age: {
      type: Number,
      default: 0,
      validate(value) {
         if (value < 0) {
            throw new Error('Age must be a positive number');
         }
      },
   },
   courses: [
      {
         courseId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
         },
      },
   ],
   tokens: [
      {
         token: {
            type: String,
            required: true,
         },
      },
   ],
});

//virtual property
//--is not actual data stored in the DB, its a relationship between 2 entities--
//in this case between our user and course
//its virtual cuz we are not actually changing what we stored for the user doc,its just a way for mongoose to figure out how these 2 things are related

userSchema.methods.toJSON = function () {
   const user = this;
   const userObject = user.toObject();

   delete userObject.password;
   delete userObject.tokens;
   delete userObject.avatar;

   return userObject;
};

//methods accessible on the instances, called instance methods
userSchema.methods.generateAuthToken = async function () {
   const user = this;
   const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse', {
      expiresIn: '7 days',
   });
   // save multiple tokens in case a user wants to login from different devices
   user.tokens = user.tokens.concat({ token });
   await user.save();

   return token;
};

//Statics are Mongoose's implementation of OOP static functions. You add a static function to your schema, and Mongoose attaches it to any model you compile with that schema.
//statics accessible on the models, called model methods
userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({ email });

   if (!user) {
      throw new Error('Unable to login');
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
      throw new Error('Unable to login');
   }
   return user;
};

//--Hash the plain text password before saving
//set the middleware up, pre/post is before/after validation,saving...
//it has to be a regular function cuz arrow functions dont bind "this"
userSchema.pre('save', async function (next) {
   //"this" equals to the document being saved
   //next is provided when we are done, if we never called next it will think we still run code
   const user = this;

   //certain mongoose queries bypass advanced features like middleware
   //so if we want to use them consistently we need to restructure
   if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

userSchema.pre('remove', async function (next) {
   const user = this;
   await Course.deleteMany({ owner: user._id });
   next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
