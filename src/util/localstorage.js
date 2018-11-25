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
