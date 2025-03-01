const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

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
const Admin = mongoose.model("Admin", {
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const Categorie = mongoose.model("Categorie", {
  nom: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
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
  professionalNom: {
    type: String,
    required: true,
  },
  professionalPrenom: {
    type: String,
    required: true,
  },
  clientNom: {
    type: String,
    required: true,
  },
  clientprenom: {
    type: String,
    required: true,
  },
  professionalMetier: {
    type: String,
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
          role: type.role,
        },
      };
      const token = jwt.sign(data, "secret_token");
      res.json({
        success: true,
        token,
        id: type.id,
        role: type.role,
        email: type.email,
      });
    } else {
      res.json({ success: false, errors: "Mot de passe incorrect" });
    }
  } else {
    res.json({ success: false, errors: " Email incorrect" });
  }
});

//Endpoint Login Admin
app.post("/Adminlogin", async (req, res) => {
  let admin = await Admin.findOne({ username: req.body.username });
  if (admin) {
    const pass = req.body.password === admin.password;
    if (pass) {
      const data = {
        user: {
          id: admin.id,
        },
      };
      const token = jwt.sign(data, "secret_token");
      res.json({
        success: true,
        token,
        id: admin.id,
        role: admin.role,
      });
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

//Get all Profs expect loggedProf
app.get("/professionals", async (req, res) => {
  try {
    const userId = req.query.userId;
    const allProfs = await Prof.find({ _id: { $ne: userId } });
    res.json({ success: true, data: allProfs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des professionnels",
      error: error.message,
    });
  }
});

//Get all Profs
app.get("/allprofessionals", async (req, res) => {
  try {
    const allProfs = await Prof.find({});
    res.json({ success: true, data: allProfs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des professionnels",
      error: error.message,
    });
  }
});

//Get all Profs
app.get("/allclients", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({ success: true, data: allUsers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des professionnels",
      error: error.message,
    });
  }
});

//Get All Categories
app.get("/allcategories", async (req, res) => {
  try {
    const allcategories = await Categorie.find({});
    res.json({ success: true, data: allcategories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des Categories",
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
    const usernom = user ? user.nom.toString() : prof.nom.toString();
    const userprenom = user ? user.prenom.toString() : prof.prenom.toString();
    const metier = prof ? prof.profession.toString() : "";

    res.status(200).json({ userId, usernom, userprenom, metier });
  } catch (error) {
    console.error("Error retrieving userId:", error);
    res.status(500).json({ message: "Error retrieving userId" });
  }
});

//Save Rendezvous
app.post("/saveRdv", async (req, res) => {
  const {
    userId,
    professionalId,
    professionalNom,
    professionalPrenom,
    professionalMetier,
    clientNom,
    clientprenom,
    day,
    month,
    year,
    time,
  } = req.body;

  try {
    const newRendezvous = new Rendezvous({
      userId: userId,
      professionalId: professionalId,
      professionalNom: professionalNom,
      professionalPrenom: professionalPrenom,
      clientNom: clientNom,
      clientprenom: clientprenom,
      professionalMetier: professionalMetier,
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

//Get Rendezvous for the loggedUser
app.get("/getLoggedRdv", async (req, res) => {
  const { loggeduserid } = req.query;

  if (!loggeduserid) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const listrdv = await Rendezvous.find({ userId: loggeduserid });

    if (!listrdv.length) {
      return res.status(404).json({ message: "Aucun Rendez-vous" });
    }

    res.status(200).json(listrdv);
  } catch (error) {
    console.error("Error fetching rendezvous:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get Rendezvous for the Professionnals
app.get("/getProfRdv", async (req, res) => {
  const { loggeduserid } = req.query;

  if (!loggeduserid) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const listrdv = await Rendezvous.find({ professionalId: loggeduserid });

    if (!listrdv.length) {
      return res.status(404).json({ message: "Aucun Rendez-vous" });
    }

    res.status(200).json(listrdv);
  } catch (error) {
    console.error("Error fetching rendezvous:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete RendezVous
app.delete("/deleteRdv/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRdv = await Rendezvous.findByIdAndDelete(id);
    if (!deletedRdv) {
      return res.status(404).json({ message: "RendezVous not found" });
    }
    res.status(200).json({ message: "RendezVous deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting rendezvous", error });
  }
});

//Delete User
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting User", error });
  }
});

//Delete Profs
app.delete("/deleteProf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Prof.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Professionnal not found" });
    }
    res.status(200).json({ message: "Professionnal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Professionnal", error });
  }
});

//Delete Catégorie
app.delete("/deleteCat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Categorie.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Catégorie n'existe pas" });
    }
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du Catégorie", error });
  }
});

// Add Catégorie
app.post("/addCategorie", async (req, res) => {
  let check = await Categorie.findOne({ nom: req.body.categorie });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Cette Catégorie existe déjà",
    });
  }

  const categorie = new Categorie({
    nom: req.body.categorie,
    image: req.body.image,
  });

  //Saving User in DB
  await categorie.save();
  res.json({ success: true });
});

// Transporter setup for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zallouzachraf@gmail.com",
    pass: "asnq kvuy kqko ulsk",
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "zallouzachraf@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log("Server Working on Port " + port);
});
