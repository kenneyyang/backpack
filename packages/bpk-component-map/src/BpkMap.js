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
/* global google */

import React from 'react';
import PropTypes from 'prop-types';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Rectangle,
} from 'react-google-maps';
import { cssModules } from 'bpk-react-utils';
import STYLES from './bpk-map.scss';

const getClassName = cssModules(STYLES);

const BpkMap = props => {
  const { children, ...rest } = props;
  const InnerMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        ref={map =>
          map &&
          props.boundSouth &&
          props.boundWest &&
          props.boundNorth &&
          props.boundEast &&
          // map.fitBounds(
          //   { lat: props.boundSouth, lng: props.boundWest },
          //   { lat: props.boundNorth, lng: props.boundEast },
          // )
          map.fitBounds(
            new google.maps.LatLngBounds(
              new google.maps.LatLng(props.boundSouth, props.boundWest),
              new google.maps.LatLng(props.boundNorth, props.boundEast),
            ),
          )
        }
        defaultZoom={props.zoom}
        defaultCenter={{
          lat: props.centerLatitude,
          lng: props.centerLongitude,
        }}
        options={{
          zoomControl: props.zoomControl,
          draggable: props.draggable,
        }}
        {...rest}
      >
        <Rectangle
          defaultBounds={
            new google.maps.LatLngBounds(
              new google.maps.LatLng(props.boundSouth, props.boundWest),
              new google.maps.LatLng(props.boundNorth, props.boundEast),
            )
          }
        />
        {children}
      </GoogleMap>
    )),
  );

  return (
    <InnerMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBjeijuDttvvujmN_XZB9304o3lPn6WGDM&v=3.exp
      &libraries=geometry,drawing,places
      &language=${props.language}`}
      loadingElement={<div>Loading</div>}
      mapElement={<div style={{ width: props.width, height: props.height }} />}
      containerElement={<div className={getClassName('bpk-map__container')} />}
    />
  );
};

BpkMap.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
  zoomControl: PropTypes.bool,
  draggable: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  boundSouth: PropTypes.number,
  boundWest: PropTypes.number,
  boundNorth: PropTypes.number,
  boundEast: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  centerLatitude: PropTypes.number.isRequired,
  centerLongitude: PropTypes.number.isRequired,
};

BpkMap.defaultProps = {
  children: null,
  draggable: true,
  zoomControl: true,
  boundSouth: null,
  boundWest: null,
  boundNorth: null,
  boundEast: null,
  language: '',
  width: '100%',
  height: '100%',
};

export default BpkMap;