import React from "react";
import Carousel from "react-elastic-carousel";
import "./Feedbacks.css";
import data from "./data";

export default function Feedbacks() {
  return (
    <section className="feedbacks__slider" name="feedbacks" id="feedbacks">
      <h2 className="feedbacks__title">Отзывы</h2>
      <div className="feedbacks__items">
        <Carousel itemsToShow={2} showArrows={false}>
          {data.map((item, index) => (
            <div className="feedbacks__item" key={index}>
              <img
                className="feedbacks__item__avatar"
                src={item.avatar}
                alt="avatar"
              />
              <div className="feedbacks__item__content">
                <div className="feedbacks__item__name">{item.name}</div>
                <div className="feedbacks__item__text">
                  <span className="feedbacks__item__quote-start">&#8220;</span>
                  {item.text}{" "}
                  <span className="feedbacks__item__quote-end">&#8222;</span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
