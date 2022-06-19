import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Passengers.css";
import AppContext from "AppContext";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import TravelDetails from "./TravelDetails/TravelDetails";
import EditPassenger from "./EditPassenger/EditPassenger";
import AddPassenger from "./AddPassenger/AddPassenger";
import { errorBox } from "api/gui";
import shortid from "shortid";

export default function Passengers() {
  const [passengerList, setPassengerList] = useState([]);

  const { setBookingStage, orderInfo, setOrderInfo, setPopup } =
    useContext(AppContext);

  useEffect(() => {
    setBookingStage("passengers");
  }, [setBookingStage]);

  useEffect(() => {
    setPassengerList(orderInfo.passengerList ? orderInfo.passengerList : [{}]);
  }, [orderInfo.passengerList]);

  const addPassenger = () => {
    const list = [
      ...passengerList,
      {
        isCollapsed: false,
        isAdult: true,
        firstName: "",
        lastName: "",
        patronymic: "",
        gender: true,
        birthday: "",
        isDisability: false,
        includeChild: false,
        documentType: "Паспорт РФ",
        passportSeries: "",
        passportNumber: "",
        birthSertificateNumber: "",
        isChange: false,
        isError: false,
        isReady: false,
      },
    ];

    const newOrderInfo = { ...orderInfo, passengerList: list };
    setOrderInfo(newOrderInfo);
    localStorage.setItem("orderInfo", JSON.stringify(newOrderInfo));
  };

  const isNextEnabled =
    passengerList.length && !passengerList.find((item) => !item.isReady);

  const goToNext = (evt) => {
    if (!isNextEnabled) {
      evt.preventDefault();
    }

    if (!passengerList.length) {
      errorBox(setPopup, [
        "Ошибка ввода данных",
        "Добавьте хотя бы одного пассажира",
      ]);
      return;
    }

    if (passengerList.find((item) => !item.isReady)) {
      errorBox(setPopup, [
        "Ошибка ввода данных",
        "Не сохранены данные для одного или более пассажиров",
      ]);
      return;
    }
  };

  return (
    <main className="passengers">
      <ProgressIndicator stepNumber={2} />
      <div className="passengers__main">
        <section className="passengers__left">
          <TravelDetails />
        </section>
        <section className="passengers__right">
          {passengerList.map((item, i) => (
            <div
              className="passengers__edit-passenger"
              key={shortid.generate()}
            >
              <EditPassenger
                passenger={item}
                index={i}
                passengerList={passengerList}
                setPassengerList={setPassengerList}
              />
            </div>
          ))}
          {orderInfo.seatList.forward.length > passengerList.length && (
            <div className="passengers__add-passenger">
              <AddPassenger add={addPassenger} />
            </div>
          )}
          <Link
            to={process.env.PUBLIC_URL + "/run/payment"}
            className={
              "passengers__button" +
              (isNextEnabled ? " passengers__button_active" : "")
            }
            onClick={goToNext}
          >
            Далее
          </Link>
        </section>
      </div>
    </main>
  );
}
