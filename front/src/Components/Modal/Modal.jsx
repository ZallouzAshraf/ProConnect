import React, { useState } from "react";
import "./Modal.css";
import phone from "../../Assets/appeler.png";
export default function Modal(props) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <p className="forgot-password" onClick={toggleModal}>
        Forget Password
      </p>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div class="e-card playing">
            <div class="image"></div>

            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>

            <div class="infotop">
              <img src={phone} alt="" />
              <br />
              Téléphone
              <br />
              <div className="name">{"+216 " + props.phone}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
