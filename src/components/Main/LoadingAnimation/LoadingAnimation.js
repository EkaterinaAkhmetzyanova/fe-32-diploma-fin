import { useContext } from "react";
import "./LoadingAnimation.css";
import AppContext from "AppContext";
import loadingAnimation from "./loading-animation.gif";

export default function LoadingAnimation() {
  const { animation } = useContext(AppContext);

  return (
    <div className="loading-animation">
      <img
        className="loading-animation__image"
        src={loadingAnimation}
        height="780"
        alt="loading-animation"
      />
      <p className="loading-animation__text">{animation.text}</p>
    </div>
  );
}
