async function fetchData(url, opt) {
  try {
    return await fetch(url, opt);
  } catch (err) {
    return {
      ok: false,
      status: "",
      statusText: "No Connect",
    };
  }
}

export async function cities(name) {
  const url = `${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/routes/cities?name=${name}`;
  const response = await fetchData(url);
  return response;
}

export async function routes(params) {
  const url = new URL(`${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/routes`);
  Object.entries(params).forEach((item) =>
    url.searchParams.append(item[0], item[1])
  );
  const response = await fetchData(url);
  return response;
}

export async function last() {
  const url = `${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/routes/last`;
  const response = await fetchData(url);
  return response;
}

export async function seats(trainId, params) {
  const url = new URL(
    `${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/routes/${trainId}/seats`
  );
  Object.entries(params).forEach((item) =>
    url.searchParams.append(item[0], item[1])
  );
  const response = await fetchData(url);
  return response;
}

export async function order(info) {
  const url = `${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/order`;
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(info),
  };
  const response = await fetchData(url, opt);
  return response;
}

export async function subscribe(email) {
  const url = `${process.env.REACT_APP_TRAIN_BOOKING_SERVER}/subscribe`;
  const opt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  };
  const response = await fetchData(url, opt);
  return response;
}
