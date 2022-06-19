import { subscribe } from "./http";

export async function setSubscribe(setAnimation, email) {
  setAnimation({ loading: true, text: "Ожидание ответа сервера" });
  const response = await subscribe(email);
  setAnimation({ loading: false });
  return response;
}
