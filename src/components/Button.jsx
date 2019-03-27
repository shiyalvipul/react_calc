import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { hotkeys } from 'react-keyboard-shortcuts';
import { noop } from '../utils';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.hot_keys = {
      ...(props.hotkey
        ? {
          [props.hotkey]: {
            priority: 1,
            handler: !props.disabled ? props.onClick : noop,
          },
        }
        : {}),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { disabled } = this.props;
    if (disabled !== nextProps.disabled) {
      this.hot_keys = {
        ...(nextProps.hotkey
          ? {
            [nextProps.hotkey]: {
              priority: 1,
              handler: !nextProps.disabled ? nextProps.onClick : noop,
            },
          }
          : {}),
      };
    }
  }

  render() {
    const {
      children, ...rest
    } = this.props;
    return (
      <button
        type="button"
        {...rest}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  hotkey: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: '',
  hotkey: '',
  disabled: false,
  onClick: noop,
};

export default hotkeys(Button);
