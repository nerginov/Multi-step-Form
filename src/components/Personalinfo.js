import styles from "./Personalinfo.module.scss";
import Card from "./Card";
import { useEffect, useState, useContext } from "react";
import { userChoicesContext } from "./UserChoicesContext";

const Personalinfo = ({ nextStep, step }) => {
  const { userChoices, setUserChoices } = useContext(userChoicesContext);
  //Set formData with the userChoices data from context
  const [formData, setFormData] = useState({ ...userChoices.personalInfo });
  //Storing errors to display
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  //Updating the formData on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Validating the inputs before unlocking next step and updates the context userChoices.
  const handleSubmit = () => {
    const validateName = (name) => {
      return name.trim().length > 0 ? true : false;
    };
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const validatePhone = (phone) => {
      //phone number format +44 123 456 7890 with and without spaces
      const phoneRegex = /^\+\d{2}\s?\d{3}\s?\d{3}\s?\d{4}$/;
      return phoneRegex.test(phone);
    };

    //Storing the input validation result and set the coresponding error to the opposite
    const isNameValid = validateName(formData.name);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      name: !isNameValid,
    }));

    const isEmailValid = validateEmail(formData.email);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      email: !isEmailValid,
    }));

    const isPhoneValid = validatePhone(formData.phone);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      phone: !isPhoneValid,
    }));

    //If every input is valid, update userChoices in context with their stored values in formData
    if (isNameValid && isEmailValid && isPhoneValid) {
      setUserChoices((prevUserChoices) => ({
        ...prevUserChoices,
        personalInfo: {
          ...prevUserChoices.personalInfo,
          ...formData,
        },
      }));
      return true; //true is the condition to unlock next step
    }
  };

  return (
    <Card nextStep={nextStep} step={step} handleSubmit={handleSubmit}>
      <div className={styles["personal-info"]}>
        <header>
          <h1>Personal Info</h1>
          <p>Please provide your name,email adress and phone number</p>
        </header>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g Stephan King"
              onChange={(e) => handleInputChange(e)}
              value={formData.name}
              required
              className={validationErrors.name ? styles.error : ""}
              aria-describedby={validationErrors.name ? "name-error" : null}
            />
            {validationErrors.name && (
              <p id="name-error" className={styles["error-msg"]}>
                This filed is required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g stephanking@gmail.com"
              onChange={(e) => handleInputChange(e)}
              value={formData.email}
              required
              className={validationErrors.email ? styles.error : ""}
              aria-describedby={validationErrors.email ? "email-error" : null}
            />
            {validationErrors.email && (
              <p id="email-error" className={styles["error-msg"]}>
                Please enter a valid email
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="e.g +44 123 456 7890"
              onChange={(e) => handleInputChange(e)}
              value={formData.phone}
              required
              className={validationErrors.phone ? styles.error : ""}
              aria-describedby={validationErrors.phone ? "phone-error" : null}
            />
            {validationErrors.phone && (
              <p id="phone-error" className={styles["error-msg"]}>
                e.g(+44 123 456 7890)
              </p>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Personalinfo;
