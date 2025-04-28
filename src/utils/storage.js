// src/utils/storage.js

// Key under which all user records are stored
const USERS_KEY = 'users';

// Retrieve a user by their email.
export function getUserByEmail(email) {
  const raw = localStorage.getItem(USERS_KEY); // Get the raw user data from localStorage
  if (!raw) return null; // No users stored yet
  try {
    const users = JSON.parse(raw); // Parse the JSON string into an object
    return users.find(u => u.email === email) || null; // Find the user by email or return null if not found
  } catch {
    return null;
  }
}

// Save a new user record, if that email isn’t already taken.
export function saveUser({ fullName, email, password }) {
  const raw = localStorage.getItem(USERS_KEY); // Get the raw user data from localStorage
  const users = raw ? JSON.parse(raw) : []; // Parse the JSON string into an object or initialize an empty array
  const exists = users.some(u => u.email === email); // Check if the user already exists
  if (!exists) { // If the user does not exist, add them to the array
    users.push({ fullName, email, password }); 
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}

// Helper to build the storage key for a given user & filename
function _fileKey(userEmail, filename) {
  return `${userEmail}-${filename}`;
}

// List all filenames saved by a particular user.
export function listFilesByUser(userEmail) {
  const keys = Object.keys(localStorage); // Get all keys from localStorage
  // Filter the keys to find those that belong to the user and start with the user's email and then slice off the email part to get just the filename
  return keys
    .filter(key => key.startsWith(`${userEmail}-`))
    .map(key => key.slice(userEmail.length + 1));
}

// Save or overwrite a text file’s content for a given user.
export function saveFile(userEmail, filename, content, style) {
  const key = _fileKey(userEmail, filename); // Create a unique key for the file using the user's email and filename
  const payload = JSON.stringify({ content, style }); // Convert the content and style to a JSON string
  localStorage.setItem(key, payload); // Save the payload to localStorage under the generated key
}

// Load the content of a user's text file, or '' if not found.
export function loadFile(userEmail, filename) {
  const key = _fileKey(userEmail, filename); // Create a unique key for the file using the user's email and filename
  const raw = localStorage.getItem(key); // Retrieve the content from localStorage using the generated key
  if (!raw) return { content: '', style: null }; // If no content is found, return an empty string and null style
  try {
    const { content, style } = JSON.parse(raw); // Parse the JSON string into an object
    return { content, style }; // Return the content and style from the parsed object
  } catch {
    return { content: raw, style: null }; // If parsing fails, return the raw string as content and null style
  }
}

// Delete a user's saved text file.
export function deleteFile(userEmail, filename) {
  const key = _fileKey(userEmail, filename); // Create a unique key for the file using the user's email and filename
  localStorage.removeItem(key); // Remove the item from localStorage using the generated key
}
