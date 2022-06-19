import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import "./SelectTrainsPage.css";
import shortid from "shortid";

export default function SelectTrainsPage(props) {
  const { totalCount, limit, offset, reloadInfo } = props;

  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [middleNumber, setMiddleNumber] = useState(1);

  useEffect(() => {
    setPageNumber(Math.floor(offset / limit));
    setPageCount(Math.ceil(totalCount / limit));
    if (!offset) {
      setMiddleNumber(1);
    }
  }, [totalCount, limit, offset]);

  if (pageCount < 2) {
    return null;
  }

  const isManyPages = pageCount > 5;

  const buttons = [];
  if (!isManyPages) {
    for (let i = 1; i <= pageCount; i++) {
      buttons.push(i);
    }
  }

  const buttonClassName = "select-trains-page__button";
  const activeButtonClassName =
    buttonClassName + " select-trains-page__button_active";

  const leftArrayClick = () => {
    if (pageNumber < 1) {
      return;
    }

    const newNumber = pageNumber - 1;

    if (newNumber < middleNumber && middleNumber > 1) {
      setMiddleNumber(newNumber);
    }
    setPageNumber(newNumber);
    reloadInfo({ offset: newNumber * limit });
  };

  const rightArrayClick = () => {
    if (pageNumber > pageCount - 2) {
      return;
    }

    const newNumber = pageNumber + 1;

    if (newNumber > middleNumber + 1 && middleNumber < pageCount - 3) {
      setMiddleNumber(newNumber - 1);
    }
    setPageNumber(newNumber);
    reloadInfo({ offset: newNumber * limit });
  };

  const leftPointsClick = () => {
    let newNumber = middleNumber - 2;
    if (newNumber < 1) {
      newNumber = 1;
    }

    setMiddleNumber(newNumber);
    setPageNumber(newNumber);
    reloadInfo({ offset: newNumber * limit });
  };

  const rightPointsClick = () => {
    let newNumber = middleNumber + 2;
    if (newNumber > pageCount - 3) {
      newNumber = pageCount - 3;
    }

    setMiddleNumber(newNumber);
    setPageNumber(newNumber + 1);
    reloadInfo({ offset: (newNumber + 1) * limit });
  };

  const numberClick = (number) => {
    if (number === pageNumber) {
      return;
    }

    if (!number) {
      setMiddleNumber(1);
    }
    if (number === pageCount - 1) {
      setMiddleNumber(pageCount - 3);
    }

    setPageNumber(number);
    reloadInfo({ offset: number * limit });
  };

  return (
    <div className="select-trains-page">
      <button
        className={buttonClassName}
        type="button"
        onClick={leftArrayClick}
      >
        &lt;
      </button>
      {isManyPages ? (
        <Fragment>
          <button
            className={
              pageNumber === 0 ? activeButtonClassName : buttonClassName
            }
            type="button"
            onClick={() => numberClick(0)}
          >
            1
          </button>
          {middleNumber > 1 && (
            <button
              className={buttonClassName}
              type="button"
              onClick={leftPointsClick}
            >
              ...
            </button>
          )}
          <button
            className={
              pageNumber === middleNumber
                ? activeButtonClassName
                : buttonClassName
            }
            type="button"
            onClick={() => numberClick(middleNumber)}
          >
            {middleNumber + 1}
          </button>
          <button
            className={
              pageNumber === middleNumber + 1
                ? activeButtonClassName
                : buttonClassName
            }
            type="button"
            onClick={() => numberClick(middleNumber + 1)}
          >
            {middleNumber + 2}
          </button>
          {middleNumber < pageCount - 3 && (
            <button
              className={buttonClassName}
              type="button"
              onClick={rightPointsClick}
            >
              ...
            </button>
          )}
          <button
            className={
              pageNumber === pageCount - 1
                ? activeButtonClassName
                : buttonClassName
            }
            type="button"
            onClick={() => numberClick(pageCount - 1)}
          >
            {pageCount}
          </button>
        </Fragment>
      ) : (
        buttons.map((item, i) => (
          <button
            className={
              i === pageNumber ? activeButtonClassName : buttonClassName
            }
            type="button"
            key={shortid.generate()}
            onClick={() => numberClick(i)}
          >
            {item}
          </button>
        ))
      )}
      <button
        className="select-trains-page__button"
        type="button"
        onClick={rightArrayClick}
      >
        &gt;
      </button>
    </div>
  );
}

SelectTrainsPage.propTypes = {
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  reloadInfo: PropTypes.func.isRequired,
};
