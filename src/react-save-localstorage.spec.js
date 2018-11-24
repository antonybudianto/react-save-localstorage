import React from 'react';
import { render, cleanup } from 'react-testing-library';
import SaveLocalStorage from './react-save-localstorage';

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
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
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
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should save data from render - rerender with different value', async () => {
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
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

  it('should save data from render - rerender with different value and sync off', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    const { rerender } = render(
      <SaveLocalStorage sync={false} lsKey="email" value="hello" />
    );
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    rerender(<SaveLocalStorage sync={false} lsKey="email" value="world" />);
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should not save data from render - with empty value', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    render(<SaveLocalStorage lsKey="email" value="" />);
    email = localStorage.getItem('email');
    expect(email).toBe(null);
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
