var express = require('express');
var router = express.Router();
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
    console.log('connected in  admin!');
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
 connection.query('SELECT * FROM projects',function(err,rows,fields){
   if (err) throw err ;
   res.render ('dashboard',{
       "rows" : rows,
       layout:'layout2'
   });
 });
});

router.get('/delete/:id' ,function (req,res){
  connection.query('DELETE FROM projects WHERE id ='+req.params.id,function(err,rows,result){
    if (err) throw err ;
      res.render('dashboard',{
        "rows" : rows,
        layout:'layout2'
      })
  }); 
      res.location('/admin');
      res.redirect('/admin');
     
   
});



module.exports = router;
