# react-save-localstorage

[![npm version](https://badge.fury.io/js/react-save-localstorage.svg)](https://badge.fury.io/js/react-save-localstorage)
[![Build Status](https://travis-ci.org/antonybudianto/react-save-localstorage.svg?branch=master)](https://travis-ci.org/antonybudianto/react-save-localstorage)

<p align="center">
<img src="https://user-images.githubusercontent.com/7658554/48966890-481d8200-f00b-11e8-8d75-9332fe62fac7.png">
</p>

Save and sync your data on render phase to localStorage safely

> Try it [live at StackBlitz](https://stackblitz.com/edit/demo-react-save-localstorage)

```js
import React, { Component } from 'react';
import SaveLocalStorage from 'react-save-localstorage';

class Home extends Component {
  state = {
    email: ''
  };
  render() {
    return (
      <div>
        <SaveLocalStorage value={this.state.email} lsKey="email">
          {value => (
            <div>
              <input
                value={value}
                onChange={e =>
                  this.setState({
                    email: e.target.value
                  })
                }
              />
              <div>Welcome, {value || 'Guest'}</div>
            </div>
          )}
        </SaveLocalStorage>
      </div>
    );
  }
}
```

## Props

- `lsKey` (string, required)
- `value` (string)
- `sync` (bool)

  To sync after value updates, default is `true`

- `children` (func)

  Function that accept loaded `value` from localStorage

## License

MIT
