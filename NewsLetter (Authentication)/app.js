const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require('https');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstNAME=req.body.first;
    var secondName=req.body.last;
    var email=req.body.mail; 

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstNAME,
                    LNAME:secondName
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);

    const url="https://us18.api.mailchimp.com/3.0/lists/a010382917";

    const options={
        method:"POST",
        auth: "ryuk788:a90c2dc8e18d805f28cea1766ea7b669-us18"
    }

   const request= https.request(url,options,function(response){
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
             console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();
    
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.post("/success",function(req,res){
    res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server started at port 3000");
});



// a90c2dc8e18d805f28cea1766ea7b669-us18

// 