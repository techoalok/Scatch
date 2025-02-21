const express = require('express')
const app = express();

const cookieParse = require('cookie-parser');
const path = require('path');
const db = require('./config/mongoose-connection');
const flash = require('connect-flash');
const expressSession = require('express-session');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/index');  




app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));
app.set('view engine', 'ejs');
app.use(cookieParse());

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use('/',indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);