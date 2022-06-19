import { useContext, useEffect } from "react";
import "./Trains.css";
import AppContext from "AppContext";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import TrainsParams from "./TrainsParams/TrainsParams";
import LastRoutes from "./LastRoutes/LastRoutes";
import TrainsList from "./TrainsList/TrainsList";
import { loadTrainsInfo } from "api/http/loadTrainsInfo";
import { loadSeatsInfo } from "api/http/loadSeatsInfo";

export default function Trains() {
  const {
    setBookingStage,
    setAnimation,
    setPopup,
    trainsInfo,
    setTrainsInfo,
    setSeatsInfo,
  } = useContext(AppContext);

  useEffect(() => {
    setBookingStage("trains");
  }, [setBookingStage]);

  const reloadInfo = async (params) => {
    return await loadTrainsInfo(setAnimation, setPopup, setTrainsInfo, {
      ...trainsInfo.params,
      ...params,
    });
  };

  const loadSeats = async (forwardTrainId, backwardTrainId) => {
    return await loadSeatsInfo(setAnimation, setPopup, setSeatsInfo, {
      forwardTrainId,
      backwardTrainId,
    });
  };

  return (
    <main className="trains">
      <ProgressIndicator stepNumber={1} />
      <div className="trains__main">
        <section className="trains__left">
          <TrainsParams reloadInfo={reloadInfo} />
          <LastRoutes />
        </section>
        <section className="trains__right">
          <TrainsList reloadInfo={reloadInfo} loadSeats={loadSeats} />
        </section>
      </div>
    </main>
  );
}
