const express = require("express");
const app = express();
const port = 3010;
const hbs = require("hbs");
const username = "admin";
const password = "123";
const session = require("express-session");
const nocache = require("nocache");

app.use(express.static("public")); // to ascessable the foldernode serverrs in public
app.use(express.json()); // used to get passwors and username as objects
app.use(express.urlencoded({ extended: true })); // like above and to parse url encoded bodies

app.set("view engine", "hbs"); //to get view engine ascess
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true })); 

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // to handle session ,this is a middleware
    saveUninitialized: true,
  })
);

app.use(nocache());




app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("home",{ username: req.session.user });
  } else {
  
    const message = req.session.msg ;
    delete req.session.msg;
   
   res.render("login", { msg: message });

  }
});

app.post("/verify", (req, res) => {
  //to recieve the passwords through post methords.submited form come here
  console.log(req.body);

  if (req.body.username == username && req.body.password == password) {
    req.session.user = req.body.username;
    res.render("home",{ username: req.session.user });
  } else {
    req.session.msg='invalid data please enter valid data'
    res.redirect("/");
  }
});



app.post("/home", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  // app.get('/new',(req,res)=>{
  //   res.render()
  // })



app.listen(port, () => {
  console.log("created");
});
