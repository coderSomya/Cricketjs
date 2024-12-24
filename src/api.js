import axios from 'axios';

const API_BASE_URL = 'https://api.cricapi.com/v1';
const API_KEY = "ee3f515b-6db6-41df-b8bc-01b0596689c7";

const api = axios.create({
  baseURL: API_BASE_URL
});

export async function getMatches() {
  try {
    const response = await api.get('/currentMatches', {
      params: {
        apikey: API_KEY,
        offset: 0
      }
    });
    
    if (response.data.status !== "success") {
      throw new Error(response.data.error || 'API request failed');
    }
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid or missing API key. Please check your CRICKET_API_KEY environment variable.');
    } else if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw error;
  }
}

export async function getLiveScore(matchId) {
  const response = await api.get('/match_info', {
    params: {
      apikey: API_KEY,
      id: matchId
    }
  });
  if (response.data.status !== "success") {
    throw new Error(response.data.error || 'Failed to fetch match info');
  }
  return response.data.data;
}

export async function getScorecard(matchId) {
  // For scorecard we need to check if fantasyEnabled is true
  const matchInfo = await getLiveScore(matchId);
  if (!matchInfo.fantasyEnabled) {
    throw new Error('Detailed scorecard not available for this match');
  }
  
  const response = await api.get('/fantasy_scorecard', {
    params: {
      apikey: API_KEY,
      id: matchId
    }
  });
  if (response.data.status !== "success") {
    throw new Error(response.data.error || 'Failed to fetch scorecard');
  }
  return response.data.data;
}

export async function getCommentary(matchId) {
  const response = await api.get('/match_info', {
    params: {
      apikey: API_KEY,
      id: matchId
    }
  });
  if (response.data.status !== "success") {
    throw new Error(response.data.error || 'Failed to fetch commentary');
  }
  return response.data.data;
}