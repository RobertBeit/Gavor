const mongoose = require('mongoose');
const db = require('./db2');
let dbconf;
const fs = require('fs');
 const path = require('path');
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/finalproject';
}
//export PORT=14513; export NODE_ENV=PRODUCTION; ~/usr/local/lib/node_modules/.bin/forever -o ~/var/log/app.log -e ~/var/log/app_error.log start app5.js
//~/usr/local/lib/node_modules/.bin/forever stopall
//tail ~/var/log/app.log ~/var/log/app_error.log
mongoose.connect(dbconf);
const express = require('express');
const app = express();
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname,'/public/uploads/') });
var upload2 = multer({ dest: path.join(__dirname,'/public/uploads2/') });
app.listen(process.env.PORT || 4000);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
const user = mongoose.model('user');
const profile = mongoose.model('profile');
const port = process.env.PORT;
//linserv1.cims.nyu.edu ... port 14513
app.use(express.static(__dirname + '/public/'));
app.set('view engine','hbs');

app.get('/', (req,res) =>{
   res.render("home.hbs");
});
app.get('/register', (req,res) =>{
   res.render("register.hbs");
    
});
app.post('/register', (req,res) =>{
   
    let username = req.body.username;
    let password = req.body.password;
    let name = req.body.fullname;
    const profileobj={
        photos: [],
        friends: [],
        interests:["interest"]
    }
    let user1 = new user({
        username:username,
        password:password,
        name:name,
        profile:profileobj,
        interests:["interests"]
    });
    user1.save(function(err,user){
        let redirstring = "/profile/"+user.slug;
        res.redirect(redirstring);
    })
    
});
app.post('/signin', (req,res) =>{
    let username = req.body.username;
    let password = req.body.password;
    user.find({username:username},function(err,varToStoreResult,count){
        console.log(varToStoreResult);
        if(varToStoreResult[0] !== undefined){
            if(password === varToStoreResult[0].password){
            res.redirect('/profile/'+varToStoreResult[0].slug);
        }
            else{
            res.redirect("/");
                
        }
            
        }
        else{
            res.redirect("/");
        }
        
        
        
       
        
            
        });
    

});
app.get('/profile/:slug', (req,res) =>{
   let slug = req.params.slug;
    const obj = {
        interests:"Interests",
        slug:slug,
        photos:"photos",
        friends:"friends",
        posts:"posts",
        videos:"videos"
        
        
    }
    console.log("This is the slug");
    console.log(slug);
    let inter = "";
    let phot = "";
    let fri = "";
    let pos = "";
    let vid = "";
    user.find({slug:slug},function(err,varToStoreResult,count){
        console.log(varToStoreResult);
        console.log("This is what is being read");
        console.log(varToStoreResult[0]);
        for(let i = 0; i< varToStoreResult[0].photos.length;i+=1){
        phot +="<img class = \"moving_guy\" src = /uploads/"+varToStoreResult[0].photos[i]+">";
            obj["photos"] = phot;
            console.log(phot);
        }
        for(let i = 0; i< varToStoreResult[0].videos.length;i+=1){
        vid += "<video class = \"moving_guy\" width = \"320\" height = \"240\"  controls>";    
        vid +="<source class = \"moving_guy\"   type = \"video/mp4\" src = /uploads2/"+varToStoreResult[0].videos[i]+">";
            vid+= "</video";
            obj["videos"] = vid;
            console.log(vid);
        }
        for(let i = 0; i< varToStoreResult[0].friends.length;i+=1){
        fri += varToStoreResult[0].friends[i]+"<br>";
        
        obj["friends"] = fri;
        console.log(inter);
            
        }
        for(let i = 0; i< varToStoreResult[0].posts.length;i+=1){
          pos += varToStoreResult[0].posts[i]+"<br>";
        
        obj["posts"] = pos;
        console.log(inter);
            
        }
        
        for(let i = 0; i< varToStoreResult[0].interests.length;i+=1){
        inter += varToStoreResult[0].interests[i]+"<br>";
        
        obj["interests"] = inter;
        console.log(inter);
            
        }
        
        
        res.render("profile.hbs",obj);
    });
});
app.post('/profile/:slug/update', (req,res) =>{
   let interests1 = req.body.interests;
    let slug = req.params.slug;
    let interests = interests1.split(",");
    
    
         user.findOneAndUpdate({slug:slug}, {$push:{interests:interests}},function(err,user,count){
        let s = "/profile/"+slug;
             
                 res.redirect(s); 
            
        
    });
        
    
   
    
});
app.post('/profile/:slug/updatephoto',upload.single('avatar'), function(req,res,next){
    let slug = req.params.slug;
   let file = req.file;
    
    
    let name = file.filename;
    let name_2 = name+".jpg";
    console.log("this is the filename");
    console.log(name);
    
    user.findOneAndUpdate({slug:slug}, {$push:{photos:name_2}},function(err,user,count){
        let s = "/profile/"+slug;
        const dir = path.join(__dirname+"/public/uploads/");
const match = name;
const replace = name+".jpg";
const files = fs.readdirSync(dir);

files
  .filter(file => file.match(match))
  .forEach(file => {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, file.replace(match, replace));

    fs.renameSync(filePath, newFilePath);
  });
             
                 res.redirect(s); 
            
        
    });
    
        
    
   
    
});
app.post('/profile/:slug/addfriend',upload.single('avatar'), function(req,res,next){
    let slug = req.params.slug;
   let friend = req.body.friend;
    
    
    user.find({username:friend},function(err,varToStoreResult,count){
        if(varToStoreResult[0] === undefined){
            console.log("user does not exist");
            let s = "/profile/"+slug;
             
                 res.redirect(s); 
            
        }
        else{
            user.findOneAndUpdate({slug:slug}, {$push:{friends:friend}},function(err,user,count){
        let s = "/profile/"+slug;
             
                 res.redirect(s); 
            
        
    });
            
        }
    });
    
        
    
   
    
});
app.post('/profile/:slug/posts',upload.single('avatar'), function(req,res,next){
    let slug = req.params.slug;
   let post = req.body.post;
    let post_2 = slug+" says"+":"+post+":";
    
    user.findOneAndUpdate({slug:slug}, {$push:{posts:post_2}},function(err,user,count){
        let s = "/profile/"+slug;
             console.log("updating posts");
                 res.redirect(s); 
            
        
    });
    
        
    
   
    
});
app.get('/feed/:slug', (req,res) =>{
    let slug = req.params.slug;
    user.find({slug:slug},function(err,varToStoreResult,count){
        
        if(varToStoreResult[0] === undefined){
            
            console.log("user does not exist");
        }
        else{
            console.log("this code is running");
            const obj = {
                posts:"posts"
            }
            
            let pos = "";
            for(let i = 0; i< varToStoreResult[0].posts.length;i+=1){
          pos += varToStoreResult[0].posts[i]+"<br>";
                for(let i = 0; i < varToStoreResult[0].friends.length;i+=1){
                user.find({username:varToStoreResult[0].friends[i]},function(err,friend,count){
                    console.log(varToStoreResult[0].friends[i]);
                    for(let j = 0; j< friend[0].posts.length;j+=1){
                        
                        pos += friend[0].posts[j] +"<br>";
                        console.log(friend[0]);
                        console.log(varToStoreResult[0]);
                        const filtered_arr2= friend[0].comments.filter(comment => parseInt(comment.split(",")[2]) === i);
                        for(let l=0;l<filtered_arr2.length;l+=1){
                            let come2 = filtered_arr2[l].split(",");
                            pos += come2[0]+":"+come2[1]+"<br>";
                        }
//                        for(let k = 0; k<varToStoreResult[0].comments.length;k+=1){
//                            let come = varToStoreResult[0].comments[k].split(",");
//                            let num_comment = parseInt(come[2]);
//                            if(num_comment === j){
//                                pos += come[0]+":"+come[1]+"<br>";
//                            }
//                        }
                        pos += "<form action = /comment/"+varToStoreResult[0].slug+" method = \"POST\">"+"<input type = \"text\" name = \"comment\">"+"<input type = \"radio\" name =\"comnum\" value ="+j+" checked>"+"<input type = \"radio\" name =\"commenter\" value ="+friend[0].username+" checked>"+"Comment<input type = \"submit\" class = \"btn btn-secondary\">"+"</form>";
                    }
                    
                   
                     });
                
                
            }
        
        
            
        }
            for(let i = 0; i < varToStoreResult[0].friends.length;i+=1){
                user.find({username:varToStoreResult[0].friends[i]},function(err,friend,count){
                    console.log(varToStoreResult[0].friends[i]);
                    for(let j = 0; j< friend[0].posts.length;j+=1){
                        
                        pos += friend[0].posts[j] +"<br>";
                        console.log(friend[0]);
                        console.log(varToStoreResult[0]);
                        const filtered_arr = varToStoreResult[0].comments.filter(comment => parseInt(comment.split(",")[2]) === i);
                        for(let l=0;l<filtered_arr.length;l+=1){
                            let come = filtered_arr[l].split(",");
                            pos += come[0]+":"+come[1]+"<br>";
                        }
                        const filtered_arr2 = friend[0].comments.filter(comment => parseInt(comment.split(",")[2]) === i);
                        for(let l=0;l<filtered_arr2.length;l+=1){
                            let come = filtered_arr2[l].split(",");
                            pos += come[0]+":"+come[1]+"<br>";
                        }
//                        for(let k = 0; k<varToStoreResult[0].comments.length;k+=1){
//                            let come = varToStoreResult[0].comments[k].split(",");
//                            let num_comment = parseInt(come[2]);
//                            if(num_comment === j){
//                                pos += come[0]+":"+come[1]+"<br>";
//                            }
//                        }
                        pos += "<form action = /comment/"+varToStoreResult[0].slug+" method = \"POST\">"+"<input type = \"text\" name = \"comment\">"+"<input type = \"radio\" name =\"comnum\" value ="+j+" checked>"+"<input type = \"radio\" name =\"commenter\" value ="+friend[0].username+" checked>"+"Comment<input type = \"submit\" class = \"btn btn-secondary\">"+"</form>";
                    }
                    obj["posts"] = pos;
                    if(i === varToStoreResult[0].friends.length-1){
                         res.render("feed.hbs",obj);
                    }
                   
                     });
                
                
            }
            
            
            
        }
        
            
        
    });
  
    
});
app.post('/comment/:slug',upload.single('avatar'), function(req,res,next){
    let slug = req.params.slug;
   let comment = req.body.comment;
    let num_post = req.body.comnum;
    let commenter = req.body.commenter;
    let comment2 = slug+","+comment+","+num_post;
    
    
    user.findOneAndUpdate({slug:slug}, {$push:{comments:comment2}},function(err,user,count){
        let s = "/feed/"+slug;
             console.log("updating comments");
                 res.redirect(s); 
            
        
    });
    
        
    
   
    
});
app.post('/profile/:slug/updatevideo',upload2.single('avatar'), function(req,res,next){
    let slug = req.params.slug;
   let file = req.file;
    
    
    let name = file.filename;
    let name_2 = name+".mp4";
    console.log("this is the filename");
    console.log(name);
    
    user.findOneAndUpdate({slug:slug}, {$push:{videos:name_2}},function(err,user,count){
        let s = "/profile/"+slug;
        const dir = path.join(__dirname+"/public/uploads2/");
const match = name;
const replace = name+".mp4";
const files = fs.readdirSync(dir);

files
  .filter(file => file.match(match))
  .forEach(file => {
    const filePath = path.join(dir, file);
    const newFilePath = path.join(dir, file.replace(match, replace));

    fs.renameSync(filePath, newFilePath);
  });
             
                 res.redirect(s); 
            
        
    });
    
        
    
   
    
});
app.post('/carousel/:slug', (req,res) =>{
    let phot = "";
    let slug = req.params.slug;
    const obj = {
        carousel:"carousel",
        slug:slug
    }
    
    user.find({slug:slug},function(err,varToStoreResult,count){
        for(let i = 0;i<varToStoreResult[0].photos.length;i+=1){
            if(i === 0){
                phot +="<div class=\"carousel-item active\">";
                phot += "<img class = \"d-block w-100\" src =/uploads/"+varToStoreResult[0].photos[i]+">";
                phot += "</div>";
            }
            else{
                phot +="<div class=\"carousel-item\">";
                phot += "<img class = \"d-block w-100\" src =/uploads/"+varToStoreResult[0].photos[i]+">";
                phot += "</div>";
                
            }
        }
        obj["carousel"] = phot;
        res.render("carousel.hbs",obj)
    });
    

});
