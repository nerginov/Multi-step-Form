import React, { useEffect, useState } from "react";
import styles from "./Addons.module.scss";
import Card from "./Card";
import { userChoicesContext } from "./UserChoicesContext";
import { useContext } from "react";

const Addons = ({ nextStep, prevStep, step }) => {
  const { userChoices, setUserChoices } = useContext(userChoicesContext);
  const [addonsChoices, setAddonChoices] = useState({
    ...userChoices.addons,
  });

  // Array containing data for each available add-on option
  const addonsData = [
    {
      id: "online-service",
      name: "Online service",
      description: "Access to multiplayer games",
      priceMonthly: 1,
      priceYearly: 10,
    },
    {
      id: "large-storage",
      name: "Large storage",
      description: "Extra 1TB of cloud space",
      priceMonthly: 2,
      priceYearly: 20,
    },
    {
      id: "customizable-profile",
      name: "Customizable profile",
      description: "Custom theme on your profile",
      priceMonthly: 2,
      priceYearly: 20,
    },
  ];

  // Function to handle toggling of addon choices
  const handleAddonChoices = (addon) => {
    setAddonChoices((prevChoices) => ({
      ...prevChoices,
      [addon]: !prevChoices[addon],
    }));
  };

  //there are no requirements so next is always enabled
  const handleSubmit = () => {
    setUserChoices((prevUserChoices) => ({
      ...prevUserChoices,
      addons: { ...prevUserChoices.addons, ...addonsChoices },
    }));
    return true;
  };

  return (
    <Card
      nextStep={nextStep}
      prevStep={prevStep}
      step={step}
      handleSubmit={handleSubmit}
    >
      <div className={styles.addons}>
        <header>
          <h1>Pick Add-ons</h1>
          <p>Add-ons help enhance your gaming experience.</p>
        </header>
        <ul>
          {addonsData.map((addon) => (
            <li key={addon.id}>
              <label htmlFor={addon.id}>
                <div
                  className={addonsChoices[addon.name] ? styles.selected : ""}
                >
                  <input
                    type="checkbox"
                    id={addon.id}
                    checked={addonsChoices[addon.name]}
                    aria-checked={addonsChoices[addon.name]}
                    onClick={() => handleAddonChoices(addon.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddonChoices(addon.name);
                      }
                    }}
                  />
                  <p>
                    {addon.name} <br />
                    <span>{addon.description}</span>
                  </p>
                  <span className={styles.pricing}>
                    {userChoices.method === "monthly"
                      ? `+$${addon.priceMonthly}/mo`
                      : `+$${addon.priceYearly}/yr`}
                  </span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default Addons;
