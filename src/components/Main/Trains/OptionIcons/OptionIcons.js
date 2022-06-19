import PropTypes from "prop-types";
import "./OptionIcons.css";
import icons from "components/Main/icons.svg";

export default function OptionIcons(props) {
  const { haveWifi, isExpress, haveFood, darkColor } = props;

  const iconClassName = `option-icons__icon option-icons__icon_${
    darkColor ? "dark" : "light"
  }`;

  return (
    <div className="option-icons">
      {haveWifi && (
        <div className="option-icons__container">
          <svg className={iconClassName} width="20" height="16">
            <use xlinkHref={icons + "#wifi"} />
          </svg>
        </div>
      )}
      {isExpress && (
        <div className="option-icons__container">
          <svg className={iconClassName} width="20" height="20">
            <use xlinkHref={icons + "#express"} />
          </svg>
        </div>
      )}
      {haveFood && (
        <div className="option-icons__container">
          <svg className={iconClassName} width="20" height="18">
            <use xlinkHref={icons + "#food"} />
          </svg>
        </div>
      )}
    </div>
  );
}

OptionIcons.propTypes = {
  haveWifi: PropTypes.bool.isRequired,
  isExpress: PropTypes.bool.isRequired,
  haveFood: PropTypes.bool.isRequired,
  darkColor: PropTypes.bool.isRequired,
};
