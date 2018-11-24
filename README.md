# react-save-localstorage

Save and sync your data on render phase to localStorage safely

> Try it [live at StackBlitz](https://stackblitz.com/edit/demo-react-save-localstorage)

```js
import React, { Component } from 'react';
import SaveLocalStorage from 'react-save-localstorage';

class Home extends Component {
  state = {
    email: ''
  };
  componentDidMount() {
    this.setState({
      email: localStorage.getItem('email') || ''
    });
  }
  render() {
    return (
      <div>
        <input
          value={this.state.email}
          onChange={e =>
            this.setState({
              email: e.target.value
            })
          }
        />
        <SaveLocalStorage lsKey="email" value={this.state.email} />
      </div>
    );
  }
}
```

## Props

- `lsKey` (string)
- `value` (string)
- `sync` (bool)
  To sync after value updates, default is `true`

## License

MIT
