const axios = require("axios");
const API_URL = "http://localhost:3001";

function makeRequest(url, params) {
  return axios.get(url, { params });
}

export function fetchChampCounts(params) {
  return makeRequest(`${API_URL}/counts/champCounts`, params);
}

export function fetchVodlinksByFullMatchup(params) {
  return makeRequest(`${API_URL}/vodlinks/matchupSearch`, params);
}

export function fetchTwitchChannels() {
  return makeRequest(`${API_URL}/channels`);
}

export function addChannelInfo(body) {
  return axios.post(`${API_URL}/channels`, body);
}
