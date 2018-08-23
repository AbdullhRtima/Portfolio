var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user :'root',
    password : '',
    database :'portfolio'
  });
  connection.connect(function(err){
    if (err){
      console.log('error');
    }else{
      console.log('connected in  new !');
    }
  });
// storage 
const storage = multer.diskStorage({
    destination:'./public/img/portfolio/',
    filename:function(req,file,cb){
        cb(null,file.filename + '-'+ Date.now()+
        path.extname(file.originalname));
    }
});

// Iint Upload 
const upload = multer({
    storage : storage ,
    limits:{fileSize : 100000000 },
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}) 

// check file type 
function checkFileType (file,cb){
 // allowed extintion 
 const filetypes = /jpeg|jpg|png|gif/ ;
 // check ext 
 const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
 //check mime 
 const mimetype = filetypes.test(file.mimetype);

 //check both by if 
 if (mimetype && extname){
     return cb( null ,true);

 }else{
     cb('Error : Image only !!')
 }
};

//new project 
router.get('/', function(req, res, next) {
    res.render('new');
  });

router.post('/',upload.single('projectimage'),function(req,res,next){
    
      console.log('i am in adding '); 
      console.log(req.body); 
      var title = req.body.title ;
      var client = req.body.client ;
      var description = req.body.description ;
      var service = req.body.service ;
      var date = req.body.date ;
    //img 
   // upload(req,res,(err) => {
    // })
  //  var image = upload(req,res,(err) => {

   // })
    var image = req.file.filename ;
      
  //  if (req.files.singleInputFileName){
    //    console.log('uploading image ....')
      //  var singleInputFileNameName  = req.file.projectimage.name ;
     //}else{
      // var projectimageName = 'noimage.png';
    // }

     console.log('i am here ')
     req.checkBody('title','title is require ').notEmpty();
     req.checkBody('service','service is require ').notEmpty();
     var errors = req.validationErrors();
     if (errors){
        res.render('new',{
             errors : errors ,
             title :title ,
             description :description ,
             service :service ,
             client :client 
     });
    }else{
         var project = {
            title : title ,
            description :description ,
            service : service ,
            client :client ,
            date : date ,
            image : image
         };
        var query = connection.query('INSERT INTO projects SET ?',project,function (err ,result){
            if (err) throw err ;
            console.log('done');
        });
       //  req.flash('success',"project Added");
         res.redirect('/');
         
     }


});

  


module.exports = router;