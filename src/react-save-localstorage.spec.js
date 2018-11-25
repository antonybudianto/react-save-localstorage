import React from 'react';
import { render, cleanup } from 'react-testing-library';

const mockIsLocalStorageReady = jest.fn(() => true);
jest.setMock('./util/localstorage', {
  isLocalStorageReady: mockIsLocalStorageReady
});

const SaveLocalStorage = require('./react-save-localstorage').default;

afterEach(cleanup);
afterEach(() => {
  localStorage.clear();
  localStorage.getItem.mockClear();
  localStorage.setItem.mockClear();
});

describe('SaveLocalStorage', () => {
  it('should save data on render - normal case', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    render(<SaveLocalStorage lsKey="email" value="hello" />);
    email = localStorage.getItem('email');
    expect(email).toBe('hello');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should save data on render - rerender with same value', async () => {
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

  it('should save data on render - rerender with different value', async () => {
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

  it('should save data on render - rerender with different value and sync off', async () => {
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

  it('should not save data on render - with empty value', async () => {
    let email = localStorage.getItem('email');
    expect(email).toBeNull();
    render(<SaveLocalStorage lsKey="email" value="" />);
    email = localStorage.getItem('email');
    expect(email).toBeNull();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should load data on render - with children', () => {
    localStorage.setItem('email', 'test123');
    let email = localStorage.getItem('email');
    expect(email).toBe('test123');
    const { getByText } = render(
      <SaveLocalStorage lsKey="email">
        {val => <span>{val}</span>}
      </SaveLocalStorage>
    );
    getByText('test123');

    /**
     * 1 for setItem('email', 'test123')
     * 1 for cDM
     */
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
  });

  it('should render fine without localStorage support', () => {
    mockIsLocalStorageReady.mockImplementation(() => false);
    render(<SaveLocalStorage lsKey="email" value="nolocal" />);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });

  it('should rerender fine without localStorage support', () => {
    mockIsLocalStorageReady.mockImplementation(() => false);
    const { rerender } = render(
      <SaveLocalStorage lsKey="email" value="nolocal1" />
    );
    rerender(<SaveLocalStorage lsKey="email" value="nolocal2" />);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem).not.toHaveBeenCalled();
  });
});
