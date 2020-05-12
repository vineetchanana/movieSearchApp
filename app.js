var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
	res.redirect("/results");
});


app.get("/results",function(req,res){
	
	var movie = req.query.movie;
	//console.log(movie);
	if(movie == undefined){
		//console.log("fuckk");
		movie="";
	}
	var url = "http://www.omdbapi.com/?type=movie&s=" + movie + "&apikey=thewdb";
	request(url,function(error,response,body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			//res.send(results.Search[0].Title);
			 res.render("results",{data: data});
		}
	})
	
});

app.get("/results/:id",function(req,res){
	var id = req.params.id;
	var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + id;
	request(url,function(error,response,body){
		var data = JSON.parse(body);
		res.render("know",{data:data});
	});
	
});



app.post("/save",(req,res)=>{
	res.send("fuckkkkk");
});


app.listen("3000",function(){
	console.log("app has started...");
})