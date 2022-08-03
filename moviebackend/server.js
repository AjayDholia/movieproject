let express = require("express");


let data = require("./data.json")

// console.log(data);

// aak nya server bna deta h but chalu nhi krta ye
 let server = express();

 server.get("/movies", function(req,res) {
    res.json(data);
 });

 server.get("/genre", function(req,res) {

     let allGenreobj = data.map(function(el) 
     {
      return el.genre;
     });

   let uniqueGenreObj = [];

   for(let i = 0; i < allGenreobj.length; i++){
      let genreid = allGenreobj[i]["id"];

     let index =  uniqueGenreObj.findIndex(function(el){
         return el.id == genreid;
      });


      if(index == -1){
         uniqueGenreObj.push(allGenreobj[i]);
      }
   }

 res.json(uniqueGenreObj);

 })

// // ye line server ko shuru kr dete ha aak new port p
 server.listen(4000);