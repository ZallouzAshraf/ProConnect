const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

// DataBase Connection
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.8z53taw.mongodb.net/proconnect`
);

//Schema for the User model
const User = mongoose.model("User", {
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    enum: ["male", "Female"],
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Endpoint Register
app.post("/register", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "L'utilisateur avec cet e-mail existe déjà",
    });
  }

  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    telephone: req.body.telephone,
    adresse: req.body.adresse,
    email: req.body.email,
    password: req.body.password,
  });

  //Saving User in DB
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, "secret_token");
  res.json({ success: true, token });
});

//Endpoint Login User
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const pass = req.body.password === user.password;
    if (pass) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_token");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Mot de passe incorrect" });
    }
  } else {
    res.json({ success: false, errors: " Email incorrect" });
  }
});

app.listen(port, () => {
  console.log("Server Working on Port " + port);
});
