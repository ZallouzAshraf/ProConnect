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

//EndPoint For Images Prof
app.post("/uploadprof", upload.array("images", 3), (req, res) => {
  let imageUrls = [];

  req.files.forEach((file) => {
    imageUrls.push(`http://localhost:${port}/uploadImages/${file.filename}`);
  });

  res.json({
    success: true,
    image_urls: imageUrls,
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
  role: {
    type: String,
    default: "client",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Prof = mongoose.model("Prof", {
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
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imagediplome: {
    type: String,
    required: true,
  },
  imagecin: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "prof",
  },
  verified: {
    type: String,
    default: "false",
  },
  profession: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Rendezvous = mongoose.model("Rendezvous", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Endpoint Register Client
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

// Endpoint Register Professionnel
app.post("/registerprof", async (req, res) => {
  let check = await Prof.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Le Professionnel avec cet e-mail existe déjà",
    });
  }

  const prof = new Prof({
    nom: req.body.nom,
    prenom: req.body.prenom,
    sexe: req.body.sexe,
    telephone: req.body.telephone,
    adresse: req.body.adresse,
    email: req.body.email,
    password: req.body.password,
    image: req.body.image,
    imagediplome: req.body.imagediplome,
    imagecin: req.body.imagecin,
    profession: req.body.profession,
    ville: req.body.ville,
  });

  //Saving User in DB
  await prof.save();

  const data = {
    user: {
      id: prof.id,
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
    const prof = await Prof.findById(req.user.id);

    if (!user && !prof) {
      return res.status(404).send("Utilisateur Introuvable");
    }

    let type = user ? user : prof;

    res.status(200).send(type);
  } catch (err) {
    res.status(500).send("Erreur interne du serveur");
  }
});

//Endpoint Login User
app.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  let prof = await Prof.findOne({ email: req.body.email });
  let type;
  if (user ? (type = user) : (type = prof)) {
    const pass = req.body.password === type.password;
    if (pass) {
      const data = {
        user: {
          id: type.id,
        },
      };
      const token = jwt.sign(data, "secret_token");
      res.json({ success: true, token, id: type.id });
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
    const prof = await Prof.findById(req.body._id);
    let type = user ? user : prof;
    if (!type) {
      return res
        .status(404)
        .json({ success: false, errors: "Utilisateur non trouvé" });
    }

    type.nom = req.body.nom || type.nom;
    type.prenom = req.body.prenom || type.prenom;
    type.sexe = req.body.sexe || type.sexe;
    type.telephone = req.body.telephone || type.telephone;
    type.adresse = req.body.adresse || type.adresse;
    type.email = req.body.email || type.email;
    type.password = req.body.password || type.password;
    type.image = req.body.image || type.image;

    const updatedUser = await type.save();
    res.json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, errors: "Internal server error" });
  }
});

//Get all Profs
app.get("/professionals", async (req, res) => {
  try {
    const allProfs = await Prof.find();
    res.json({ success: true, data: allProfs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des professionnels",
      error: error.message,
    });
  }
});

//Get UserId
app.get("/getUserId", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    const prof = await Prof.findOne({ email });

    if (!user && !prof) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user ? user._id.toString() : prof._id.toString();

    res.status(200).json({ userId });
  } catch (error) {
    console.error("Error retrieving userId:", error);
    res.status(500).json({ message: "Error retrieving userId" });
  }
});

//Save Rendezvous
app.post("/saveRdv", async (req, res) => {
  const { userId, professionalId, day, month, year, time } = req.body;

  try {
    const newRendezvous = new Rendezvous({
      userId: userId,
      professionalId: professionalId,
      date: `${year}-${month}-${day}`,
      time: time,
    });

    await newRendezvous.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Error saving rendezvous:", error);
    res.json({ success: false, errors: "Error saving rendezvous" });
  }
});

//Get Rendezvous with id
app.get("/getRdv", async (req, res) => {
  const { professionalId } = req.query;

  if (!professionalId) {
    return res.status(400).json({ message: "ProfessionnelId is required" });
  }

  const listrdv = await Rendezvous.find({ professionalId });
  if (!listrdv) {
    return res.status(404).json({ message: "Aucun Rendez-vous" });
  }
  res.status(200).json({ listrdv });
});

app.listen(port, () => {
  console.log("Server Working on Port " + port);
});
