import PropTypes from "prop-types";
import "./ProgressIndicator.css";
import darkTriangle from "./dark-triangle.svg";
import lightTriangle from "./light-triangle.svg";

export default function ProgressIndicator(props) {
  const { stepNumber } = props;

  const steps = ["Билеты", "Пассажиры", "Оплата", "Проверка"];

  return (
    <div className="progress-indicator">
      {steps.map((item, i, array) => {
        let stepClassName = `progress-indicator__step progress-indicator__step_${
          i + 1
        }`;
        if (i < stepNumber) {
          stepClassName += " progress-indicator__step_highlighted";
        }
        const stepNameClassName = `progress-indicator__step-name progress-indicator__step-name_${
          i + 1
        }`;

        return (
          <div className={stepClassName} key={i}>
            <p className="progress-indicator__step-number">{i + 1}</p>
            <p className={stepNameClassName}>{item}</p>
            {i < array.length - 1 && (
              <img
                className="progress-indicator__triangle"
                src={i < stepNumber ? lightTriangle : darkTriangle}
                width="37"
                height="98"
                alt="triangle"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

ProgressIndicator.propTypes = {
  stepNumber: PropTypes.number.isRequired,
};
