import moment from "moment";

export function verifyData(data) {
  const {
    isAdult,
    firstName,
    lastName,
    patronymic,
    birthday,
    documentType,
    passportSeries,
    passportNumber,
    birthSertificateNumber,
  } = data;

  const result = {
    errorFlags: {},
    errorText: {},
    isReady: true,
  };

  if (!lastName) {
    result.errorFlags.lastName = true;
    if (result.isReady) {
      result.errorText = {
        string1: 'Поле "Фамилия" обязательно для заполнения',
      };
    }
    result.isReady = false;
  }

  if (!firstName) {
    result.errorFlags.firstName = true;
    if (result.isReady) {
      result.errorText = {
        string1: 'Поле "Имя" обязательно для заполнения',
      };
    }
    result.isReady = false;
  }

  if (!patronymic) {
    result.errorFlags.patronymic = true;
    if (result.isReady) {
      result.errorText = {
        string1: 'Поле "Отчество" обязательно для заполнения',
      };
    }
    result.isReady = false;
  }

  if (birthday.length !== 10) {
    result.errorFlags.birthday = true;
    if (result.isReady) {
      result.errorText = {
        string1: "Дата рождения не указана или указана некорректно",
        string2: "Пример (введите только цифры, точки появятся автоматически):",
        string3: "25.05.1975",
      };
    }
    result.isReady = false;
  }

  if (!moment(birthday, "DD.MM.YYYY").isValid()) {
    result.errorFlags.birthday = true;
    if (result.isReady) {
      result.errorText = {
        string1: 'Поле "Дата рождения" содержит несуществующую дату',
      };
    }
    result.isReady = false;
  }

  if (!isAdult && documentType === "Паспорт РФ") {
    result.errorFlags.documentType = true;
    if (result.isReady) {
      result.errorText = {
        string1: "Для проезда ребёнка требуется свидетельство о рождении",
      };
    }
    result.isReady = false;
  }

  if (documentType === "Паспорт РФ") {
    if (passportSeries.length !== 4) {
      result.errorFlags.passportSeries = true;
      if (result.isReady) {
        result.errorText = {
          string1: "Серия паспорта не указана или указана некорректно",
          string2: "Пример:",
          string3: "1234",
        };
      }
      result.isReady = false;
    }

    if (passportNumber.length !== 6) {
      result.errorFlags.passportNumber = true;
      if (result.isReady) {
        result.errorText = {
          string1: "Номер паспорта не указан или указан некорректно",
          string2: "Пример:",
          string3: "123456",
        };
      }
      result.isReady = false;
    }
  } else {
    if (!/^[IVX]{2,4}[А-Я]{2}[0-9]{6}$/.test(birthSertificateNumber)) {
      result.errorFlags.birthSertificateNumber = true;
      if (result.isReady) {
        result.errorText = {
          string1:
            "Номер свидетельства о рождении не указан или указан некорректно",
          string2: "Пример:",
          string3: "VIII ЫП 123456",
        };
      }
      result.isReady = false;
    }
  }

  return result;
}
