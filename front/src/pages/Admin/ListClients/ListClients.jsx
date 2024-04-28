import React, { useEffect, useState } from "react";
import "./ListClients.css";
import Sidebaradmin from "../SidebarAdmin/Sidebaradmin";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function ListClients() {
  const [clients, setclients] = useState([]);
  const fetchclients = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/allclients`);
      setclients(response.data.data);
    } catch (error) {
      console.log("Erreur");
    }
  };

  useEffect(() => {
    fetchclients();
  }, []);

  const DeleteClient = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteUser/${id}`
      );
      if (response.status === 200) {
        fetchclients();
      }
    } catch (error) {
      console.error("Error deleting rendezvous:", error);
    }
  };
  return (
    <div className="allprof-container">
      <div>
        <Sidebaradmin />
      </div>
      <div className="list-clients">
        <h1>All Clients List</h1>
        <div className="list-clients-main">
          <p>Image</p>
          <p>Nom</p>
          <p>Prénom</p>
          <p>Téléphone</p>
          <p>Supprimer</p>
        </div>
        <div className="list-clients-all">
          <hr />
          {clients.map((item, index) => {
            return (
              <div key={index}>
                <div className="list-clients-main listprofs">
                  <img src={item.image} alt="" className="list-clients-img" />
                  <p>{item.nom}</p>
                  <p>{item.prenom}</p>
                  <p>{item.telephone}</p>
                  <MdDelete
                    className="listprofs-remove"
                    color="red"
                    size={"30px"}
                    onClick={() => DeleteClient(item._id)}
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
