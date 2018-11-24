import { Component } from 'react';
import PropTypes from 'prop-types';

class SaveLocalStorage extends Component {
  constructor(props) {
    super(props);

    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    this.saveLocalStorage({ init: true });
  }

  componentDidUpdate(props) {
    if (this.props.value !== props.value && this.props.sync) {
      this.saveLocalStorage({});
    }
  }

  saveLocalStorage({ init }) {
    const { lsKey: key, value } = this.props;
    if (init && value === '') {
      return;
    }
    localStorage.setItem(key, value);
  }

  render() {
    return null;
  }
}

SaveLocalStorage.propTypes = {
  lsKey: PropTypes.string,
  value: PropTypes.string,
  sync: PropTypes.bool
};

SaveLocalStorage.defaultProps = {
  sync: true
};

export default SaveLocalStorage;
