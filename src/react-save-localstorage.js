import { Component } from 'react';
import PropTypes from 'prop-types';
import { setItem } from './util/localstorage';

class SaveLocalStorage extends Component {
  constructor(props) {
    super(props);

    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    this.saveLocalStorage();
  }

  componentDidUpdate(props) {
    if (this.props.value !== props.value && this.props.sync) {
      this.saveLocalStorage();
    }
  }

  saveLocalStorage() {
    const { lsKey: key, value } = this.props;
    setItem(key, value);
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
