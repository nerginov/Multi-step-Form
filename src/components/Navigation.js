import styles from "./Navigation.module.scss";
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import useWindowResize from "../hooks/useWindowResize";
import { userChoicesContext } from "./UserChoicesContext";

const Navigation = ({ prevStep, nextStep, step, handleSubmit, setStep }) => {
  const { userChoices, setUserChoices } = useContext(userChoicesContext);

  //resets while form data and sets step to 1
  const handleConfirm = () => {
    setUserChoices({
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
    setStep(1);
  };

  const windowWidth = useWindowResize();

  if (windowWidth > 1023) {
    return (
      <nav className={styles.navigation}>
        {step !== 1 && (
          <button
            className={`${styles["navigation__button"]} ${styles["navigation__button--back"]}`}
            onClick={prevStep}
          >
            Go Back
          </button>
        )}
        {step !== 4 ? (
          <button
            className={`${styles["navigation__button"]} ${styles["navigation__button--next"]}`}
            onClick={() => handleSubmit() && nextStep()}
          >
            Next Step
          </button>
        ) : (
          <button
            className={`${styles["navigation__button"]} ${styles["navigation__button--confirm"]}`}
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>
        )}
      </nav>
    );
  }

  return ReactDOM.createPortal(
    <nav className={styles.navigation}>
      {step !== 1 && (
        <button
          className={`${styles["navigation__button"]} ${styles["navigation__button--back"]}`}
          onClick={() => {
            prevStep();
          }}
        >
          Go Back
        </button>
      )}
      {step !== 4 ? (
        <button
          className={`${styles["navigation__button"]} ${styles["navigation__button--next"]}`}
          onClick={() => handleSubmit() && nextStep()}
        >
          Next Step
        </button>
      ) : (
        <button
          className={`${styles["navigation__button"]} ${styles["navigation__button--confirm"]}`}
          onClick={() => handleConfirm()}
        >
          Confirm
        </button>
      )}
    </nav>,
    document.getElementById("root")
  );
};

export default Navigation;
