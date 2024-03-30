import styles from "./App.module.scss";
import Steps from "./components/Steps";
import Personalinfo from "./components/Personalinfo";
import Plan from "./components/Plan";
import Addons from "./components/Addons";
import Finish from "./components/Finish";
import { useState } from "react";
import { UserChoicesProvider } from "./components/UserChoicesContext";

function App() {
  //Keep track of the current step to display
  const [step, setStep] = useState(1);

  //Handle navigation forward and back
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  //Rendering components based on the current step
  const renderComponent = () => {
    switch (step) {
      case 1:
        return <Personalinfo nextStep={handleNextStep} step={step} />;
      case 2:
        return (
          <Plan
            nextStep={handleNextStep}
            prevStep={handleBackStep}
            step={step}
          />
        );
      case 3:
        return (
          <Addons
            nextStep={handleNextStep}
            prevStep={handleBackStep}
            step={step}
          />
        );
      case 4:
        return (
          <Finish prevStep={handleBackStep} step={step} setStep={setStep} />
        );
      default:
        return null;
    }
  };

  return (
    <UserChoicesProvider>
      <div className={styles.app}>
        <Steps currentStep={step} />
        {renderComponent()}
      </div>
    </UserChoicesProvider>
  );
}

export default App;
