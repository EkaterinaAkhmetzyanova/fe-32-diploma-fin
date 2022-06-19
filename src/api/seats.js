function createMapType1(coach) {
  const seatsMap = [];

  for (let i = 0; i < 16; i++) {
    seatsMap.push({
      available: false,
      selected: false,
      isTop: false,
      price: coach.coach.price,
      width: 26,
      height: 58,
      top: 29,
      paddingTop: 34,
    });
  }

  seatsMap[0].left = 134;
  seatsMap[1].left = 194;
  seatsMap[2].left = 223;
  seatsMap[3].left = 283;
  seatsMap[4].left = 312;
  seatsMap[5].left = 373;
  seatsMap[6].left = 402;
  seatsMap[7].left = 462;
  seatsMap[8].left = 491;
  seatsMap[9].left = 552;
  seatsMap[10].left = 581;
  seatsMap[11].left = 641;
  seatsMap[12].left = 670;
  seatsMap[13].left = 731;
  seatsMap[14].left = 760;
  seatsMap[15].left = 820;

  coach.seats.forEach((item) => {
    if (item.available && item.index <= 16) {
      seatsMap[item.index - 1].available = true;
    }
  });

  return seatsMap;
}

function createMapType2(coach) {
  const seatsMap = [];

  for (let i = 0; i < 32; i++) {
    seatsMap.push({
      available: false,
      selected: false,
      isTop: i % 2,
      price: i % 2 ? coach.coach.top_price : coach.coach.bottom_price,
      width: 26,
      height: 29,
      top: i % 2 ? 29 : 58,
      paddingTop: 5,
    });
  }

  seatsMap[0].left = 133;
  seatsMap[1].left = 133;
  seatsMap[2].left = 194;
  seatsMap[3].left = 194;
  seatsMap[4].left = 223;
  seatsMap[5].left = 223;
  seatsMap[6].left = 283;
  seatsMap[7].left = 283;
  seatsMap[8].left = 312;
  seatsMap[9].left = 312;
  seatsMap[10].left = 373;
  seatsMap[11].left = 373;
  seatsMap[12].left = 402;
  seatsMap[13].left = 402;
  seatsMap[14].left = 462;
  seatsMap[15].left = 462;
  seatsMap[16].left = 491;
  seatsMap[17].left = 491;
  seatsMap[18].left = 552;
  seatsMap[19].left = 552;
  seatsMap[20].left = 581;
  seatsMap[21].left = 581;
  seatsMap[22].left = 641;
  seatsMap[23].left = 641;
  seatsMap[24].left = 670;
  seatsMap[25].left = 670;
  seatsMap[26].left = 731;
  seatsMap[27].left = 731;
  seatsMap[28].left = 760;
  seatsMap[29].left = 760;
  seatsMap[30].left = 820;
  seatsMap[31].left = 820;

  coach.seats.forEach((item) => {
    if (item.available && item.index <= 32) {
      seatsMap[item.index - 1].available = true;
    }
  });

  return seatsMap;
}

function createMapType3(coach) {
  const seatsMap = [];

  for (let i = 0; i < 48; i++) {
    seatsMap.push({
      available: false,
      selected: false,
      isTop: i % 2,
      price: i % 2 ? coach.coach.top_price : coach.coach.bottom_price,
      width: i > 31 ? 43 : 26,
      height: i > 31 ? 25 : 31,
      top: i > 31 ? 113 : i % 2 ? 29 : 60,
      paddingTop: i > 31 ? 2 : 5,
    });
  }

  seatsMap[0].left = 133;
  seatsMap[1].left = 133;
  seatsMap[2].left = 194;
  seatsMap[3].left = 194;
  seatsMap[4].left = 223;
  seatsMap[5].left = 223;
  seatsMap[6].left = 283;
  seatsMap[7].left = 283;
  seatsMap[8].left = 312;
  seatsMap[9].left = 312;
  seatsMap[10].left = 373;
  seatsMap[11].left = 373;
  seatsMap[12].left = 402;
  seatsMap[13].left = 402;
  seatsMap[14].left = 462;
  seatsMap[15].left = 462;
  seatsMap[16].left = 491;
  seatsMap[17].left = 491;
  seatsMap[18].left = 552;
  seatsMap[19].left = 552;
  seatsMap[20].left = 581;
  seatsMap[21].left = 581;
  seatsMap[22].left = 641;
  seatsMap[23].left = 641;
  seatsMap[24].left = 670;
  seatsMap[25].left = 670;
  seatsMap[26].left = 731;
  seatsMap[27].left = 731;
  seatsMap[28].left = 760;
  seatsMap[29].left = 760;
  seatsMap[30].left = 820;
  seatsMap[31].left = 820;
  seatsMap[32].left = 133;
  seatsMap[33].left = 176;
  seatsMap[34].left = 223;
  seatsMap[35].left = 266;
  seatsMap[36].left = 312;
  seatsMap[37].left = 355;
  seatsMap[38].left = 402;
  seatsMap[39].left = 445;
  seatsMap[40].left = 491;
  seatsMap[41].left = 534;
  seatsMap[42].left = 581;
  seatsMap[43].left = 624;
  seatsMap[44].left = 670;
  seatsMap[45].left = 713;
  seatsMap[46].left = 760;
  seatsMap[47].left = 803;

  coach.seats.forEach((item) => {
    if (item.available && item.index <= 48) {
      seatsMap[item.index - 1].available = true;
    }
  });

  return seatsMap;
}

function createMapType4(coach) {
  const seatsMap = [];
  for (let i = 0; i < 62; i++) {
    seatsMap.push({
      available: false,
      selected: false,
      isTop: false,
      price: coach.coach.bottom_price,
      width: 26,
      height: 20,
      paddingTop: 0,
    });

    switch (i + 1) {
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
      case 14:
      case 16:
      case 18:
      case 20:
      case 22:
      case 24:
      case 26:
      case 28:
      case 30:
      case 32:
        seatsMap[i].top = 32;
        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 13:
      case 15:
      case 17:
      case 19:
      case 21:
      case 23:
      case 25:
      case 27:
      case 29:
      case 31:
        seatsMap[i].top = 53;
        break;
      case 34:
      case 36:
      case 38:
      case 40:
      case 42:
      case 44:
      case 46:
      case 48:
      case 50:
      case 52:
      case 54:
      case 56:
      case 58:
      case 60:
        seatsMap[i].top = 92;
        break;
      case 33:
      case 35:
      case 37:
      case 39:
      case 41:
      case 43:
      case 45:
      case 47:
      case 49:
      case 51:
      case 53:
      case 55:
      case 57:
      case 59:
      case 61:
      case 62:
        seatsMap[i].top = 113;
        break;
      default:
    }

    switch (i + 1) {
      case 2:
      case 1:
      case 33:
        seatsMap[i].left = 144;
        break;
      case 4:
      case 3:
      case 34:
      case 35:
        seatsMap[i].left = 189;
        break;
      case 6:
      case 5:
      case 36:
      case 37:
        seatsMap[i].left = 233;
        break;
      case 8:
      case 7:
      case 38:
      case 39:
        seatsMap[i].left = 277;
        break;
      case 10:
      case 9:
      case 40:
      case 41:
        seatsMap[i].left = 321;
        break;
      case 12:
      case 11:
      case 42:
      case 43:
        seatsMap[i].left = 365;
        break;
      case 14:
      case 13:
      case 44:
      case 45:
        seatsMap[i].left = 409;
        break;
      case 16:
      case 15:
      case 46:
      case 47:
        seatsMap[i].left = 453;
        break;
      case 18:
      case 17:
      case 48:
      case 49:
        seatsMap[i].left = 497;
        break;
      case 20:
      case 19:
      case 50:
      case 51:
        seatsMap[i].left = 541;
        break;
      case 22:
      case 21:
      case 52:
      case 53:
        seatsMap[i].left = 585;
        break;
      case 24:
      case 23:
      case 54:
      case 55:
        seatsMap[i].left = 629;
        break;
      case 26:
      case 25:
      case 56:
      case 57:
        seatsMap[i].left = 672;
        break;
      case 28:
      case 27:
      case 58:
      case 59:
        seatsMap[i].left = 717;
        break;
      case 30:
      case 29:
      case 60:
      case 61:
        seatsMap[i].left = 761;
        break;
      case 32:
      case 31:
      case 62:
        seatsMap[i].left = 805;
        break;
      default:
    }
  }

  coach.seats.forEach((item) => {
    if (item.available && item.index <= 62) {
      seatsMap[item.index - 1].available = true;
    }
  });

  return seatsMap;
}

export function createSeatsMap(coach) {
  const result = {};
  //имитатор номера вагона (номер вагона отсутствует в данных, полученных от сервера)
  result.index = (coach.coach._id % 15) + 1;

  switch (coach.coach.class_type) {
    case "first":
      result.classNumber = 1;
      result.seatsMap = createMapType1(coach);
      break;
    case "second":
      result.classNumber = 2;
      result.seatsMap = createMapType2(coach);
      break;
    case "third":
      result.classNumber = 3;
      result.seatsMap = createMapType3(coach);
      break;
    default:
      result.classNumber = 4;
      result.seatsMap = createMapType4(coach);
  }

  result.price = coach.coach.price;
  result.topPrice = coach.coach.top_price;
  result.bottomPrice = coach.coach.bottom_price;
  result.haveAirConditioning = coach.coach.have_air_conditioning;
  result.haveWifi = coach.coach.have_wifi;
  result.isLinensIncluded = coach.coach.is_linens_included;
  result.haveFood = coach.coach.have_food;
  result.wifiPrice = coach.coach.wifi_price;
  result.linensPrice = coach.coach.linens_price;
  result.coachId = coach.coach._id;

  return result;
}

export function getAvailableSeatsCount(seatsMap) {
  return seatsMap.reduce(
    (count, item) => (item.available ? count + 1 : count),
    0
  );
}

export function getTopAvailableSeatsCount(seatsMap) {
  return seatsMap.reduce(
    (count, item) => (item.available && item.isTop ? count + 1 : count),
    0
  );
}

export function getBottomAvailableSeatsCount(seatsMap) {
  return seatsMap.reduce(
    (count, item) => (item.available && !item.isTop ? count + 1 : count),
    0
  );
}

export function getPrice(param, coach) {
  const seat = typeof param === "object" ? param : coach.seatsMap[param];

  if (!seat.selected) {
    return 0;
  }

  let price = seat.price;
  if (coach.addWifi) {
    price += coach.wifiPrice;
  }

  if (coach.addLinens) {
    price += coach.linensPrice;
  }

  if (seat.ticketType === "child") {
    price = Math.trunc(price * 0.5);
  }
  return price;
}

export function getSumPrice(coach) {
  return coach.seatsMap.reduce((sum, item) => sum + getPrice(item, coach), 0);
}
