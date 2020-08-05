require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const cloudinary = require("cloudinary");

// defining the path for the server to launch the html page form
app.use(express.static(path.resolve("./client/build")));

// this is fetching all images with the tag of carousel currently. Consider doing a second one so they are specifc for each carousel.

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

// telling the page to display home when given an address
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/build/index.html"));
});
// giving a port that the server is being hosted on
app.listen(port, () => console.log(`Listening on port: ${port}`));
