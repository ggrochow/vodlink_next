const axios = require("axios");
const API_URL = process.env.NEXT_PUBLIC_VODLINK_API_URL;
const API_AUTH_TOKEN = process.env.NEXT_PUBLIC_VODLINK_AUTH_TOKEN;
const ADMIN_API_AUTH_TOKEN = process.env.NEXT_PUBLIC_ADMIN_AUTH_TOKEN;

function makeRequest(url, params) {
  return axios.get(url, {
    params,
    headers: { Authorization: `TOKEN ${API_AUTH_TOKEN}` },
  });
}

function makeAdminRequest(url, params) {
  return axios.get(url, {
    params,
    headers: { admin_authorization: `TOKEN ${ADMIN_API_AUTH_TOKEN}` },
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
  return makeAdminRequest(`${API_URL}/admin/channels`);
}

export function addChannelInfo(body) {
  return axios.post(`${API_URL}/admin/channels`, body, {
    headers: { adminAuthorization: `TOKEN ${ADMIN_API_AUTH_TOKEN}` },
  });
}
