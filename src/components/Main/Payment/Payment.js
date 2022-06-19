import { useContext, useEffect } from "react";
import "./Payment.css";
import AppContext from "AppContext";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import TravelDetails from "../Passengers/TravelDetails/TravelDetails";
import UserData from "./UserData/UserData";

export default function Payment() {
  const { setBookingStage } = useContext(AppContext);

  useEffect(() => {
    setBookingStage("payment");
  }, [setBookingStage]);

  return (
    <main className="payment">
      <ProgressIndicator stepNumber={3} />
      <div className="payment__main">
        <section className="payment__left">
          <TravelDetails />
        </section>
        <section className="payment__right">
          <UserData />
        </section>
      </div>
    </main>
  );
}
