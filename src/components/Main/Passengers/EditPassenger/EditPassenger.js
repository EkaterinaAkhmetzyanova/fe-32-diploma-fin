import { useState, useContext, Fragment } from "react";
import PropTypes from "prop-types";
import "./EditPassenger.css";
import AppContext from "AppContext";
import { verifyData } from "./verifyData";
import readyIcon from "./ready.svg";
import errorIcon from "./error.svg";

export default function EditPassenger(props) {
  const { passenger, index, passengerList, setPassengerList } = props;

  const [passengerState, setPassengerState] = useState(passenger);
  const [ageListShow, setAgeListShow] = useState(false);
  const [documentTypeListShow, setDocumentTypeListShow] = useState(false);

  const { orderInfo, setOrderInfo } = useContext(AppContext);

  const {
    isCollapsed,
    isAdult,
    firstName,
    lastName,
    patronymic,
    gender,
    birthday,
    isDisability,
    includeChild,
    documentType,
    passportSeries,
    passportNumber,
    birthSertificateNumber,
    isChange,
    isError,
    isReady,
  } = passengerState;

  const isPassport = documentType === "Паспорт РФ";

  const changeValue = (name, value) => {
    setPassengerState({ ...passengerState, [name]: value });
  };

  const changeBirthday = (value) => {
    const digitsArray = value.replace(/[^\d]/g, "").split("", 8);
    if (digitsArray.length > 4) {
      digitsArray.splice(4, 0, ".");
    }
    if (digitsArray.length > 2) {
      digitsArray.splice(2, 0, ".");
    }
    changeValue("birthday", digitsArray.join(""));
  };

  const changePassportSeries = (value) => {
    const newValue = value.replace(/[^\d]/g, "").slice(0, 4);
    changeValue("passportSeries", newValue);
  };

  const changePassportNumber = (value) => {
    const newValue = value.replace(/[^\d]/g, "").slice(0, 6);
    changeValue("passportNumber", newValue);
  };

  const setValue = (name, value) => {
    const list = [...passengerList];

    switch (name) {
      case "isCollapsed":
      case "isChange":
      case "isError":
      case "isReady":
        break;
      default:
        if (list[index][name] !== value) {
          list[index].isChange = true;
          list[index].isError = false;
          list[index].isReady = false;
        }
    }

    list[index][name] = value;
    setPassengerList(list);
  };

  const setBirthSertificateNumber = (value) => {
    const newValue = value
      .replace(/[^0-9IVXА-Я]/g, "")
      .slice(0, 12)
      .toUpperCase();
    setValue("birthSertificateNumber", newValue);
  };

  const keyPress = (evt) => {
    if (evt.key === "Enter") {
      evt.target.blur();
    }
  };

  const savePassenger = (evt) => {
    const list = [...passengerList];

    list[index].isChange = false;
    list[index].isReady = verifyData(passengerState).isReady;
    list[index].isError = !list[index].isReady;

    const newOrderInfo = { ...orderInfo, passengerList: list };
    setOrderInfo(newOrderInfo);
    localStorage.setItem("orderInfo", JSON.stringify(newOrderInfo));
  };

  const deletePassenger = () => {
    const list = passengerList;
    list.splice(index, 1);
    const newOrderInfo = { ...orderInfo, passengerList: list };
    setOrderInfo(newOrderInfo);
    localStorage.setItem("orderInfo", JSON.stringify(newOrderInfo));
  };

  let verify = {
    errorFlags: {},
    errorText: {},
  };

  if (isError) {
    verify = verifyData(passengerState);
  }

  const { errorFlags, errorText } = verify;

  return (
    <div className="edit-passenger">
      <div
        className={
          "edit-passenger__collapsed" +
          (isCollapsed ? "" : " edit-passenger__collapsed_gray")
        }
      >
        <button
          className={
            "edit-passenger__button-collapse" +
            (isCollapsed ? "" : " edit-passenger__button-collapse_minus")
          }
          type="button"
          onClick={() => setValue("isCollapsed", !isCollapsed)}
        ></button>
        <p className="edit-passenger__title">Пассажир {index + 1}</p>
        {!isCollapsed && (
          <button
            className="edit-passenger__button-close"
            type="button"
            onClick={deletePassenger}
          ></button>
        )}
      </div>
      {!isCollapsed && (
        <form className="edit-passenger__form">
          <div className="edit-passenger__ago-container">
            <input
              className="edit-passenger__input edit-passenger__ago edit-passsenger__listbox"
              type="text"
              name="age"
              value={isAdult ? "Взрослый" : "Детский"}
              readOnly
              onClick={() => setAgeListShow(true)}
            />
            {ageListShow && (
              <ul className="edit-passenger__list">
                <li
                  className="edit-passenger__list-item"
                  onClick={() => setValue("isAdult", true)}
                >
                  Взрослый
                </li>
                <li
                  className="edit-passenger__list-item"
                  onClick={() => setValue("isAdult", false)}
                >
                  Детский
                </li>
              </ul>
            )}
          </div>
          <div className="edit-passenger__name-section">
            <label className="edit-passenger__label edit-passenger__last-name">
              Фамилия
              <input
                className={
                  "edit-passenger__input" +
                  (errorFlags.lastName ? " edit-passenger__error" : "")
                }
                type="text"
                name="last-name"
                placeholder="Иванов"
                value={lastName}
                onChange={(evt) => changeValue("lastName", evt.target.value)}
                onBlur={(evt) => setValue("lastName", evt.target.value.trim())}
                onKeyPress={keyPress}
              />
            </label>
            <label className="edit-passenger__label edit-passenger__first-name">
              Имя
              <input
                className={
                  "edit-passenger__input" +
                  (errorFlags.firstName ? " edit-passenger__error" : "")
                }
                type="text"
                name="first-name"
                placeholder="Иван"
                value={firstName}
                onChange={(evt) => changeValue("firstName", evt.target.value)}
                onBlur={(evt) => setValue("firstName", evt.target.value.trim())}
                onKeyPress={keyPress}
              />
            </label>
            <label className="edit-passenger__label edit-passenger__patronymic">
              Отчество
              <input
                className={
                  "edit-passenger__input" +
                  (errorFlags.patronymic ? " edit-passenger__error" : "")
                }
                type="text"
                name="patronymic"
                placeholder="Иванович"
                value={patronymic}
                onChange={(evt) => changeValue("patronymic", evt.target.value)}
                onBlur={(evt) =>
                  setValue("patronymic", evt.target.value.trim())
                }
                onKeyPress={keyPress}
              />
            </label>
          </div>
          <div className="edit-passenger__data-section">
            <label className="edit-passenger__label edit-passenger__gender">
              Пол
              <div className="edit-passenger__gender-selector">
                <div
                  className={
                    "edit-passenger__gender-item" +
                    (gender ? " edit-passenger__gender-item_active" : "")
                  }
                  onClick={() => setValue("gender", true)}
                >
                  М
                </div>
                <div
                  className={
                    "edit-passenger__gender-item" +
                    (gender ? "" : " edit-passenger__gender-item_active")
                  }
                  onClick={() => setValue("gender", false)}
                >
                  Ж
                </div>
              </div>
            </label>
            <label className="edit-passenger__label edit-passenger__birthday">
              Дата рождения
              <input
                className={
                  "edit-passenger__input" +
                  (errorFlags.birthday ? " edit-passenger__error" : "")
                }
                type="text"
                name="birthday"
                placeholder="ДД ММ ГГГГ"
                value={birthday}
                onChange={(evt) => changeBirthday(evt.target.value)}
                onBlur={(evt) => setValue("birthday", evt.target.value)}
                onKeyPress={keyPress}
              />
            </label>
          </div>
          <div className="edit-passenger__options-section">
            <label
              className={
                "edit-passenger__label edit-passenger__label-checkbox" +
                (isDisability ? " edit-passenger__label-checkbox_checked" : "")
              }
            >
              <input
                className="edit-passenger__checkbox"
                type="checkbox"
                name="disability"
                checked={isDisability}
                onChange={() => setValue("isDisability", !isDisability)}
              />
              ограниченная подвижность
            </label>
            {isAdult && (
              <label
                className={
                  "edit-passenger__label edit-passenger__label-checkbox" +
                  (includeChild
                    ? " edit-passenger__label-checkbox_checked"
                    : "")
                }
              >
                <input
                  className="edit-passenger__checkbox"
                  type="checkbox"
                  name="include-child"
                  checked={includeChild}
                  onChange={() => setValue("includeChild", !includeChild)}
                />
                провоз ребёнка "без места"
              </label>
            )}
          </div>
          <div className="edit-passenger__document-data-section">
            <label
              className={
                "edit-passenger__label edit-passenger__document-type" +
                (isPassport
                  ? " edit-passenger__document-type_passport"
                  : " edit-passenger__document-type_sertificate")
              }
            >
              Тип документа
              <input
                className={
                  "edit-passenger__input edit-passsenger__listbox" +
                  (errorFlags.documentType ? " edit-passenger__error" : "")
                }
                type="text"
                name="document-type"
                value={documentType}
                readOnly
                onClick={() => setDocumentTypeListShow(true)}
              />
              {documentTypeListShow && (
                <ul className="edit-passenger__list edit-passenger__list_document-type">
                  <li
                    className="edit-passenger__list-item"
                    onClick={() => setValue("documentType", "Паспорт РФ")}
                  >
                    Паспорт РФ
                  </li>
                  <li
                    className="edit-passenger__list-item"
                    onClick={() =>
                      setValue("documentType", "Свидетельство о рождении")
                    }
                  >
                    Свидетельство о рождении
                  </li>
                </ul>
              )}
            </label>
            {isPassport ? (
              <Fragment>
                <label className="edit-passenger__label edit-passenger__passport-series">
                  Серия
                  <input
                    className={
                      "edit-passenger__input edit-passenger__input_passport-series" +
                      (errorFlags.passportSeries
                        ? " edit-passenger__error"
                        : "")
                    }
                    type="text"
                    name="passport-series"
                    placeholder=" "
                    value={passportSeries}
                    onChange={(evt) => changePassportSeries(evt.target.value)}
                    onBlur={(evt) =>
                      setValue("passportSeries", evt.target.value)
                    }
                    onKeyPress={keyPress}
                  />
                </label>
                <label className="edit-passenger__label edit-passenger__passport-number">
                  Номер
                  <input
                    className={
                      "edit-passenger__input edit-passenger__input_passport-number" +
                      (errorFlags.passportNumber
                        ? " edit-passenger__error"
                        : "")
                    }
                    type="text"
                    name="passport-number"
                    placeholder=" "
                    value={passportNumber}
                    onChange={(evt) => changePassportNumber(evt.target.value)}
                    onBlur={(evt) =>
                      setValue("passportNumber", evt.target.value)
                    }
                    onKeyPress={keyPress}
                  />
                </label>
              </Fragment>
            ) : (
              <label className="edit-passenger__label edit-passenger__sertificate-number">
                Номер
                <input
                  className={
                    "edit-passenger__input edit-passenger__input_sertificate" +
                    (errorFlags.birthSertificateNumber
                      ? " edit-passenger__error"
                      : "")
                  }
                  type="text"
                  name="sertificate-number"
                  placeholder=" "
                  value={birthSertificateNumber}
                  onChange={(evt) =>
                    changeValue(
                      "birthSertificateNumber",
                      evt.target.value.toUpperCase()
                    )
                  }
                  onBlur={(evt) => setBirthSertificateNumber(evt.target.value)}
                  onKeyPress={keyPress}
                />
              </label>
            )}
          </div>
          <div
            className={
              "edit-passenger__state-section" +
              (isError ? " edit-passenger__state-section_error" : "") +
              (isReady ? " edit-passenger__state-section_ready" : "")
            }
          >
            {isReady && (
              <Fragment>
                <img
                  className="edit-passenger__state-icon"
                  src={readyIcon}
                  width="32"
                  height="32"
                  alt="ready-icon"
                />
                <div className="edit-passenger__state-text-container">
                  <p className="edit-passenger__state-text-ready">Готово</p>
                </div>
              </Fragment>
            )}
            {isError && (
              <Fragment>
                <img
                  className="edit-passenger__state-icon"
                  src={errorIcon}
                  width="32"
                  height="32"
                  alt="error-icon"
                />
                <div className="edit-passenger__state-text-container">
                  {errorText.string1 && (
                    <p className="edit-passenger__state-text-error">
                      {errorText.string1}
                    </p>
                  )}
                  {errorText.string2 && (
                    <p className="edit-passenger__state-text-error">
                      {errorText.string2}
                      {errorText.string3 && (
                        <span className="edit-passenger__state-text-error_bold">
                          {errorText.string3}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </Fragment>
            )}
            {isChange && (
              <button
                className="edit-passenger__button-save"
                type="button"
                onClick={savePassenger}
              >
                Сохранить изменения
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

EditPassenger.propTypes = {
  passenger: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  passengerList: PropTypes.array.isRequired,
  setPassengerList: PropTypes.func.isRequired,
};
