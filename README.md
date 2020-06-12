# Gavor
The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(___TODO__: GAVOR_)

# GAVOR

## Overview

(___TODO__: a brief one or two paragraph, high-level description of your project_)

I want to design a generic social network site.  Non registered users can register through the register page.  Users will have a profile and a feed.  The users will be able to upload photos and interests to their profile.  Additionally the profile will also have a posting section where users can upload photos and text to a feed. On the profile page will also appear a list of message conversations with other users.  The feed for a particular user will consist of posts of text and images from other users for which the user is friends with. The user will be able to post to their feed from both the profile page and the feed page.  The user will also be able to upload videos to their profile and feed.


## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) 

The application will store users interests, information on their profile and photos
Users will be able to upload photos,videos and text to their profile and feed
Users will be able to communicate with other users via messaging

(___TODO__: sample documents_)

An Example User:

```javascript
{
const user = new mongoose.Schema({
    username: String,
    fullname:String,
    password: String,
    profile:[]
    
});
book.plugin(url_slug('username fullname'));
mongoose.model('user',user);

const User = mongoose.model('user');
const profile = new mongoose.Schema({
    photos: [],
    friends: [],
    interests:[]
});
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)
see file in repository

## Wireframes


(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

see files in repository

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

see files in repository

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can upload photos and videos
4. as a user, I can view all the photos and videos and text of me and all other users that are my friends


## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

3 points integrate Jquery library in app
3 points integrate node module multer
2 points Use Bootstrap for front end design

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)
see files in repository

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)


https://www.npmjs.com/package/multer
https://jquery.com/
https://getbootstrap.com/
