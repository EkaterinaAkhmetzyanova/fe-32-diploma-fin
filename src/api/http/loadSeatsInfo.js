import { seats } from "./http";
import { httpErrorBox, incorrectDataErrorBox } from "../gui";

export async function loadSeatsInfo(
  setAnimation,
  setPopup,
  setSeatsInfo,
  params
) {
  setAnimation({ loading: true, text: "Идёт поиск" });

  let response;
  let forwardSeatsInfo;
  let backwardSeatsInfo;

  const {
    forwardTrainId,
    backwardTrainId,
    haveFirstClass,
    haveSecondClass,
    haveThirdClass,
    haveFourthClass,
    haveWifi,
    haveAirConditioning,
    isExpress,
  } = params;

  const seatsParams = {};

  if (haveFirstClass) {
    seatsParams.have_first_class = true;
  }

  if (haveSecondClass) {
    seatsParams.have_second_class = true;
  }

  if (haveThirdClass) {
    seatsParams.have_third_class = true;
  }

  if (haveFourthClass) {
    seatsParams.have_fourth_class = true;
  }

  if (haveWifi) {
    seatsParams.have_wifi = true;
  }

  if (haveAirConditioning) {
    seatsParams.have_air_conditioning = true;
  }

  if (isExpress) {
    seatsParams.is_express = true;
  }

  response = await seats(forwardTrainId, seatsParams);
  if (!response.ok) {
    setAnimation({ loading: false });
    httpErrorBox(setPopup, response);
    return false;
  }

  try {
    forwardSeatsInfo = await response.json();
  } catch (e) {
    setAnimation({ loading: false });
    incorrectDataErrorBox(setPopup);
    return false;
  }

  response = await seats(backwardTrainId, seatsParams);
  if (!response.ok) {
    setAnimation({ loading: false });
    httpErrorBox(setPopup, response);
    return false;
  }

  try {
    backwardSeatsInfo = await response.json();
  } catch (e) {
    setAnimation({ loading: false });
    incorrectDataErrorBox(setPopup);
    return false;
  }

  const seatsInfo = {
    params,
    forwardSeatsInfo,
    backwardSeatsInfo,
  };

  setSeatsInfo(seatsInfo);
  localStorage.setItem("seatsInfo", JSON.stringify(seatsInfo));

  setAnimation({ loading: false });
  return true;
}
