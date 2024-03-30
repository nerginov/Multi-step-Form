import styles from "./Steps.module.scss";
import useWindowResize from "../hooks/useWindowResize";

const Steps = ({ currentStep }) => {
  const windowWidth = useWindowResize();

  const steps = [
    { number: 1, label: "YOUR INFO" },
    { number: 2, label: "SELECT PLAN" },
    { number: 3, label: "ADD-ONS" },
    { number: 4, label: "SUMMARY" },
  ];

  return (
    //windowWidth > 1023 add additional info else show just number
    <div className={styles.steps} aria-label="Steps-progress">
      {steps.map((step, index) => (
        <div key={index}>
          <span
            className={`${styles["steps__number"]} ${
              step.number === currentStep ? styles["steps__number--active"] : ""
            }`}
          >
            {step.number}
          </span>
          {windowWidth > 1023 && (
            <p>
              STEP {step.number} <span>{step.label}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Steps;
