// pre nodemailer requirements
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//cloudinary being imported
const cloudinary = require("cloudinary");

//post nodemailer requirements
const nodemailer = require("nodemailer");
const creds = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");

// defining the path for the server to launch the html page form
app.use(express.static(path.resolve("./client/build")));

//Looking at cloudinary for images with the tag "personalImages" and returning them to display in the personal gallery
app.get("/personalImages", async (req, res) => {
  await cloudinary.v2.api.resources_by_tag(
    "personalImages",
    {
      cloud_name: "pandemic-glass/",
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      type: "upload",
      prefix: "pandemic-glass/carousel images",
    },
    function (error, result) {
      res.send(JSON.stringify(result.resources));
    }
  );
});

//Looking at cloudinary for images with the tag "collabImages" and returning them to display on the collab gallery
app.get("/collabImages", async (req, res) => {
  await cloudinary.v2.api.resources_by_tag(
    "collabImages",
    {
      cloud_name: "pandemic-glass/",
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_SECRET,
      type: "upload",
      prefix: "pandemic-glass/carousel images",
    },
    function (error, result) {
      res.send(JSON.stringify(result.resources));
    }
  );
});

/* #region  Individual Image Gallery */

//The Following code block is for when I want to make each image clickable to open an individual gallery for that image. This will be how I want to go about making those fetches to cloudinary

// set up path params for individual images when clicked on in the carousel. this will fetch all images that have the tag associated with the params

// app.get("/imagseAPI/:tag", async (req, res) =>{
//     await cloudinary.v2.api.resources_by_tag(request.params.tag,
//     {
//       cloud_name: "pandemic-glass/",
//       api_key: "294986354382912",
//       api_secret: "hHgSjeVe0Up_lKGv9hcsFcWJc_E",
//       type: "upload",
//       prefix: "pandemic-glass/carousel images",
//     },
//     function (error, result) {
//       res.send(JSON.stringify(result.resources))
//     }
//   );
// });

/* #endregion */

//using bodyParser middleware and converting it to a .json object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transport = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS,
  },
};

//using the above information to create my nodemailer to send information using an email address
let transporter = nodemailer.createTransport(transport);

//lets me know if the transporter is working appropriately
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("server is ready to take messages");
  }
});

//Sends a post request using the information given by the user in the input fields
app.post("/send", (req, res, next) => {
  console.log("this is the req", req.body);
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;

  //creates the content of the email being sent over
  let content = `Name: ${name}\nEmail: ${email}\nMessage:${message}`;

  //creates an object that will be the email that gets sent over
  let mail = {
    from: name,
    to: "devon@pandemic.glass",
    subject: "New Message From Contact Form",
    text: content,
  };

  //Sends the email over and gives a status back of success or fail
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
    }
  });
});

//tells app to use cors middleware
app.use(cors());
app.use(express.json());

// telling the page to display home when given an address
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/build/index.html"));
});
// giving a port that the server is being hosted on
app.listen(port, () => console.log(`Listening on port: ${port}`));
