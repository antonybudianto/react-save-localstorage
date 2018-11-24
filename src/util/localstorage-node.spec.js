/**
 * @jest-environment node
 */

import { isLocalStorageReady } from './localstorage';

describe('localstorage-util node isLocalStorageReady', () => {
  it('should works on server', () => {
    const res = isLocalStorageReady();
    expect(res).toBeFalsy();
  });
});
