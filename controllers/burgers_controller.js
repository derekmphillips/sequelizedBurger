var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");
var db= require("../models");

router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {

   db.Burger.findAll({}).then(function(result){
     
    var hbsObject = {
      burgers: result
    };
    console.log(hbsObject);
    res.render("index", hbsObject);

    });
});

router.post("/burgers/create", function(req, res) {
 
  db.Burger.create({
    burger_name:req.body.burgername
  }).then(function sucess(result){
   
    res.redirect("/burgers");
  }

  );
});

router.put("/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

      console.log("inside update");
     db.Burger.update(
       {
         devoured:req.body.devoured
        },
      {
        where: {
        id:req.params.id
      }
    }).then(function(result){
 
      res.redirect("/burgers");
    });
});

module.exports = router;