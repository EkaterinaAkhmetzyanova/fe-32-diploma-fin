import { useContext, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./Main.css";
import AppContext from "AppContext";

import LoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import HomePage from "./HomePage/HomePage";
import Trains from "./Trains/Trains";
import Seats from "./Seats/Seats";
import Passengers from "./Passengers/Passengers";
import Payment from "./Payment/Payment";
import Confirmation from "./Confirmation/Confirmation";
import Completion from "./Completion/Completion";

export default function Main() {
  const { animation } = useContext(AppContext);

  return (
    <Fragment>
      {animation.loading && <LoadingAnimation />}
      <div
        className={
          "main__body" + (animation.loading ? " main__body_no-visible" : "")
        }
      >
        <Switch>
          <Route
            path={process.env.PUBLIC_URL + "/run/trains"}
            component={Trains}
          />
          <Route
            path={process.env.PUBLIC_URL + "/run/seats"}
            component={Seats}
          />
          <Route
            path={process.env.PUBLIC_URL + "/run/passengers"}
            component={Passengers}
          />
          <Route
            path={process.env.PUBLIC_URL + "/run/payment"}
            component={Payment}
          />
          <Route
            path={process.env.PUBLIC_URL + "/run/confirmation"}
            component={Confirmation}
          />
          <Route
            path={process.env.PUBLIC_URL + "/run/completion"}
            component={Completion}
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Fragment>
  );
}
