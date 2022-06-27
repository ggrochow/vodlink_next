const axios = require("axios");
const API_URL = "http://localhost:3001";

function makeRequest(url, params) {
  return axios.get(url, { params });
}

export function fetchRoleCounts(championId) {
  return makeRequest(`${API_URL}/counts/roleCounts`, { championId });
}

export function fetchChampCounts(role) {
  return makeRequest(`${API_URL}/counts/champCounts`, { role });
}

export function fetchEnemyChampCounts(role, championId) {
  return makeRequest(`${API_URL}/counts/enemyChampCounts`, {
    championId,
    role,
  });
}

export function fetchVodlinksByMatchup(role, championId, enemyChampionId) {
  const params = {
    streamerRole: role,
  };
  params[`ally_${role}`] = championId;
  params[`enemy_${role}`] = enemyChampionId;
  return makeRequest(`${API_URL}/vodlinks/matchupSearch`, params);
}

export function fetchTwitchChannels() {
  return makeRequest(`${API_URL}/channels`);
}

export function addChannelInfo(body) {
  return axios.post(`${API_URL}/channels`, {
    body,
  });
}
