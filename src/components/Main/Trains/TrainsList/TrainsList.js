import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./TrainsList.css";
import AppContext from "AppContext";
import TrainsListItem from "./TrainsListItem/TrainsListItem";
import SelectTrainsPage from "./SelectTrainsPage/SelectTrainsPage";
import shortid from "shortid";

export default function TrainsList(props) {
  const { reloadInfo, loadSeats } = props;

  const [sortIndex, setSortIndex] = useState(0);
  const [limitIndex, setLimitIndex] = useState(0);
  const [showList, setShowList] = useState(false);

  const { trainsInfo } = useContext(AppContext);

  useEffect(() => {
    switch (trainsInfo.params.sort) {
      case "price_":
        setSortIndex(1);
        break;
      case "duration":
        setSortIndex(2);
        break;
      default:
        setSortIndex(0);
    }
  }, [trainsInfo.params.sort]);

  useEffect(() => {
    switch (+trainsInfo.params.limit) {
      case 10:
        setLimitIndex(1);
        break;
      case 20:
        setLimitIndex(2);
        break;
      default:
        setLimitIndex(0);
    }
  }, [trainsInfo.params.limit]);

  const isForward = trainsInfo.params.direction === "forward";
  const trainsArray = isForward
    ? trainsInfo.forwardTrainsInfo.items
    : trainsInfo.backwardTrainsInfo.items;
  const trainsCount = isForward
    ? `${trainsInfo.forwardTrainsInfo.total_count}`
    : `${trainsInfo.backwardTrainsInfo.total_count}`;

  const sortModes = [
    { mode: "date", name: "времени" },
    { mode: "price_", name: "стоимости" },
    { mode: "duration", name: "длительности" },
  ];

  const limits = [5, 10, 20];

  const selectSort = (index) => {
    setShowList(false);
    setSortIndex(index);
    reloadInfo({ sort: sortModes[index].mode });
  };

  const selectLimit = (index) => {
    setLimitIndex(index);
    reloadInfo({
      limit: limits[index],
      offset: 0,
    });
  };

  return (
    <div className="trains-list">
      <div className="trains-list__menu">
        <p className="trains-list__menu-count">найдено {trainsCount}</p>
        <p className="trains-list__menu-sort-title">сортировать по:</p>
        <div className="trains-list__menu-sort-value-container">
          <p
            className="trains-list__menu-sort-value"
            onClick={() => setShowList(true)}
          >
            {sortModes[sortIndex].name}
          </p>
          {showList && (
            <ul className="trains-list__menu-sort-list">
              {sortModes.map((item, i) => (
                <li
                  className="trains-list__menu-sort-list-item"
                  key={i}
                  onClick={() => selectSort(i)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="trains-list__menu-limit-title">показывать по:</p>
        {limits.map((item, i) => (
          <p
            className={
              "trains-list__menu-limit-value" +
              (i === limitIndex ? " trains-list__menu-limit-value_active" : "")
            }
            key={i}
            onClick={() => selectLimit(i)}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="trains-list__list">
        {trainsArray.map((item) => (
          <TrainsListItem
            trainInfo={item.departure}
            isForward={isForward}
            reloadInfo={reloadInfo}
            loadSeats={loadSeats}
            isConfirmation={false}
            key={shortid.generate()}
          />
        ))}
      </div>
      <div className="trains-list__select-page">
        <SelectTrainsPage
          totalCount={
            isForward
              ? trainsInfo.forwardTrainsInfo.total_count
              : trainsInfo.backwardTrainsInfo.total_count
          }
          limit={trainsInfo.params.limit}
          offset={trainsInfo.params.offset}
          reloadInfo={reloadInfo}
        />
      </div>
    </div>
  );
}

TrainsList.propTypes = {
  reloadInfo: PropTypes.func.isRequired,
  loadSeats: PropTypes.func.isRequired,
};
