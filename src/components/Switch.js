// PaymentSwitch.js
import React from "react";
import styles from "./Switch.module.scss";

const Switch = ({ userChoices, handlePaymentMethod }) => {
  return (
    <div className={styles["switch-container"]}>
      <label
        htmlFor="switch"
        className={`${styles["switch-label"]} ${
          userChoices.method === "monthly" ? styles["switch-label--active"] : ""
        } `}
      >
        Monthly
      </label>
      <label className={styles["switch"]}>
        <input
          type="checkbox"
          id="switch"
          checked={userChoices.method === "monthly" ? false : true}
          onChange={() => handlePaymentMethod()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePaymentMethod();
            }
          }}
        ></input>
        <span className={styles["slider"]}></span>
      </label>
      <label
        htmlFor="switch"
        className={`${styles["switch-label"]} ${
          userChoices.method === "yearly" ? styles["switch-label--active"] : ""
        } `}
      >
        Yearly
      </label>
    </div>
  );
};

export default Switch;
