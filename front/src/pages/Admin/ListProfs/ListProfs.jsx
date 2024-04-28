import React, { useEffect, useState } from "react";
import "./ListProfs.css";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Sidebaradmin from "../SidebarAdmin/Sidebaradmin";

export default function ListProfs() {
  const [professionals, setProfessionals] = useState([]);
  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/allprofessionals`
      );
      setProfessionals(response.data.data);
    } catch (error) {
      console.log("Erreur");
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const DeleteProfs = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteProf/${id}`
      );
      if (response.status === 200) {
        fetchProfessionals();
      }
    } catch (error) {
      console.error("Error deleting rendezvous:", error);
    }
  };

  const verifprofs = async (id, index) => {
    try {
      const updatedProfessionals = [...professionals];
      updatedProfessionals[index].verified =
        !updatedProfessionals[index].verified;
      const response = await axios.put(
        `http://localhost:4000/updateProfessional/${id}`,
        { verified: updatedProfessionals[index].verified }
      );

      if (response.status === 200) {
        setProfessionals(updatedProfessionals);
      }
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };
  return (
    <div className="allprof-container">
      <div>
        <Sidebaradmin />
      </div>
      <div className="list-profs">
        <h1>All Professionnels List</h1>
        <div className="list-profs-main">
          <p>Image</p>
          <p>Nom</p>
          <p>Prénom</p>
          <p>Profession</p>
          <p>Téléphone</p>
          <p>Verified</p>
          <p>Supprimer</p>
        </div>
        <div className="list-profs-all">
          <hr />
          {professionals.map((item, index) => {
            return (
              <div key={index}>
                <div className="list-profs-main listprofs">
                  <img src={item.image} alt="" className="list-profs-img" />
                  <p>{item.nom}</p>
                  <p>{item.prenom}</p>
                  <p>{item.profession}</p>
                  <p>{item.telephone}</p>
                  <label class="switch">
                    <input
                      type="checkbox"
                      checked={item.verified === "true"}
                      onChange={(e) => verifprofs(item._id, index)}
                    />
                    <span class="slider"></span>
                  </label>
                  <MdDeleteForever
                    className="listprofs-remove"
                    color="red"
                    size={"30px"}
                    onClick={() => DeleteProfs(item._id)}
                  />
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
