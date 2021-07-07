const { json } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');


/* GET home page. */
router.get('/', function(req, res, next) {
  
  db.Db.instance.getEstudiantes().then(estu=>{
    console.log(estu.rows)
    res.render('index', { title: 'Estudiantes', estudiantes:estu.rows});
  });
});


//test connection
router.get('/testconnect', function(req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});


router.get('/estudiante/:id', function(req, res, next) {
  const estudiante_id=req.params.id;
  console.log(estudiante_id)
  db.Db.instance.getEstudiante(estudiante_id)
  .then(post=>{
    console.log(post[0])
    return post[0] 
  }).then(estponse=>{
    db.Db.instance.getNotas(estudiante_id)
      .then(comments=>{
        res.render('estudiante', { post:estponse, comments});
      })
  })
 
});



router.get("/getdata_withQuery", function (req, res, next) {
  sql.getdata_withQuery().then((result) => {
    res.json(result[0]);
  });
});


module.exports = router;
