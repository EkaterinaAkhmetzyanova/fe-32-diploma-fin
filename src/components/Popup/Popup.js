import { useContext } from "react";
import "./Popup.css";
import iconError from "./icon-error.svg";
import iconInfo from "./icon-info.svg";
import AppContext from "AppContext";
import shortid from "shortid";

export default function Popup() {
  const { popup, setPopup, animation } = useContext(AppContext);
  const { visible, buttonText, content, error } = popup;

  const classModificator = error ? "error" : "info";

  const closePopup = () => setPopup({ visible: false });

  return (
    (visible || animation.loading) && (
      <div className="popup">
        {visible && (
          <div className={`popup__window popup__window_${classModificator}`}>
            <div className={`popup__top popup__top_${classModificator}`}>
              <img
                className="popup__icon"
                src={error ? iconError : iconInfo}
                width="32"
                alt="icon"
              />
            </div>
            <div
              className={`popup__content popup__content_${classModificator}`}
            >
              {content.map((item, i) => (
                <p
                  className={`popup__paragraph popup__paragraph_${classModificator}`}
                  key={shortid.generate()}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="popup__bottom">
              <button
                className="popup__button"
                type="button"
                onClick={closePopup}
              >
                {buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}
