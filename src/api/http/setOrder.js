import { order } from "./http";
import { dayInLastPosition } from "../utils";

export async function setOrder(
  setAnimation,
  forwardTrain,
  backwardTrain,
  orderInfo
) {
  const { seatList, passengerList, user } = orderInfo;
  const { firstName, lastName, patronymic, phone, email, paymentMethod } = user;

  const departure = {
    route_direction_id: forwardTrain._id,
  };

  departure.seats = passengerList.map((item, i) => {
    const isPassport = item.documentType === "Паспорт РФ";

    return {
      coach_id: seatList.forward[i].coachId,
      person_info: {
        is_adult: item.isAdult,
        first_name: item.firstName,
        last_name: item.lastName,
        patronymic: item.patronymic,
        gender: item.gender,
        birthday: dayInLastPosition(item.birthday),
        document_type: isPassport ? "паспорт" : "свидетельство",
        document_data: isPassport
          ? item.passportSeries + item.passportNumber
          : item.birthSertificateNumber,
      },
      seat_number: seatList.forward[i].seatNumber,
      is_child: !item.isAdult,
      include_children_seat: item.includeChild,
    };
  });

  const arrival = {
    route_direction_id: backwardTrain._id,
  };

  arrival.seats = passengerList.map((item, i) => {
    const isPassport = item.documentType === "Паспорт РФ";

    return {
      coach_id: seatList.backward[i].coachId,
      person_info: {
        is_adult: item.isAdult,
        first_name: item.firstName,
        last_name: item.lastName,
        patronymic: item.patronymic,
        gender: item.gender,
        birthday: dayInLastPosition(item.birthday),
        document_type: isPassport ? "паспорт" : "свидетельство",
        document_data: isPassport
          ? item.passportSeries + item.passportNumber
          : item.birthSertificateNumber,
      },
      seat_number: seatList.backward[i].seatNumber,
      is_child: !item.isAdult,
      include_children_seat: item.includeChild,
    };
  });

  const fullOrderInfo = {
    user: {
      first_name: firstName,
      last_name: lastName,
      patronymic,
      phone,
      email,
      payment_method: paymentMethod,
    },
    departure,
    arrival,
  };

  setAnimation({ loading: true, text: "Ожидание ответа сервера" });
  const response = await order(fullOrderInfo);
  setAnimation({ loading: false });
  return response;
}
