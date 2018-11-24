export function isLocalStorageReady() {
  if (typeof window === 'undefined') {
    return false;
  }
  var test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function setItem(key, value) {
  if (!isLocalStorageReady()) {
    return;
  }
  localStorage.setItem(key, value);
}

export function getItem(key) {
  if (!isLocalStorageReady()) {
    return;
  }
  return localStorage.getItem(key);
}
