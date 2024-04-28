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

// Test Code Of Chat App

const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// Import Files
const Conversations = require("./models/Conversations");
const Messages = require("./models/Messages");

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Socket.io
let users = [];
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("addUser", (userId) => {
    const isUserExist = users.find((user) => user.userId === userId);
    if (!isUserExist) {
      const user = { userId, socketId: socket.id };
      users.push(user);
      io.emit("getUsers", users);
    }
  });

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, message, conversationId }) => {
      try {
        // Validate data
        if (!senderId || !receiverId || !message) {
          throw new Error("Missing required data");
        }

        // Fetch sender and receiver from MongoDB
        let senderUser = await User.findById(senderId);
        let receiverUser = await User.findById(receiverId);

        if (!senderUser) {
          throw new Error("Sender not found :" + senderId);
        }
        if (!receiverUser) {
          throw new Error("Receiver not found");
        }

        // Find receiver in connected users
        const receiver = users.find((user) => user.userId === receiverId);
        const sender = users.find((user) => user.userId === senderId);

        if (receiver) {
          io.to(receiver.socketId)
            .to(sender.socketId)
            .emit("getMessage", {
              senderId,
              message,
              conversationId,
              receiverId,
              user: {
                id: senderUser._id,
                prenom: senderUser.prenom,
                nom: senderUser.nom,
                email: senderUser.email,
              },
            });
        } else {
          io.to(sender.socketId).emit("getMessage", {
            senderId,
            message,
            conversationId,
            receiverId,
            user: {
              id: senderUser._id,
              fullName: senderUser.prenom,
              email: senderUser.email,
            },
          });
        }
      } catch (error) {
        console.error("Error sending message:", error.message);
        // Optionally send an error message back to the client
        socket.emit("errorMessage", { message: "Error sending message" });
      }
    }
  );

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", users);
  });
  // io.emit('getUsers', socket.userId);
});

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newCoversation.save();
    res.status(200).send("Conversation created successfully");
  } catch (error) {
    console.log(error, "Error");
  }
});

app.post("/api/conversations", async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const conversations = await Conversations.find({
      members: { $in: [loggedInUser] },
    });
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== loggedInUser
        );
        const user = await User.findById(receiverId);
        return {
          user: {
            receiverId: user.id,
            email: user.email,
            nom: user.nom,
            image: user.image,
            prenom: user.prenom,
          },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(conversationUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message)
      return res.status(400).send("Please fill all required fields");
    if (conversationId === "new" && receiverId) {
      const newCoversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newCoversation.save();
      const newMessage = new Messages({
        conversationId: newCoversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(200).send("Message sent successfully");
    } else if (!conversationId && !receiverId) {
      return res.status(400).send("Please fill all required fields");
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.log(error, "Error");
  }
});

app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const checkMessages = async (conversationId) => {
      console.log(conversationId, "conversationId");
      const messages = await Messages.find({ conversationId });
      const messageUserData = Promise.all(
        messages.map(async (message) => {
          const user = await User.findById(message.senderId);
          return {
            user: {
              id: user._id,
              email: user.email,
              nom: user.nom,
              prenom: user.prenom,
            },
            message: message.message,
          };
        })
      );
      res.status(200).json(await messageUserData);
    };
    const conversationId = req.params.conversationId;
    if (conversationId === "new") {
      const checkConversation = await Conversations.find({
        members: { $all: [req.query.senderId, req.query.receiverId] },
      });
      if (checkConversation.length > 0) {
        checkMessages(checkConversation[0]._id);
      } else {
        return res.status(200).json([]);
      }
    } else {
      checkMessages(conversationId);
    }
  } catch (error) {
    console.log("Error", error);
  }
});

app.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });
    const usersData = Promise.all(
      users.map(async (user) => {
        return {
          user: {
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            image: user.image,
            receiverId: user._id,
          },
        };
      })
    );
    res.status(200).json(await usersData);
  } catch (error) {
    console.log("Error", error);
  }
});

// End Test Of chat App

app.listen(port, () => {
  console.log("Server Working on Port " + port);
});
