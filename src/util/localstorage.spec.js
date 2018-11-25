import { isLocalStorageReady } from './localstorage';

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
