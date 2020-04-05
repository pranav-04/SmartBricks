const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport')
const nodemailer = require('nodemailer');
const socket = require('socket.io');
const http = require('http');

const mongoose = require('mongoose')
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true });
let db = mongoose.connection;
db.once('open',(err) => {
    if(err){
        console.log('Connected to MongoDB')
    }else{
        console.log('Connected to MongoDB')
    }
})
db.on('error',(err) => console.log(err))

const app = express()

let Property = require('./models/property')
let Chat = require('./models/chat');
let User = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'purvilmehtadaiict@gmail.com',
      pass: 'passwordpurvil'
    }
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
  
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Socket.io integration with express
const server = http.createServer(app);

// Creating the socket
const io = socket(server);

app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null
    next();
})

app.get('/', (req,res) => {
    Property.find({}, (err,properties)=> {
        if(err){
            console.log(err)
        }else{
            res.render('mainpage_feature',{
                title : 'Featured Properties',
                properties : properties
            })
        }
    })
});



app.get('/contactus',(req,res)=>{
    res.render('contact')
})
app.post('/search',(req,res)=> {
  let qyery = { Location: req.body.location.toString(), }
  Property.find({
    // Location: req.body.location,
    // Price : {$lt:req.body.maxprice}
  },(err,properties)=>{
    if(err){
      console.log(err)
      return
    }
    else{
      res.render('search',{
        title : 'Search Results',
        properties:properties
      })
    }
  })
})

//for chat
app.get('/chat/:id',(req,res) =>{
  
  User.findById(req.params.id, (err,users)=>{
      if(err) console.log(err);
      else{
          res.render('chat', {
              cwid: users._id,
              liuid: req.user._id,
              cwun: users.name,
              liun: req.user.username
          });
      }
  });
});

let properties = require('./routes/properties');
app.use('/property',properties)

let users = require('./routes/users');
app.use('/users',users)

//For chat
io.on('connection', (socket) => {

  Chat.find({}, (err, chats) => {
      if(err) console.log(err);
      else{
          socket.emit('output', chats);
      }
  });

  //Handle input events
  socket.on('input', (data) => {
      let from= data.from;
      let to = data.to;
      let body = data.body;

      //Check for name and message
      if(body != ''){
          //insert message 
          let newChat = new Chat({from: from, to: to, body: body});
          newChat.save((err) => {
              if(err) console.log(err);
              else
              io.emit('output', [data]);
          });
      }
  });

  //Handle clear
  socket.on('clear', (data) => {
      //Remove all chats from the connection
      Chat.remove({}, () => {
          //Emit cleared
          io.emit('cleared');
      });
  });
});

app.post('/contactus',(req,res)=>{
    var mailOptions = {
        from: 'purvilmehtadaiict@gmail.com',
        to: req.body.email,
        subject: 'Thank you for using SmartBricks',
        text: `Hello ${req.body.name},\nWe have received your message \n"${req.body.message}".\nThank you for choosing us. \n\nRegards, \nSmartBricks Team`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.redirect('/')
        }
      });

})

let PORT = 5000
server.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
});
