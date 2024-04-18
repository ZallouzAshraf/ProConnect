import React, { useEffect, useState } from "react";
import "./Detailsprof.css";
import { useLocation } from "react-router-dom";
import homme from "../../Assets/homme.png";
import { GiPositionMarker } from "react-icons/gi";
import femme from "../../Assets/femme.png";
import chat from "../../Assets/chat.png";
import call from "../../Assets/appeler.png";
import clock from "../../Assets/clock.png";
import Calendrier from "../Calendrier/Calendrier";
import Modal from "../Modal/Modal";
import axios from "axios";

export default function Detailsprof() {
  const { state } = useLocation();
  const { nom, prenom, ville, spec, genre, phone, email } = state || {};
  const [selectedTime, setSelectedTime] = useState("");
  const [userId, setUserId] = useState("");
  const [listrdv, setlistrdv] = useState([]);
  const loggeduserid = localStorage.getItem("userId");

  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const changedtime = (event) => {
    setSelectedTime(event.target.value);
  };
  const handleDateChange = (day, month, year) => {
    setSelectedDate({
      day: day,
      month: month,
      year: year,
    });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getUserId?email=${email}`
        );
        const data = await response.json();
        if (data.userId) {
          setUserId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    if (email) {
      fetchUserId();
    }
  }, [email]);

  const saverdv = async () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const rendezvousData = {
      userId: loggeduserid,
      professionalId: userId,
      day: selectedDate.day,
      month: selectedDate.month,
      year: selectedDate.year,
      time: selectedTime,
    };

    const formattedate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
    const filteredListrdv = listrdv.map((item) => ({
      professionalId: item.professionalId,
      date: item.date,
      time: item.time,
    }));

    const dateexists = filteredListrdv.some(
      (item) => item.date === formattedate && item.time === rendezvousData.time
    );

    if (!dateexists) {
      try {
        const response = await fetch("http://localhost:4000/saveRdv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rendezvousData),
        });

        const data = await response.json();

        if (data.success) {
          alert("Rendezvous saved successfully");
          setlistrdv([...listrdv, rendezvousData]);
        } else {
          console.error("Error saving rendezvous:", data.errors);
        }
      } catch (error) {
        console.error("Error saving rendezvous:", error);
      }
    } else {
      alert("Heure Déja Prise ! Choisir une autre heure");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:4000/getRdv?professionalId=${userId}`
        );

        const data = response.data;

        if (data.listrdv && data.listrdv.length > 0) {
          setlistrdv(data.listrdv);
        } else {
          console.log("Aucun Rendez-vous");
          setlistrdv([]);
        }
      } catch (error) {
        console.error("Error fetching rendezvous:", error);
      }
    };

    fetchData();
  }, [userId, listrdv]);

  return (
    <div>
      <div className="details-professionnel">
        <div className="image-prof">
          <img src={genre === "male" ? homme : femme} alt="" />
        </div>
        <div className="info-professionnel">
          <h4>
            {nom} {prenom}
          </h4>
          <h3>{spec}</h3>
          <p>
            <GiPositionMarker />
            {ville}
          </p>
        </div>
      </div>
      <div className="info-contact">
        <div className="contact-numbers">
          <h1>Informations Contact :</h1>
          <div className="professionnel-btn">
            <img src={chat} alt="" />
            <button className="btnformsg"></button>
          </div>
          <div className="professionnel-btn">
            <img src={call} alt="" />
            <Modal phone={phone} />
          </div>

          <div className="horaire-prof">
            <h2>Horaires d'ouverture</h2>
            <ul>
              <li>
                <span className="jour">Lundi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Mardi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Mercredi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Jeudi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Vendredi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 18:00</span>
              </li>
              <li>
                <span className="jour">Samedi</span>
                <span className="dash">
                  -------------------------------------------------------
                </span>
                <img className="clock" src={clock} alt="" />
                <span>08:00 - 14:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact-rdv">
          <Calendrier onDateChange={handleDateChange} />
          <div className="pick-time">
            <input
              type="radio"
              id="time1"
              name="time"
              value="8:00"
              onChange={changedtime}
            />
            <label htmlFor="time1">8:00</label>
            <input
              type="radio"
              id="time-830"
              name="time"
              value="8:30"
              onChange={changedtime}
            />
            <label htmlFor="time-830">8:30</label>
            <input
              type="radio"
              id="time3"
              name="time"
              value="9:00"
              onChange={changedtime}
            />
            <label htmlFor="time3">9:00</label>
            <input
              type="radio"
              id="time4"
              name="time"
              value="9:30"
              onChange={changedtime}
            />
            <label htmlFor="time4">9:30</label>
            <input
              type="radio"
              id="time5"
              name="time"
              value="10:00"
              onChange={changedtime}
            />
            <label htmlFor="time5">10:00</label>
            <input
              type="radio"
              id="time6"
              name="time"
              value="10:30"
              onChange={changedtime}
            />
            <label htmlFor="time6">10:30</label>
            <input
              type="radio"
              id="time7"
              name="time"
              value="11:00"
              onChange={changedtime}
            />
            <label htmlFor="time7">11:00</label>
            <input
              type="radio"
              id="time8"
              name="time"
              value="11:30"
              onChange={changedtime}
            />
            <label htmlFor="time8">11:30</label>
            <input
              type="radio"
              id="time9"
              name="time"
              value="14:00"
              onChange={changedtime}
            />
            <label htmlFor="time9">14:00</label>
            <input
              type="radio"
              id="time10"
              name="time"
              value="14:30"
              onChange={changedtime}
            />
            <label htmlFor="time10">14:30</label>
            <input
              type="radio"
              id="time11"
              name="time"
              value="15:00"
              onChange={changedtime}
            />
            <label htmlFor="time11">15:00</label>
            <input
              type="radio"
              id="time12"
              name="time"
              value="15:30"
              onChange={changedtime}
            />
            <label htmlFor="time12">15:30</label>
            <input
              type="radio"
              id="time13"
              name="time"
              value="16:00"
              onChange={changedtime}
            />
            <label htmlFor="time13">16:00</label>
            <input
              type="radio"
              id="time14"
              name="time"
              value="16:30"
              onChange={changedtime}
            />
            <label htmlFor="time14">16:30</label>
          </div>
          <button className="Btn" onClick={saverdv}></button>
          <h1>{selectedTime}</h1>
          <h1>
            {selectedDate.day}/{selectedDate.month}/{selectedDate.year}
          </h1>
        </div>
      </div>
    </div>
  );
}
