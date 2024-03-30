import React, { useContext } from "react";
import styles from "./Finish.module.scss";
import Card from "./Card";
import { userChoicesContext } from "./UserChoicesContext";

const Finish = ({ prevStep, step, setStep }) => {
  const { userChoices } = useContext(userChoicesContext);
  const monthlyPrices = {
    plan: {
      Arcade: 9,
      Advanced: 12,
      Pro: 15,
    },
    addons: {
      "Online service": 1,
      "Large storage": 2,
      "Customizable profile": 2,
    },
  };
  const yearlyPrices = {
    plan: {
      Arcade: 90,
      Advanced: 120,
      Pro: 150,
    },
    addons: {
      "Online service": 10,
      "Large storage": 20,
      "Customizable profile": 20,
    },
  };

  //control rendered prices on selected method
  const price = userChoices.method === "monthly" ? monthlyPrices : yearlyPrices;

  const totalPlanPrice = price.plan[userChoices.plan];
  //calculating addons price summ
  const totalAddonPrice = Object.entries(userChoices.addons).reduce(
    (total, [addon, addonValue]) => {
      if (addonValue) {
        total += price.addons[addon];
      }
      return total;
    },
    0
  );
  // Calculate the total price addons + plan
  const totalPrice = totalPlanPrice + totalAddonPrice;

  return (
    <Card prevStep={prevStep} step={step} setStep={setStep}>
      <div className={styles.finish}>
        <header>
          <h1>Finishing up</h1>
          <p>Double-check everything looks OK before confirming.</p>
        </header>
        <div className={styles["finish__summary"]} role="list">
          <p className={styles["finish__summary__plan"]} role="listitem">
            {userChoices.plan} ({price == monthlyPrices ? "Monthly" : "Yearly"}){" "}
            <span aria-label={`${userChoices.plan} price`}>
              ${totalPlanPrice}
              {price == monthlyPrices ? "/mo" : "/yr"}
            </span>
          </p>
          {Object.entries(userChoices.addons).map(
            ([addon, addonValue], key) =>
              addonValue && (
                <p
                  className={styles["finish__summary__addon"]}
                  key={key}
                  role="listitem"
                >
                  {addon}{" "}
                  <span aria-label={`${addon} price`}>
                    ${price.addons[addon]}
                    {price == monthlyPrices ? "/mo" : "/yr"}
                  </span>
                </p>
              )
          )}
        </div>
        <p className={styles["finish__total"]} role="listitem">
          Total ({price == monthlyPrices ? "per month" : "per year"})
          <span aria-label="Total Price">
            ${totalPrice}
            {price == monthlyPrices ? "/mo" : "/yr"}
          </span>
        </p>
      </div>
    </Card>
  );
};

export default Finish;
