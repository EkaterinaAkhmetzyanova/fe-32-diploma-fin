import { useContext } from "react";
import "./TravelDetails.css";
import AppContext from "AppContext";
import TravelDetailsTrain from "./TravelDetailsTrain/TravelDetailsTrain";
import TravelDetailsPassengers from "./TravelDetailsPassengers/TravelDetailsPassengers";
import { separateThousands } from "api/utils";

export default function TravelDetails() {
  const {
    forwardTrain,
    backwardTrain,
    travelDetailsCollapsed,
    setTravelDetailsCollapsed,
    orderInfo,
  } = useContext(AppContext);

  const setSectionCollapsed = (name) => {
    setTravelDetailsCollapsed({
      ...travelDetailsCollapsed,
      [name]: !travelDetailsCollapsed[name],
    });
  };

  const initPriceInfo = {
    adult: { count: 0, price: 0 },
    child: { count: 0, price: 0 },
  };

  const priceInfo = orderInfo.passengerList
    .filter((item) => item.isReady)
    .reduce((info, item, i) => {
      if (item.isAdult) {
        info.adult.count++;
        info.adult.price +=
          orderInfo.seatList.forward[i].fullPrice +
          orderInfo.seatList.backward[i].fullPrice;
      } else {
        info.child.count++;
        info.child.price +=
          orderInfo.seatList.forward[i].childPrice +
          orderInfo.seatList.backward[i].childPrice;
      }

      return info;
    }, initPriceInfo);

  switch (priceInfo.adult.count) {
    case 0:
      break;
    case 1:
      priceInfo.adult.count += " Взрослый";
      break;
    default:
      priceInfo.adult.count += " Взрослых";
  }

  switch (priceInfo.child.count) {
    case 0:
      break;
    case 1:
      priceInfo.child.count += " Ребёнок";
      break;
    case 2:
    case 3:
    case 4:
      priceInfo.child.count += " Ребёнка";
      break;
    default:
      priceInfo.child.count += " Детей";
  }

  return (
    <div className="travel-details">
      <h2 className="travel-details__title">Детали поездки</h2>
      <div className="travel-details__train">
        <TravelDetailsTrain
          isForward={true}
          isCollapsed={travelDetailsCollapsed.forward}
          setCollapsed={() => setSectionCollapsed("forward")}
          train={forwardTrain}
        />
      </div>
      <div className="travel-details__train">
        <TravelDetailsTrain
          isForward={false}
          isCollapsed={travelDetailsCollapsed.backward}
          setCollapsed={() => setSectionCollapsed("backward")}
          train={backwardTrain}
        />
      </div>
      <div className="travel-details__passengers">
        <TravelDetailsPassengers
          isCollapsed={travelDetailsCollapsed.passengers}
          setCollapsed={() => setSectionCollapsed("passengers")}
          priceInfo={priceInfo}
        />
      </div>
      <div className="travel-details__total">
        <p className="travel-details__total-title">Итог</p>
        <p className="travel-details__price">
          {separateThousands(priceInfo.adult.price + priceInfo.child.price)}
        </p>
        <p className="travel-details__currency">&#x20bd;</p>
      </div>
    </div>
  );
}
