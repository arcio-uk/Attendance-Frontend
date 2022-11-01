import axios from 'axios';
import { attendanceBackendUrl, authBackendUrl } from '@/misc/Constants';
import { getAccessToken } from './LocalStorage';

export const getNonce = async () => {
  const response = await axios.get(`${attendanceBackendUrl}/get-nonce`);
  if (!response) return new Error('Error, no response given');
  if ('error' in response) return new Error(response);
  return response.data.nonce;
};

const getHeaders = async () => {
  const nonce = await getNonce();
  const accessToken = await getAccessToken();

  return {
    Nonce: nonce,
    Authorization: `Bearer ${accessToken}`,
  };
};

export const registerUser = (firstname, surname, email, password, studentId) => axios.post(`${authBackendUrl}/register`, {
  firstname,
  surname,
  email,
  password,
  'student-id': studentId,
});

export const loginUser = (email, password) => axios.post(`${authBackendUrl}/login`, {
  email,
  password,
});

export const getCalendarLink = async () => {
  try {
    const nonce = await getNonce();
    const accessToken = await getAccessToken();
    const request = await axios.get(
      `${attendanceBackendUrl}/timetable/get-timetable-jwt`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Nonce: nonce,
        },
      },
    );
    if ('ical-jwt' in request.data) {
      return `${attendanceBackendUrl}/timetable/ical?ical-auth=${request.data['ical-jwt']}`;
    }
    throw new Error('No ical-jwt returned in request for it :(');
  } catch (error) {
    console.error('Error getting timetable JWT');
    console.error(error);
    return new Error(error);
  }
};

export const getUserModules = async () => {
  try {
    const nonce = await getNonce();
    const accessToken = await getAccessToken();
    return axios.get(`${attendanceBackendUrl}/user/get-modules`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Nonce: nonce,
      },
    });
  } catch (error) {
    console.error('Error getting users');
    console.error(error);
    return new Error(error);
  }
};

// Get the students in a certain module
export const getModuleUsers = async (moduleId) => {
  try {
    const nonce = await getNonce();
    const accessToken = await getAccessToken();
    return axios.get(
      `${attendanceBackendUrl}/module/get-users?moduleId=${moduleId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Nonce: nonce,
        },
      },
    );
  } catch (error) {
    console.error('Error getting users');
    console.error(error);
    return new Error(error);
  }
};

export const getUpcomingLessons = async () => {
  const nonce = await getNonce();
  const accessToken = await getAccessToken();

  return axios.get(`${attendanceBackendUrl}/timetable/upcoming-lessons`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Nonce: nonce,
    },
  });
};

export const sendUsersEmails = async (userIDs, message = undefined) => {
  const nonce = await getNonce();
  const accessToken = await getAccessToken();
  // TODO: make this return something nicer
  return axios.post(`${attendanceBackendUrl}/send-emails`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Nonce: nonce,
    },
  });
};

export const createNewModule = async (moduleName, moduleTag) => {
  const headers = await getHeaders();
  const postData = {
    name: moduleName,
    'external-id': moduleTag,
  };
  return axios.post(`${attendanceBackendUrl}/module/add`, postData, {
    headers,
  });
};

export const addUserToModule = async (userId, moduleId) => {
  const headers = await getHeaders();
  const postData = {
    'user-id': userId,
    'module-id': moduleId,
  };
  return axios.post(`${attendanceBackendUrl}/module/add-user`, postData, {
    headers,
  });
};

// Takes in an array of userIds
export const addUsersToModule = async (usersId, moduleId) => {
  const headers = await getHeaders();
  const postData = {
    'user-ids': usersId,
    'module-id': moduleId,
  };
  return axios.post(`${attendanceBackendUrl}/module/add-users`, postData, {
    headers,
  });
};

export const addUsersToModuleGroup = async (usersId, moduleGroupId) => {
  const headers = await getHeaders();
  const postData = {
    'user-ids': usersId,
    'module-group-id': moduleGroupId,
  };
  return axios.post(`${attendanceBackendUrl}/module/group/add-users`, postData, {
    headers,
  });
};

export const createNewModuleGroup = async (moduleGroupName, moduleId) => {
  const headers = await getHeaders();
  const postData = {
    name: moduleGroupName,
    'module-id': moduleId,
  };
  return axios.post(`${attendanceBackendUrl}/module/group/add`, postData, {
    headers,
  });
};

export const getAllUsers = async () => {
  const headers = await getHeaders();
  return axios.get(`${attendanceBackendUrl}/user/get`, { headers });
};

export const getAllModules = async () => {
  const headers = await getHeaders();
  return axios.get(`${attendanceBackendUrl}/module/get`, { headers });
};

export const getModuleGroups = async (moduleId) => {
  const headers = await getHeaders();
  return axios.get(
    `${attendanceBackendUrl}/module/group/get?moduleId=${moduleId}`,
    { headers },
  );
};

export const getModuleGroupStudents = async (moduleGroupId) => {
  const headers = await getHeaders();
  return axios.get(
    `${attendanceBackendUrl}/module/group/users?moduleGroupId=${moduleGroupId}`,
    { headers },
  );
};

export const markAttendance = async (lessonId) => {
  const headers = await getHeaders();
  const response = await axios.post(
    `${attendanceBackendUrl}/attendance/mark`,
    {
      'lesson-id': lessonId,
    },
    { headers },
  );
  return response.data;
};

/**
 *
 * @param {string} lessonId
 * @returns {Promise<{
 *   user: {
 *     id: string,
 *     firstname: string,
 *     surname: string
 *   },
 *   register-time: string,
 *   attendance-key: string
 * }[]>}
 */
export const getBulkAttendance = async (lessonId) => {
  const headers = await getHeaders();
  const response = await axios.get(
    `${attendanceBackendUrl}/attendance/lesson/actual?lesson-id=${lessonId}`,
    {
      headers,
    },
  );
  return response.data;
};

/**
 *
 * @param {string} lessonId
 * @param {
 *    "lesson-id": string,
 *    "users-attendance":
 *        {
 *            "user-id": string,
 *            "attendance-key": string
 *        }[]
 *    } attendance the new attendance records
 */
export const postBulkAttendance = async (lessonId, attendance) => {
  const headers = await getHeaders();
  const response = await axios.post(
    `${attendanceBackendUrl}/attendance/lesson/actual`,
    {
      'lesson-id': lessonId,
      'users-attendance': attendance,
    },
    { headers },
  );
  return response.data;
};
