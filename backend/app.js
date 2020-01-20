// Packages required are declared with const 

const express = require("express");
const bodyParser = require("body-parser");
const taskController = require("./controller/UserController");
const ImagebankController=require("./controller/ImagebankController");
const cors = require('cors');
// db instance connection
require("./config/db");

const app = express();
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://localhost:3301',


];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}

//  For connecting to mail services

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: 'huskyeditor123@gmail.com', 
        pass: 'husky@12345'
        }
    });

    // Connecting husky editor email
let mailOptions = {
        from: 'huskyeditor123@gmail.com', 
        to: '', 
        subject: 'Hello from Husky Editor',
        html: '<h1>Hello from Husky Editor</h2><p><img src = "cid:0011"></p>', 
        attachments: [
        {
        	filename: 'Image.jpg',
          path: '/Users/saheb/Downloads/Image.png',
          cid: '0011' 
        }
        ]
    };

    // Sending e-mail

transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
  });

//here is to define different method in routers
app.use(cors(corsOptions));
const port = process.env.PORT || 3301;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app
  .route("/users")
  .get(taskController.listAllUsers);
  
  app
  .route("/registration")
  .post(taskController.createNewUser);
app
  .route("/users/:usersId")
  .get(taskController.readUser)
  .put(taskController.updateUser)
  .delete(taskController.deleteUser);
app
  .route("/authentication")
  .get(taskController.authenticate);
  app
.route("/Imagebank")
.get(ImagebankController.listAllImage);
app
.route("/Imagebank/Save")
.post(ImagebankController.AddNewImage);


app.options('/sendmail', function (req, res) {
  res.sendStatus(200);
});
app.post('/sendmail', function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Change this to your Angular 8 port number
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');// resolve the access permission problem
  res.setHeader('Access-Control-Allow-Headers', '*');
  //mailOptions.to=req.body.to;

  //parse the request(body) and set value to mailOptions instance
  mailOptions.to=req.body.To;
  mailOptions.subject=req.body.title;
  //mailOptions.html='<img src="'+req.body.content+'"/>';
  mailOptions.attachments[0].filename=req.body.content.split('/')[3];
  // mailOptions.attachments[0].path=req.body.content; // waiting to solve
  console.log(req.body.content.split('/')[3]);
  req.body.content.split('/')
  console.log(mailOptions.attachments[0]);
  console.log(mailOptions.to);
  console.log(req.body.To);
  
  console.log(req.body.content);

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });

});


//  To listen to the port on which the node is running
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



