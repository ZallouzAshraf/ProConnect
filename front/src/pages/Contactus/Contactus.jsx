import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import "./Contactus.css";

export default function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleOpenDialog = (message) => {
    setDialogMessage(message);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        handleOpenDialog("Message envoyé avec succès");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        handleOpenDialog("Échec de l'envoi du message");
      }
    } catch (error) {
      handleOpenDialog("Une erreur s'est produite : " + error.toString());
    }
  };

  return (
    <div className="contact-container">
      <main className="contact-row">
        <section className="col left">
          <div className="contactTitle">
            <h2>Contactez-nous</h2>
            <p>Nous sommes là pour vous aider !</p>
          </div>

          <div className="contactInfo">
            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="details-contactus">
                <span>Phone</span>
                <span>+216 20 30 45 85</span>
              </div>
            </div>

            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="details-contactus">
                <span>Email</span>
                <span>Proconnect@gmail.com</span>
              </div>
            </div>
            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="details-contactus">
                <span>Localisation</span>
                <span>Sousse , Sahloul Rte ceinture 4054</span>
              </div>
            </div>
          </div>
          <div className="socialMedia">
            <p>
              <i className="fa-brands fa-facebook-f"></i>
            </p>
            <p>
              <i className="fa-brands fa-twitter"></i>
            </p>
            <p>
              <i className="fa-brands fa-instagram"></i>
            </p>
            <p>
              <i className="fa-brands fa-linkedin-in"></i>
            </p>
          </div>
        </section>

        <section className="col right">
          <form className="messageForm" onSubmit={handleSubmit}>
            <div className="inputGroup halfWidth">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Nom</label>
            </div>

            <div className="inputGroup halfWidth">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="inputGroup fullWidth">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <label>Objet</label>
            </div>

            <div className="inputGroup fullWidth">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <label>Ecrivez votre Message</label>
            </div>

            <div className="inputGroup fullWidth">
              <button type="submit">Envoyer le message</button>
            </div>
          </form>
        </section>
      </main>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <p>{dialogMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
