const express = require("express");
const path = require("path");
const http = require("http");
// const httpProxy = require("http-proxy");
const exphbs = require("express-handlebars");
const sass = require("node-sass-middleware");
const reload = require("reload");
const session = require("express-session");
const hbs_sections = require("express-handlebars-sections");
const moment = require("moment");
require("express-async-errors");
const app = express();
const passport = require("passport");

// call router
const Home = require("./router/home.route");
const Login = require("./router/login.route");
const ListPost = require("./router/listPost.route");
const News = require("./router/newsDetails.route");
const Writer = require("./router/writer.route");
const Editor = require("./router/editor.route");
const Admin = require("./router/admin.route");
const User = require("./router/user.route");
const Search = require("./router/search.route");
const Subscriber = require("./router/subscriber.route");
const ChangePassword = require("./router/changePassword.route");
const ForgetPassword = require("./router/forgetPassword.route");

// call middleware
const topTenCategory = require("./middlewares/topTenCategory.middleware");
const catAndSubCat = require("./middlewares/allCatAndSubCat.middleware");

const loginPageWriter = require("./middlewares/login.middleware");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure: true
    },
  })
);

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.engine(
  "hbs",
  exphbs({
    layoutsDir: "views/_layouts",
    defaultLayout: "layout",
    partialsDir: "views/_partials",
    extname: ".hbs",
    helpers: {
      section: hbs_sections(),
      foo: function () {
        return "foo";
      },
      formatDate: function (date) {
        return moment(date).format("DD/MM/YYYY");
      },
      formatDateTime: function (date) {
        return moment(date).format("hh:mm:ss a");
      },
      formatDate2: function (date) {
        return moment(date).format("YYYY-MM-DD");
      },
    },
  })
);
app.set("view engine", "hbs");

// use dependencies library
app.use(
  "/bootstrap",
  express.static(`${__dirname}/node_modules/bootstrap/dist`)
);
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist`));
app.use(
  "/popper",
  express.static(`${__dirname}/node_modules/popper.js/dist/umd`)
);
app.use(
  "/font",
  express.static(`${__dirname}/node_modules/@fortawesome/fontawesome-free`)
);

app.use("/owl", express.static(`${__dirname}/node_modules/owl.carousel/dist`));
// app.use("/reload", express.static(`${__dirname}/node_modules/reload/lib`));

// use sass-midleware
app.use(
  sass({
    src: __dirname + "/public", //where the sass files are
    dest: __dirname + "/public", //where css should go
    debug: true, // obvious
  })
);

// use static file
app.use("/", express.static(path.join(__dirname, "public")));

// use middleware
app.use(topTenCategory.loadTopTenCategory);
app.use(catAndSubCat.loadCatAndSubCat);

// use router
app.use("/", Home);
// app.use('/newsDetails', require('./router/newsDetails.route'));
app.use("/login", Login);

app.get("/newsDetails", (req, res) => {
  res.render("vwNews/NewsDetails");
});
app.use("/newsDetails", News);

// app.use("/Writer", loginPageWriter.loginPageWriter, Writer);
// app.use("/Editor", loginPageWriter.loginPageEditor, Editor);
// app.use("/Admin", loginPageWriter.loginPageAdmin, Admin);

app.use("/Writer", Writer);
app.use("/Editor", Editor);
 app.use("/Admin", Admin);
app.use("/Subscriber", Subscriber);

//app.use("/User", User)
// app.get("/Subscriber", (req, res) => {
//   res.render("vwSubscriber/RegisterPremium.hbs");
// });

// app.get("/User", function (req, res) {
//   res.render("vwUser/indexUser.hbs");
// });
// app.get("/User/Update", function (req, res) {
//   res.render("vwUser/updateInfo.hbs");
// });
app.use("/User", User);
app.use("/search", Search);
app.use("/list", ListPost);
app.use("/changePassword", ChangePassword);
app.use("/forgetpassword", ForgetPassword);
// logout

app.get("/logout", function (req, res) {
  req.session.destroy();

  res.redirect("/");
});

// defaul error handler

// page not found
app.use(function (req, res) {
  res.render("404", { layout: false });
});

// other error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("500", { layout: false });
});

// function request_handler(proxy, req, res) {
//   // http(s) requests.
//   proxy.web(req, res, function (err) {
//     console.log(err.stack);
//     res.writeHead(502);
//     res.end("There was an error. Please try again");
//   });
//   // websocket requests.
//   req.on("upgrade", function (req, socket, head) {
//     proxy.ws(req, socket, head, function (err) {
//       console.log(err.stack);
//       socket.close();
//     });
//   });
// }

// var site_host_http = "http://localhost:8000";

// // create the HTTP proxy server.
// var http_proxy = httpProxy.createProxyServer({
//   target: site_host_http,
//   ws: true,
// });

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// reload(app).then(() => {
//   console.log("Page reloaded!");
// });
