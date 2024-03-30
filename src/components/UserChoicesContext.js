import React from "react";
import { createContext, useState, useEffect } from "react";

export const userChoicesContext = createContext();

export const UserChoicesProvider = ({ children }) => {
  const [userChoices, setUserChoices] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
    },
    plan: "Arcade",
    addons: {
      "Online service": false,
      "Large storage": false,
      "Customizable profile": false,
    },
    method: "monthly",
  });
  useEffect(() => {
    console.log(userChoices);
  }, [userChoices]);
  return (
    <userChoicesContext.Provider value={{ userChoices, setUserChoices }}>
      {children}
    </userChoicesContext.Provider>
  );
};
