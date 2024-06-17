
 



require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const EmployeeModel = require('./models/Employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  // methods: ["GET", "POST"],
  credentials: true
}));
app.use("/files", express.static("files"));
app.use(express.json());
app.use(cookieParser())

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this line for better compatibility
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

  

  // )
// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Import the Userinfo model
const Userinfo = require("./userDetails");

// Define the upload route
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;

  try {
    // Create a new document in the Userinfo collection
     await Userinfo.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    const data = await Userinfo.find({}).then((data) => {
      res.send({ status: "ok", data: data});
    });
  } catch (error) {}
});


app.post('/register', (req,res) => {
   const {name, email, password} = req.body;
   bcrypt.hash(password, 10)
   .then(hash => {
    EmployeeModel.create({name, email, password: hash})
   .then(employees => res.json(employees))
   .catch(err => res.json(err))
}).catch(err => console.log(err.message))
})

app.post('/login', (req,res) => {
  const {email, password} = req.body;
  EmployeeModel.findOne({email:email})
  .then(user => {
    if(user) {
      bcrypt.compare(password, user.password, (err, response) => {
        
        if(response){
          const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn:"1d"})
          res.cookie("token", token);
          res.json("Success")
        }
        if(err) {
          res.json("the password is incorrect")
        }

      })
    } else {
      res.json("No record existed")
    }
  })
})
app.listen(5000, () => {
  console.log("Server started");
});
