/**
 * A file to handle tokens
 */

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { authBackendUrl } from '@/misc/Constants';

/**
 * Sets the login tokens
 *
 * @param {String} access
 * @param {String} refresh
 */
export const setTokens = (access, refresh) => {
  localStorage.setItem('ACCESS', access);
  localStorage.setItem('REFRESH', refresh);
};

export const resetTokens = () => {
  localStorage.removeItem('ACCESS');
  localStorage.removeItem('REFRESH');
};

export const getRefreshToken = () => localStorage.getItem('REFRESH');

export const refreshAccessToken = () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('Invalid Refresh Token');
  return axios.post(`${authBackendUrl}/refresh`, {
    refresh: refreshToken,
  });
};

/**
 * This method will check if the current access token is valid and within date.
 * It will also check all other edge cases.
 *
 * Invalid refresh token, experied access token, invalid access token
 * @returns accessToken
 */
export const getAccessToken = async () => {
  try {
    const accessTokenDecoded = jwt_decode(localStorage.getItem('ACCESS'));

    if (!accessTokenDecoded) {
      throw new Error('Invalid Access Token');
    }
    // Expired access token
    if (accessTokenDecoded.expiry_date < new Date().getTime() / 1000) {
      try {
        const response = await refreshAccessToken();
        localStorage.setItem('ACCESS', response.data.access);
        return response.data.access;
      } catch (e) {
        return e;
      }
    } else {
      return localStorage.getItem('ACCESS');
    }
  } catch (error) {
    try {
      const response = await refreshAccessToken();
      localStorage.setItem('ACCESS', response.data.access);
      return response.data.access;
    } catch (e) {
      return e;
    }
  }
};

export const getDecodedAccessToken = async () => {
  try {
    const accessToken = await getAccessToken();
    return jwt_decode(accessToken);
  } catch (error) {
    error.error = true;
    return error;
  }
};

export const setRoles = (roles) => {
  localStorage.setItem('Roles', JSON.stringify(roles));
};

export const getRoles = () => JSON.parse(localStorage.getItem('Roles'));
