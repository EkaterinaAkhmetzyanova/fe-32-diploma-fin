import { cities } from "./http";

export async function loadCities(setAnimation, name) {
  setAnimation({ loading: true, text: "Идёт поиск" });
  const response = await cities(name);
  setAnimation({ loading: false });
  return response;
}
