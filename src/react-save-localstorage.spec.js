import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SaveLocalStorage from './react-save-localstorage';

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: jest.fn(function(key, value) {
      store[key] = value.toString();
    }),
    removeItem: function(key) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

afterEach(cleanup);
afterEach(() => {
  localStorage.clear();
  localStorage.setItem.mockClear();
});

describe('SaveLocalStorage', () => {
  it('should save data from render - normal case', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    render(<SaveLocalStorage lsKey="email" value="hello" />);
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  it('should save data from render - rerender with same value', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    const { rerender } = render(
      <SaveLocalStorage lsKey="email" value="hello" />
    );
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    rerender(<SaveLocalStorage lsKey="email" value="hello" />);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
  });

  it('should save data from render - rerender with same value', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    const { rerender } = render(
      <SaveLocalStorage lsKey="email" value="hello" />
    );
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    rerender(<SaveLocalStorage lsKey="email" value="world" />);
    email = localStorage.getItem('email');
    expect(email).toBe('world');
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
  });

  it('should not save data from render - with empty value', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    render(<SaveLocalStorage lsKey="email" value="" />);
    email = localStorage.getItem('email');
    expect(email).toBe(null);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
  });
});
