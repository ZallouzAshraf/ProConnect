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

//Image Storage
const storage = multer.diskStorage({
  destination: "./uploadImages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//EndPoint For Images
app.use("/uploadImages", express.static("uploadImages"));
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/uploadImages/${req.file.filename}`,
  });
});

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
  image: {
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
    image: req.body.image,
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

//Verify token
const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Session Expired" });
  } else {
    try {
      const data = jwt.verify(token, "secret_token");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Use Valid Token" });
    }
  }
};

//Get User
app.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("Utilisateur Introuvable");

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Erreur interne du serveur");
  }
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

// update user
app.put("/updateUser", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, errors: "Utilisateur non trouvé" });
    }

    user.nom = req.body.nom || user.nom;
    user.prenom = req.body.prenom || user.prenom;
    user.sexe = req.body.sexe || user.sexe;
    user.telephone = req.body.telephone || user.telephone;
    user.adresse = req.body.adresse || user.adresse;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();
    res.json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Server Working on Port " + port);
});
