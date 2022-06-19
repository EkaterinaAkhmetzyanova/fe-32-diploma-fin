export function infoBox(setPopup, content, buttonText = "OK") {
  setPopup({
    visible: true,
    buttonText,
    content: Array.isArray(content) ? content : [content],
    error: false,
  });
  return;
}

export function errorBox(setPopup, content, buttonText = "OK") {
  setPopup({
    visible: true,
    buttonText,
    content: Array.isArray(content) ? content : [content],
    error: true,
  });
  return;
}

export function httpErrorBox(setPopup, response) {
  errorBox(setPopup, [
    `Ошибка ${response.status} - ${response.statusText}`,
    "Проверьте интернет-соединение и повторите попытку",
  ]);
}

export function incorrectDataErrorBox(setPopup) {
  errorBox(setPopup, [
    "Ошибка загрузки данных",
    "Проверьте интернет-соединение и повторите попытку",
  ]);
}
