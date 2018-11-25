import { Component } from 'react';
import PropTypes from 'prop-types';

import { isLocalStorageReady } from './util/localstorage';

class SaveLocalStorage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    this.localStorageReady = isLocalStorageReady();
    let value = this.props.value;
    if (this.localStorageReady) {
      value = localStorage.getItem(this.props.lsKey) || value;
      this.saveLocalStorage({ init: true, value });
    }
  }

  componentDidUpdate(props) {
    if (this.props.value !== props.value && this.props.sync) {
      this.saveLocalStorage({ value: this.props.value });
    }
  }

  saveLocalStorage({ init, value }) {
    const { lsKey: key } = this.props;
    if (init && !value) {
      return;
    }
    if (this.localStorageReady) {
      localStorage.setItem(key, value);
      this.setState({ value: value });
    }
  }

  render() {
    const { children } = this.props;
    if (typeof children === 'function') {
      return children(this.state.value);
    }
    return null;
  }
}

SaveLocalStorage.propTypes = {
  lsKey: PropTypes.string.isRequired,
  value: PropTypes.string,
  sync: PropTypes.bool,
  children: PropTypes.func
};

SaveLocalStorage.defaultProps = {
  sync: true
};

export default SaveLocalStorage;
