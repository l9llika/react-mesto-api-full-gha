// export const BASE_URL = "http://api.mesto-l9llika.nomoredomains.monster";
export const BASE_URL = "http://localhost:3000";

function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`)
  }
  return response.json();
}

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      return checkResponse(res);
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    });
}

export const authorize = (data) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return checkResponse(res);
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    });
}

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await checkResponse(response);
  return data;
};