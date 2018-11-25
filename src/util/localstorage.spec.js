import { getItem, setItem, isLocalStorageReady } from './localstorage';

const localStorageOrig = window.localStorage;

describe('localstorage-util isLocalStorageReady', () => {
  it('should return false if not available', () => {
    delete window.localStorage;
    const res = isLocalStorageReady();
    expect(res).toBeFalsy();
  });

  it('should return true if available', () => {
    window.localStorage = localStorageOrig;
    const res = isLocalStorageReady();
    expect(res).toBeTruthy();
  });
});

describe('localstorage-util getItem', () => {
  it('should handle unavailable localstorage', () => {
    delete window.localStorage;
    const res = getItem('test');
    expect(res).toBeUndefined();
  });

  it('should handle available localstorage', () => {
    window.localStorage = localStorageOrig;
    const res = getItem('test');
    expect(res).toBeNull();
  });
});

describe('localstorage-util setItem', () => {
  it('should handle unavailable localstorage', () => {
    delete window.localStorage;
    setItem('test', 'val');
    const res = getItem('test');
    expect(res).toBeUndefined();
  });

  it('should handle available localstorage', () => {
    window.localStorage = localStorageOrig;
    setItem('test', 'val');
    setTimeout(() => {
      const res = getItem('test');
      expect(res).toBe('val');
    }, 1000);
  });
});
