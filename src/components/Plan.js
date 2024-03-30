import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import styles from "./Plan.module.scss";
import advanced from "../assets/images/icon-advanced.svg";
import arcade from "../assets/images/icon-arcade.svg";
import pro from "../assets/images/icon-pro.svg";
import { userChoicesContext } from "./UserChoicesContext";
import Switch from "./Switch";
import PlanOption from "./PlanOption";

const Plan = ({ nextStep, prevStep, step }) => {
  const { userChoices, setUserChoices } = useContext(userChoicesContext);
  //initializing the selected plan with userchoices.plan from context(arcade as default)
  const [selectedPlan, setSelectedPlan] = useState(userChoices.plan);
  // Array containing data for each available plan option
  const plans = [
    {
      id: "Arcade",
      image: arcade,
      name: "Arcade",
      priceMonthly: 9,
      priceYearly: 90,
    },
    {
      id: "Advanced",
      image: advanced,
      name: "Advanced",
      priceMonthly: 12,
      priceYearly: 120,
    },
    { id: "Pro", image: pro, name: "Pro", priceMonthly: 15, priceYearly: 150 },
  ];

  //Handles the switch button toggling between monthly and yearly.Updates the userchoices.method from context(monthly as default)
  const handlePaymentMethod = () => {
    setUserChoices((prevUserChoices) => ({
      ...prevUserChoices,
      method: userChoices.method == "monthly" ? "yearly" : "monthly",
    }));
  };

  //Clicking div or any element iside it sets the selectedPlan to DIV's id.
  const handleSelectPlan = (e) => {
    // Find the nearest ancestor div with role="option"
    const selectedPlanDiv = e.target.closest("div[role='option']");

    // If such a div is found, set selectedPlan to its id
    if (selectedPlanDiv) {
      setSelectedPlan(selectedPlanDiv.id);
    }
  };

  const handleSubmit = () => {
    setUserChoices((prevUserChoices) => ({
      ...prevUserChoices,
      plan: selectedPlan,
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
      <div className={styles["select-plan"]}>
        <header>
          <h1>Select your plan</h1>
          <p>You have an option of monthly or yearly billing.</p>
        </header>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              <PlanOption
                plan={plan}
                selectedPlan={selectedPlan}
                handleSelectPlan={handleSelectPlan}
                userChoices={userChoices}
              />
            </li>
          ))}
        </ul>
        <Switch
          userChoices={userChoices}
          handlePaymentMethod={handlePaymentMethod}
        />
      </div>
    </Card>
  );
};

export default Plan;
