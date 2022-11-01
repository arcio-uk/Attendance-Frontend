export const authBackendUrl = import.meta.env.VITE_AUTH_BACKEND_URL;

export const attendanceBackendUrl = import.meta.env.VITE_ATTENDANCE_BACKEND_URL;

/**
 * Ints:
 * student: 1
 * guardian: 2
 * teaching-assistant: 4
 * teacher: 8
 * admin: 16
 */
export const statuses = {
  student: 1,
  guardian: 2,
  'teaching assistant': 4,
  lecturer: 8,
  admin: 16,
  loggedIn: 32,
  loggedOut: 64,
};

export const loggedInPages = [
  { name: 'Dashboard', path: '/dashboard/student', int: statuses.student },
  { name: 'Dashboard', path: '/dashboard/guardian', int: statuses.guardian },
  { name: 'Dashboard', path: '/dashboard/teaching-assistant', int: statuses['teaching assistant'] },
  { name: 'Dashboard', path: '/dashboard/lecturer', int: statuses.lecturer },
  { name: 'Dashboard', path: '/dashboard/admin', int: statuses.admin },
];

export const pages = [
  ...loggedInPages,
  { name: 'Timetable', path: '/dashboard/timetable', int: statuses.student + statuses.guardian + statuses.lecturer + statuses['teaching assistant'] },
  { name: 'Statistics', path: '/dashboard/statistics', int: statuses.lecturer + statuses.admin },
  { name: 'Login', path: '/auth/login', int: statuses.loggedOut },
  { name: 'Logout', path: '/auth/logout', int: statuses.loggedIn },
];
