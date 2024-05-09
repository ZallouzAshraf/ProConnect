import React, { useState } from "react";
import styles from "./Loginadmin.module.css";
import axios from "axios";
export default function Loginadmin() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const loginadmin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/Adminlogin",
        JSON.stringify(adminData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        localStorage.setItem("role", responseData.role);
        window.location.replace("/Admin");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert(error);
    }
  };
  return (
    <section className={styles["loginadmin-section"]}>
      <>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
        <span className={styles["loginadmin-span"]}></span>
      </>
      <div className={styles.signin}>
        <div className={styles.content}>
          <h2>Connexion Admin</h2>

          <div className={styles.form}>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="username"
                required
                value={adminData.username}
                onChange={changeHandler}
              />
              <i>Nom d'utilisateur</i>
            </div>

            <div className={styles.inputBox}>
              <input
                type="password"
                name="password"
                required
                value={adminData.password}
                onChange={changeHandler}
              />
              <i>Mot de passe </i>
            </div>

            <div className={styles.inputBox}>
              <input type="submit" value="Connexion" onClick={loginadmin} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
