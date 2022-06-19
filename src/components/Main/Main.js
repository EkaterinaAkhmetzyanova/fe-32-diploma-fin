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
          <Route exact path="/" component={HomePage} />
          <Route path="/run/trains" component={Trains} />
          <Route path="/run/seats" component={Seats} />
          <Route path="/run/passengers" component={Passengers} />
          <Route path="/run/payment" component={Payment} />
          <Route path="/run/confirmation" component={Confirmation} />
          <Route path="/run/completion" component={Completion} />
        </Switch>
      </div>
    </Fragment>
  );
}
