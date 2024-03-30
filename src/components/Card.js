import styles from "./Card.module.scss";
import Navigation from "./Navigation";

const Card = ({
  children,
  prevStep,
  nextStep,
  step,
  handleSubmit,
  setStep,
}) => {
  return (
    <div className={styles.card}>
      {children}
      <Navigation
        prevStep={prevStep}
        nextStep={nextStep}
        step={step}
        handleSubmit={handleSubmit}
        setStep={setStep}
      />
    </div>
  );
};

export default Card;
