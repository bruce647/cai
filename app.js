const express = require("express")
const exphbs = require("express-handlebars")
const app = express();
const data = require ('./data/data.js');
const HTTP_PORT = process.env.PORT || 8080;
const bodyparser = require('body-parser');

var nodemailer = require('nodemailer');
var config = {
    service: "Gmail", 
    secureConnection: true,
    auth: {
        user: 'caiyiqing317@gmail.com', 
        pass: 'hkdvktxjwutmmeca' 
    }
}
var transporter = nodemailer.createTransport(config);

function onHttpStart(){
   console.log("Express http server listening on: " + HTTP_PORT);
}



app.engine('.hbs', exphbs({extname:'.hbs', defaultlayout:"main"}));

app.set("view engine", '.hbs');

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render('home',{
      title:"Home",
      navData: data.getNav(),
      contentData: data.getContent(),
      mealData: data.getMeal()
    });
});

app.get("/MealsPackage", function(req, res){
  res.render('MealsPackage',{
    title:"Meals Package List",
    navData: data.getNav()
  });
});

app.get("/Registration", function(req, res){
  res.render('Registration',{
      title: "Sign Up",
      navData: data.getNav()
  });
});

app.post("/Registration", function(req, res){
  var fError;
  var lError;
  var eError;
  var pError;
  var fFlag, lFlag, eFlag, pFlag = false;
  if(req.body.firstname==""){
    fError = "First name is required.";
    fFlag = true;
  }
  else{
    fFlag = false;
  }
  if(req.body.lastname==""){
    lError = "Last name is required.";
    lFlag = true;
  }
  else{
    lFlag = false;
  }
  if(req.body.email==""){
    eError = "Email is required.";
    eFlag = true;
  }
  else{
    eFlag = false;
  }
  if(req.body.password==""){
    pError = "Password is required.";
    pFlag = true;
  }
  else{
    var pw = req.body.password.trim();
    var pwUpper = pw.toUpperCase();
    var capital = /[A-Z]/;
    var digit = /[0-9]/;
    if(pw.length < 6 || pw.length > 12){
      pError = "Password must be 6 characters long.";
      pFlag = true;
    }
    else if(pwUpper.charAt(0) < "A" || pwUpper.charAt(0) > "Z"){
      pError = "Password must start with a letter.";
      pFlag = true;
    }
    else if(!capital.test(pw)){
      pError = "Password must have at least 1 uppercase letter.";
      pFlag = true;
    }
    else if(!digit.test(pw)){
      pError = "Password must have at least 1 digit.";
      pFlag = true;
    }
    else{
      pFlag = false;
    }
  }

  if(fFlag==true || lFlag==true || eFlag==true || pFlag==true){
    
    res.render('Registration',{
      title: "Sign Up",
      navData: data.getNav(),
      fError: fError,
      lError: lError,
      eError: eError,
      pError: pError,
      fFlag: fFlag,
      lFlag: lFlag,
      eFlag: eFlag,
      pFlag: pFlag
  });
  }
  else{
    res.redirect('/Dashboard');
    var mailinfo = {
      from: 'caiyiqing317@gmail.com',
      to: req.body.email,
      subject: 'Registration',
      text: 'Account has been registered successfully!'
  }
  transporter.sendMail(mailinfo,(err,info)=>{
      if(err){
          console.log(err)
      }
      else{
          console.log('email sent to: ' + req.body.email)
      }
  })
  }
});


app.get("/Dashboard", function(req, res){
  res.render('Dashboard', {
     title: "Dashboard",
     navData: data.getNav()
  });
});

app.get("/Login", function(req, res){
  res.render('Login', {
      title: "Login",
      navData: data.getNav()
  });
});

app.post("/Login", function(req, res){
  var eError;
  var pError;
  var eFlag, pFlag = false;
  if(req.body.email==""){
    eError = "Email is required.";
    eFlag = true;
  }
  if(req.body.password==""){
    pError = "Password is required.";
    pFlag = true;
  }
  if(eFlag == true || pFlag == true){
      res.render('Login', {
          title: "Login",
          navData: data.getNav(),
          eError: eError,
          pError: pError,
          eFlag: eFlag,
          pFlag: pFlag
      });
  }
  else{
      res.redirect("/");
  }
});

app.listen(HTTP_PORT, onHttpStart);

