import moment from "moment";

export function verifyPhone(phone) {
  return /^\+7\d{10}$/.test(phone);
}

export function verifyEmail(email) {
  return /^[^@]+@([^@.]+\.)+[^@.]+$/.test(email);
}

export function separateBirthdaySertificateNumber(number) {
  return `${number.slice(0, -8)} ${number.slice(-8, -6)} ${number.slice(-6)}`;
}

export function readDate(date1, date2) {
  const result = { status: false };
  const format = "DD.MM.YYYY";

  if (!date1) {
    result.errorText = [
      "Ошибка ввода даты поездки",
      "Поле обязательно для заполнения",
    ];
    return result;
  }

  if (!date2) {
    result.errorText = [
      "Ошибка ввода даты возвращения",
      "Поле обязательно для заполнения",
    ];
    return result;
  }

  if (date1.length !== 10 || !moment(date1, format).isValid()) {
    result.errorText = [
      "Ошибка ввода даты поездки",
      `Значение ${date1} не является корректной датой`,
      "Введите значение в формате ДД.ММ.ГГГГ, где ДД - число, ММ - месяц, ГГГГ - год",
    ];
    return result;
  }

  if (date2.length !== 10 || !moment(date2, format).isValid()) {
    result.errorText = [
      "Ошибка ввода даты возвращения",
      `Значение ${date2} не является корректной датой`,
      "Введите значение в формате ДД.ММ.ГГГГ, где ДД - число, ММ - месяц, ГГГГ - год",
    ];
    return result;
  }

  const minLimit = 1;
  const maxLimit = 90;

  const todayString = moment().format(format);
  const today = moment(todayString, format);
  const minDay = moment(todayString, format).add(minLimit, "days");
  const maxDay = moment(todayString, format).add(maxLimit, "days");

  const moment1 = moment(date1, format);
  const moment2 = moment(date2, format);

  const diff1 = moment1.diff(today, "days");
  const diff2 = moment2.diff(today, "days");

  const outOfRangeText = `Дата должна находиться в диапазоне от ${minDay.format(
    format
  )} до ${maxDay.format(format)}`;

  if (diff1 < minLimit || diff1 > maxLimit) {
    result.errorText = ["Ошибка ввода даты поездки", outOfRangeText];
    return result;
  }

  if (diff2 < minLimit || diff2 > maxLimit) {
    result.errorText = ["Ошибка ввода даты возвращения", outOfRangeText];
    return result;
  }

  if (diff1 >= diff2) {
    result.errorText = [
      "Ошибка ввода дат",
      "Дата возвращения должна быть хотя бы на 1 день позже, чем дата поездки",
    ];
    return result;
  }

  result.date1 = moment1.format("YYYY-MM-DD");
  result.date2 = moment2.format("YYYY-MM-DD");
  result.status = true;
  return result;
}

export function secToDate(sec) {
  return moment(sec * 1000).format("DD.MM.YYYY");
}

export function secToHourMin(sec) {
  return moment(sec * 1000).format("HH:mm");
}

export function durationToHourMin(duration) {
  const sec = +duration;
  let min = Math.trunc(sec / 60) % 60;
  min = (min < 10 ? "0" : "") + min;
  const hour = Math.trunc(sec / 3600);

  return `${hour} : ${min}`;
}

export function durationToHourMinText(duration) {
  const sec = +duration;
  let min = Math.trunc(sec / 60) % 60;
  let hour = Math.trunc(sec / 3600);

  switch (hour % 100) {
    case 11:
    case 12:
    case 13:
    case 14:
      hour += " часов";
      break;
    default:
      switch (hour % 10) {
        case 1:
          hour += " час";
          break;
        case 2:
        case 3:
        case 4:
          hour += " часа";
          break;
        default:
          hour += " часов";
      }
  }

  switch (min) {
    case 11:
    case 12:
    case 13:
    case 14:
      min += " минут";
      break;
    default:
      switch (min % 10) {
        case 1:
          min += " минута";
          break;
        case 2:
        case 3:
        case 4:
          min += " минуты";
          break;
        default:
          min += " минут";
      }
  }

  return { hour, min };
}

export function separateThousands(value) {
  let result = value + "";
  if (result.length > 3) {
    result = result.slice(0, -3) + " " + result.slice(-3);
  }
  return result;
}

export function dayInFirstPosition(date) {
  if (date) {
    return moment(date, "YYYY-MM-DD").format("DD.MM.YYYY");
  } else {
    return "";
  }
}

export function dayInLastPosition(date) {
  if (date) {
    return moment(date, "DD.MM.YYYY").format("YYYY-MM-DD");
  } else {
    return "";
  }
}

export function totalTicketPrice(orderInfo) {
  const { seatList, passengerList } = orderInfo;
  return passengerList.reduce(
    (sum, item, i) =>
      sum +
      (item.isAdult
        ? seatList.forward[i].fullPrice + seatList.backward[i].fullPrice
        : seatList.forward[i].childPrice + seatList.backward[i].childPrice),
    0
  );
}
