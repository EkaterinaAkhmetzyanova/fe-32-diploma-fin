import React, { useContext } from "react";
import "./Description.css";
import AppContext from "AppContext";
import { infoBox } from "api/gui";

export default function Description() {
  const { setPopup } = useContext(AppContext);

  const description = [
    ["Удобный заказ", "на сайте"],
    ["Нет необходимости", "ехать в офис"],
    ["Огромный выбор", "направлений"],
  ];

  const showPopup = () => {
    infoBox(
      setPopup,
      "За более подробной информацией обращайтесь по указанным ниже контактам"
    );
  };

  return (
    <section className="description" id="description">
      <div className="description__top">
        <h2 className="description__title">Как это работает</h2>
        <button
          className="description__button"
          type="button"
          onClick={showPopup}
        >
          Узнать больше
        </button>
      </div>
      <div className="description__items">
        {description.map((item, index) => (
          <div key={index} className="description__item">
            <div
              className={`description__icon description__icon_${index + 1}`}
            ></div>
            <p className="description__text">
              {item.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
