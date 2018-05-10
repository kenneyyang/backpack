/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-map.scss';

const getClassName = cssModules(STYLES);

class BpkMapMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClickEvent = callback => event => {
    this.setState({ isOpen: true });
    if (callback) {
      callback(event);
    }
  };

  render() {
    const {
      className,
      title,
      latitude,
      longitude,
      onClick,
      ...rest
    } = this.props;
    const classNames = [getClassName('bpk-map__marker')];

    if (className) {
      classNames.push(className);
    }

    return (
      <Marker
        {...rest}
        className={classNames.join(' ')}
        position={{ lat: latitude, lng: longitude }}
        onClick={this.handleClickEvent(onClick)}
      >
        { this.state.isOpen && title ? (<div>{title}</div>) : null}
      </Marker>);
  }
}

BpkMapMarker.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

BpkMapMarker.defaultProps = {
  className: null,
  title: null,
  onClick: null,
};

export default BpkMapMarker;
