import "./SocialMedia.css";
import icons from "./icons.svg";

export default function SocialMedia() {
  return (
    <div className="social-media">
      <h3 className="social-media__title">Подписывайтесь на нас</h3>
      <ul className="social-media__list">
        <li className="social-media__list-item">
          <a className="social-media__link" href="https://www.youtube.com">
            <svg className="social-media__icon" width="38" height="30">
              <use xlinkHref={icons + "#youtube"} />
            </svg>
          </a>
        </li>
        <li className="social-media__list-item">
          <a className="social-media__link" href="https://www.instagram.com">
            <svg className="social-media__icon" width="32" height="30">
              <use xlinkHref={icons + "#instagram"} />
            </svg>
          </a>
        </li>
        <li className="social-media__list-item">
          <a className="social-media__link" href="https://plus.google.com">
            <svg className="social-media__icon" width="47" height="30">
              <use xlinkHref={icons + "#google-plus"} />
            </svg>
          </a>
        </li>
        <li className="social-media__list-item">
          <a className="social-media__link" href="https://www.facebook.com">
            <svg className="social-media__icon" width="14" height="30">
              <use xlinkHref={icons + "#facebook"} />
            </svg>
          </a>
        </li>
        <li className="social-media__list-item">
          <a className="social-media__link" href="https://twitter.com">
            <svg className="social-media__icon" width="37" height="30">
              <use xlinkHref={icons + "#twitter"} />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
