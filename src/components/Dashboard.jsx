import React, { useState, useEffect } from "react";
import InputMovie from "./InputMovie";
import ListAndSearchMovies from "./ListAndSearchMovies";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch(`${process.env.REACT_APP_MOVIES_BACKEND_URL}/dashboard`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setName(parseRes[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <h1>{name}'s movies</h1>
      <InputMovie />
      <ListAndSearchMovies />
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </>
  );
};

export default Dashboard;
