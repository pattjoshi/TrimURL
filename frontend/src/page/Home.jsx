import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <NavBar />
        <Header />
      </div>
    </>
  );
};

export default Home;
