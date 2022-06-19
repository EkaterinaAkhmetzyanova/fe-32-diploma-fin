import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./TrainsParams.css";
import AppContext from "AppContext";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import OptionCheckBox from "./OptionCheckBox/OptionCheckBox";
import PriceRangeBar from "./PriceRangeBar/PriceRangeBar";
import TrainsTimeFilter from "./TrainsTimeFilter/TrainsTimeFilter";
import { dayInFirstPosition } from "api/utils";
import calendar from "../../../Header/TicketSearchForm/calendar.svg";

registerLocale("ru", ru);

export default function TrainsParams(props) {
  const { reloadInfo } = props;

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [haveFirstClass, setHaveFirstClass] = useState(false);
  const [haveSecondClass, setHaveSecondClass] = useState(false);
  const [haveThirdClass, setHaveThirdClass] = useState(false);
  const [haveFourthClass, setHaveFourthClass] = useState(false);
  const [haveWifi, setHaveWifi] = useState(false);
  const [isExpress, setIsExpress] = useState(false);

  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);

  const [startDepartureHourFrom, setStartDepartureHourFrom] = useState(0);
  const [startDepartureHourTo, setStartDepartureHourTo] = useState(24);
  const [startArrivalHourFrom, setStartArrivalHourFrom] = useState(0);
  const [startArrivalHourTo, setStartArrivalHourTo] = useState(24);
  const [endDepartureHourFrom, setEndDepartureHourFrom] = useState(0);
  const [endDepartureHourTo, setEndDepartureHourTo] = useState(24);
  const [endArrivalHourFrom, setEndArrivalHourFrom] = useState(0);
  const [endArrivalHourTo, setEndArrivalHourTo] = useState(24);

  const { bookingStage, trainsInfo, seatsInfo } = useContext(AppContext);

  useEffect(() => {
    setDateStart(dayInFirstPosition(trainsInfo.params.dateStart));
  }, [trainsInfo.params.dateStart]);

  useEffect(() => {
    setDateEnd(dayInFirstPosition(trainsInfo.params.dateEnd));
  }, [trainsInfo.params.dateEnd]);

  useEffect(() => {
    setHaveFirstClass(
      !!(bookingStage === "trains"
        ? trainsInfo.params.haveFirstClass
        : seatsInfo.params.haveFirstClass)
    );
  }, [
    bookingStage,
    trainsInfo.params.haveFirstClass,
    seatsInfo.params.haveFirstClass,
  ]);

  useEffect(() => {
    setHaveSecondClass(
      !!(bookingStage === "trains"
        ? trainsInfo.params.haveSecondClass
        : seatsInfo.params.haveSecondClass)
    );
  }, [
    bookingStage,
    trainsInfo.params.haveSecondClass,
    seatsInfo.params.haveSecondClass,
  ]);

  useEffect(() => {
    setHaveThirdClass(
      !!(bookingStage === "trains"
        ? trainsInfo.params.haveThirdClass
        : seatsInfo.params.haveThirdClass)
    );
  }, [
    bookingStage,
    trainsInfo.params.haveThirdClass,
    seatsInfo.params.haveThirdClass,
  ]);

  useEffect(() => {
    setHaveFourthClass(
      !!(bookingStage === "trains"
        ? trainsInfo.params.haveFourthClass
        : seatsInfo.params.haveFourthClass)
    );
  }, [
    bookingStage,
    trainsInfo.params.haveFourthClass,
    seatsInfo.params.haveFourthClass,
  ]);

  useEffect(() => {
    setHaveWifi(
      !!(bookingStage === "trains"
        ? trainsInfo.params.haveWifi
        : seatsInfo.params.haveWifi)
    );
  }, [bookingStage, trainsInfo.params.haveWifi, seatsInfo.params.haveWifi]);

  useEffect(() => {
    setIsExpress(
      !!(bookingStage === "trains"
        ? trainsInfo.params.isExpress
        : seatsInfo.params.isExpress)
    );
  }, [bookingStage, trainsInfo.params.isExpress, seatsInfo.params.isExpress]);

  useEffect(() => {
    if (trainsInfo.params.priceFrom !== undefined) {
      setPriceFrom(trainsInfo.params.priceFrom);
    }
  }, [trainsInfo.params.priceFrom]);

  useEffect(() => {
    if (trainsInfo.params.priceTo !== undefined) {
      setPriceTo(trainsInfo.params.priceTo);
    }
  }, [trainsInfo.params.priceTo]);

  useEffect(() => {
    if (trainsInfo.params.startDepartureHourFrom !== undefined) {
      setStartDepartureHourFrom(trainsInfo.params.startDepartureHourFrom);
    }
  }, [trainsInfo.params.startDepartureHourFrom]);

  useEffect(() => {
    if (trainsInfo.params.startDepartureHourTo !== undefined) {
      setStartDepartureHourTo(trainsInfo.params.startDepartureHourTo);
    }
  }, [trainsInfo.params.startDepartureHourTo]);

  useEffect(() => {
    if (trainsInfo.params.startArrivalHourFrom !== undefined) {
      setStartArrivalHourFrom(trainsInfo.params.startArrivalHourFrom);
    }
  }, [trainsInfo.params.startArrivalHourFrom]);

  useEffect(() => {
    if (trainsInfo.params.startArrivalHourTo !== undefined) {
      setStartArrivalHourTo(trainsInfo.params.startArrivalHourTo);
    }
  }, [trainsInfo.params.startArrivalHourTo]);

  useEffect(() => {
    if (trainsInfo.params.endDepartureHourFrom !== undefined) {
      setEndDepartureHourFrom(trainsInfo.params.endDepartureHourFrom);
    }
  }, [trainsInfo.params.endDepartureHourFrom]);

  useEffect(() => {
    if (trainsInfo.params.endDepartureHourTo !== undefined) {
      setEndDepartureHourTo(trainsInfo.params.endDepartureHourTo);
    }
  }, [trainsInfo.params.endDepartureHourTo]);

  useEffect(() => {
    if (trainsInfo.params.endArrivalHourFrom !== undefined) {
      setEndArrivalHourFrom(trainsInfo.params.endArrivalHourFrom);
    }
  }, [trainsInfo.params.endArrivalHourFrom]);

  useEffect(() => {
    if (trainsInfo.params.endArrivalHourTo !== undefined) {
      setEndArrivalHourTo(trainsInfo.params.endArrivalHourTo);
    }
  }, [trainsInfo.params.endArrivalHourTo]);

  const changeHaveFirstClass = (value) => {
    setHaveFirstClass(value);
    reloadInfo({
      haveFirstClass: value,
      offset: 0,
    });
  };

  const changeHaveSecondClass = (value) => {
    setHaveSecondClass(value);
    reloadInfo({
      haveSecondClass: value,
      offset: 0,
    });
  };

  const changeHaveThirdClass = (value) => {
    setHaveThirdClass(value);
    reloadInfo({
      haveThirdClass: value,
      offset: 0,
    });
  };

  const changeHaveFourthClass = (value) => {
    setHaveFourthClass(value);
    reloadInfo({
      haveFourthClass: value,
      offset: 0,
    });
  };

  const changeHaveWifi = (value) => {
    setHaveWifi(value);
    reloadInfo({
      haveWifi: value,
      offset: 0,
    });
  };

  const changeIsExpress = (value) => {
    setIsExpress(value);
    reloadInfo({
      isExpress: value,
      offset: 0,
    });
  };

  const changePriceRange = (minValue, maxValue) => {
    reloadInfo({
      priceFrom: minValue,
      priceTo: maxValue,
      offset: 0,
    });
  };

  const changeStartTimes = (times) => {
    reloadInfo({
      startDepartureHourFrom: times.departureHourFrom,
      startDepartureHourTo: times.departureHourTo,
      startArrivalHourFrom: times.arrivalHourFrom,
      startArrivalHourTo: times.arrivalHourTo,
      offset: 0,
    });
  };

  const changeEndTimes = (times) => {
    reloadInfo({
      endDepartureHourFrom: times.departureHourFrom,
      endDepartureHourTo: times.departureHourTo,
      endArrivalHourFrom: times.arrivalHourFrom,
      endArrivalHourTo: times.arrivalHourTo,
      offset: 0,
    });
  };

  const startTimes = {
    departureHourFrom: startDepartureHourFrom,
    departureHourTo: startDepartureHourTo,
    arrivalHourFrom: startArrivalHourFrom,
    arrivalHourTo: startArrivalHourTo,
  };

  const endTimes = {
    departureHourFrom: endDepartureHourFrom,
    departureHourTo: endDepartureHourTo,
    arrivalHourFrom: endArrivalHourFrom,
    arrivalHourTo: endArrivalHourTo,
  };

  const setStartTimes = {
    setDepartureHourFrom: setStartDepartureHourFrom,
    setDepartureHourTo: setStartDepartureHourTo,
    setArrivalHourFrom: setStartArrivalHourFrom,
    setArrivalHourTo: setStartArrivalHourTo,
  };

  const setEndTimes = {
    setDepartureHourFrom: setEndDepartureHourFrom,
    setDepartureHourTo: setEndDepartureHourTo,
    setArrivalHourFrom: setEndArrivalHourFrom,
    setArrivalHourTo: setEndArrivalHourTo,
  };

  return (
    <div className="trains-params">
      <section className="trains-params__dates">
        <label className="trains-params__date-title">
          Дата поездки
          <div className="trains-params__date-container">
            <DatePicker
              className="date-input__datepicker"
              locale="ru"
              dateFormat="dd/MM/yyyy"
              // minDate={Date.now()}
              selected={dateStart}
              placeholderText="ДД/ММ/ГГ"
              onChange={(date) => setDateStart(date)}
            />
            <div className="side-date-input__button">
              <img
                className="date-input__button-icon"
                src={calendar}
                width="100%"
                alt="button-calendar"
              />
            </div>
          </div>
        </label>
        <label className="trains-params__date-title">
          Дата возвращения
          <div className="trains-params__date-container">
            <DatePicker
              className="date-input__datepicker"
              locale="ru"
              dateFormat="dd/MM/yyyy"
              // minDate={Date.now()}
              selected={dateEnd}
              placeholderText="ДД/ММ/ГГ"
              onChange={(date) => setDateEnd(date)}
            />
            <div className="side-date-input__button">
              <img
                className="date-input__button-icon"
                src={calendar}
                width="100%"
                alt="button-calendar"
              />
            </div>
          </div>
        </label>
      </section>
      <section className="trains-params__options">
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="second-class"
            iconWidth={17}
            iconHeight={17}
            name="Купе"
            value={haveSecondClass}
            setValue={changeHaveSecondClass}
          />
        </div>
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="third-class"
            iconWidth={17}
            iconHeight={17}
            name="Плацкарт"
            value={haveThirdClass}
            setValue={changeHaveThirdClass}
          />
        </div>
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="fourth-class"
            iconWidth={14}
            iconHeight={23}
            name="Сидячий"
            value={haveFourthClass}
            setValue={changeHaveFourthClass}
          />
        </div>
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="first-class"
            iconWidth={22}
            iconHeight={20}
            name="Люкс"
            value={haveFirstClass}
            setValue={changeHaveFirstClass}
          />
        </div>
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="wifi"
            iconWidth={24}
            iconHeight={19}
            name="Wi-Fi"
            value={haveWifi}
            setValue={changeHaveWifi}
          />
        </div>
        <div className="trains-params__option">
          <OptionCheckBox
            iconName="express"
            iconWidth={20}
            iconHeight={20}
            name="Экспресс"
            value={isExpress}
            setValue={changeIsExpress}
          />
        </div>
      </section>
      <section className="trains-params__price">
        <p className="trains-params__price-title">Стоимость</p>
        <div className="trains-params__price-range-bar">
          <PriceRangeBar
            minValue={priceFrom}
            maxValue={priceTo}
            setMinValue={setPriceFrom}
            setMaxValue={setPriceTo}
            changeRange={changePriceRange}
            isDisabled={bookingStage !== "trains"}
          />
        </div>
      </section>
      <section className="trains-params__times">
        <TrainsTimeFilter
          times={startTimes}
          setTimes={setStartTimes}
          changeTimes={changeStartTimes}
          isStart={true}
          isDisabled={
            !(
              bookingStage === "trains" &&
              trainsInfo.params.direction === "forward"
            )
          }
        />
      </section>
      <section className="trains-params__times">
        <TrainsTimeFilter
          times={endTimes}
          setTimes={setEndTimes}
          changeTimes={changeEndTimes}
          isStart={false}
          isDisabled={
            !(
              bookingStage === "trains" &&
              trainsInfo.params.direction === "backward"
            )
          }
        />
      </section>
    </div>
  );
}

TrainsParams.propTypes = {
  reloadInfo: PropTypes.func.isRequired,
};
