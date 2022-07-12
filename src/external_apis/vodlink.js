const axios = require("axios");
const API_URL = process.env.VODLINK_API_URL;
const API_AUTH_TOKEN = process.env.VODLINK_AUTH_TOKEN;

function makeRequest(url, params) {
  return axios.get(url, {
    params,
    headers: { Authorization: `TOKEN ${API_AUTH_TOKEN}` },
  });
}

export function fetchChampCounts(params) {
  return makeRequest(`${API_URL}/counts/champCounts`, params);
}

export function fetchHomepageData() {
  return makeRequest(`${API_URL}/vodlinks/homepage`);
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
