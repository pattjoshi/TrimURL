import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <>
      <div className="flex flex-col items-center mt-20 px-4">
        <h1 className="flex items-center gap-2 text-xl sm:text-3xl mb-2">
          Hay {userData ? userData?.name : "Developer"}
        </h1>
        <p>wellcome to url</p>
        <button className="border border-gray-500 rounded-full px-8 py-2.5 cursor-pointer">
          Get Started
        </button>
      </div>
    </>
  );
};

export default Header;
