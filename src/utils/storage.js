// src/utils/storage.js

// Key under which all user records are stored
const USERS_KEY = 'users';

/**
 * Retrieve a user by their email.
 * @param {string} email
 * @returns {{ fullName: string, email: string, password: string } | null}
 */
export function getUserByEmail(email) {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return null;
  try {
    const users = JSON.parse(raw);
    return users.find(u => u.email === email) || null;
  } catch {
    return null;
  }
}

/**
 * Save a new user if their email does not already exist.
 * @param {{ fullName: string, email: string, password: string }} user
 */
export function saveUser({ fullName, email, password }) {
  const raw = localStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];
  const exists = users.some(u => u.email === email);
  if (!exists) {
    users.push({ fullName, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

// Helper to build storage keys for user files
function _fileKey(userEmail, filename) {
  return `${userEmail}-${filename}`;
}

/**
 * List all filenames saved by a given user.
 * @param {string} userEmail
 * @returns {string[]}
 */
export function listFilesByUser(userEmail) {
  const keys = Object.keys(localStorage);
  return keys
    .filter(key => key.startsWith(`${userEmail}-`))
    .map(key => key.slice(userEmail.length + 1));
}

/**
 * Save or overwrite a text file for a user.
 * @param {string} userEmail
 * @param {string} filename
 * @param {string} content
 */
export function saveFile(userEmail, filename, content) {
  const key = _fileKey(userEmail, filename);
  localStorage.setItem(key, content);
}

/**
 * Load the content of a user's text file, or '' if not found.
 * @param {string} userEmail
 * @param {string} filename
 * @returns {string}
 */
export function loadFile(userEmail, filename) {
  const key = _fileKey(userEmail, filename);
  return localStorage.getItem(key) || '';
}

/**
 * Delete a user's saved text file.
 * @param {string} userEmail
 * @param {string} filename
 */
export function deleteFile(userEmail, filename) {
  const key = _fileKey(userEmail, filename);
  localStorage.removeItem(key);
}
