import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/auth.json';
import { API_URL as api } from '../config/api.json';

const { tokenUrl } = config;

const authData = {
  client_id: config.tokenClientId,
  client_secret: config.clientSecret,
  audience: config.audience,
  grant_type: config.grantType,
};

const fetchPublicData = async (url, setResponse) => {
  const { data } = await axios.get(url);
  setResponse(data);
};

const fetchProtectedData = async (url, setResponse) => {
  const {
    data: { access_token: token },
  } = await axios.get(`${api}/token`);
  const headers = { Authorization: `Bearer ${token}` };
  const { data } = await axios.get(url, { headers });
  setResponse(data);
};

const useRequest = (url, authed = false) => {
  const [response, setResponse] = useState();

  useEffect(() => {
    authed
      ? fetchProtectedData(url, setResponse)
      : fetchPublicData(url, setResponse);
  }, [authed, fetchProtectedData, fetchPublicData, setResponse]);

  return response;
};

export default useRequest;
