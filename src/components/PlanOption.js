// PlanItem.js
import React from "react";
import styles from "./PlanOption.module.scss";

const PlanOption = ({ plan, selectedPlan, handleSelectPlan, userChoices }) => {
  return (
    <div
      role="option"
      aria-selected={selectedPlan === plan.id}
      aria-label={`${plan.name} plan ${
        userChoices.method === "monthly"
          ? `$${plan.priceMonthly}/mo`
          : `$${plan.priceYearly}/yr`
      }`}
      tabIndex="0"
      id={plan.id}
      className={`${selectedPlan === plan.id ? styles.selected : ""} ${
        styles["plan-option"]
      }`}
      onClick={(e) => handleSelectPlan(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSelectPlan(e);
        }
      }}
    >
      <img src={plan.image} alt={`${plan.name}-icon`} />
      <p>
        {plan.name} <br />
        {userChoices.method === "monthly" ? (
          <span>${plan.priceMonthly}/mo</span>
        ) : (
          <>
            <span>${plan.priceYearly}/yr</span> <br />
            <span className={styles["plan-bonus"]}>2 months free</span>
          </>
        )}
      </p>
    </div>
  );
};

export default PlanOption;
