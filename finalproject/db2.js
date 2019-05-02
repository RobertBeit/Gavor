const mongoose = require('mongoose');
const url_slug = require('mongoose-url-slugs');
const profile = new mongoose.Schema({
    photos: [],
    friends: [],
    interests:[],
   
});
mongoose.model('profile',profile);
const user = new mongoose.Schema({
    username: String,
    fullname:String,
    password: String,
    profile:profile,
    interests:[],
    photos:[],
    friends:[],
    posts:[],
    videos:[],
    comments:[]
});

user.plugin(url_slug('username fullname'));
mongoose.model('user',user);

const User = mongoose.model('user');

mongoose.connect('mongodb://localhost/finalproject'); 