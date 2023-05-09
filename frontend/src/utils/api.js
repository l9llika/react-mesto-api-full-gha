class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
    credentials: "include",
    headers: {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem("token")}`
  }});
    return this._checkResponse(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      headers: {
        ...this._headers,
        authorization: `Bearer ${localStorage.getItem("token")}`
    }});
    return this._checkResponse(response);
  }

  async editProfile(userData) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      credentials: "include",
      body: JSON.stringify(userData),
    });
    return this._checkResponse(response);
  }

  async addCard(cardData) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify(cardData),
    });
    return this._checkResponse(response);
  }

  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`}
    });
    return this._checkResponse(response);
  }

  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`}
    });
    return this._checkResponse(response);
  }

  async changeAvatar({ avatar }) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({ avatar }),
    });
    return this._checkResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("token")}`},
    });
    return this._checkResponse(response);
  }
}

  
export const api = new Api({
  baseUrl: 'https://api.mesto-l9llika.nomoredomains.monster',
  headers: {
    "Content-Type": "application/json",
  },
});

// Authorization: '39a4caee-006a-46b7-a27f-18f6a879f957',
