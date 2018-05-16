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

import React from 'react';
import { storiesOf } from '@storybook/react';

import { BpkMap, BpkMapMarker } from './index';

storiesOf('bpk-component-map', module)
  .add('Example', () => (
    <BpkMap zoom={15} centerLatitude={55.944357} centerLongitude={-3.1967116}>
      <BpkMapMarker
        latitude={55.944357}
        longitude={-3.1967116}
        title="Skyscanner"
      />
    </BpkMap>
  ))
  .add('Example 2', () => (
    <BpkMap
      zoom={15}
      zoomControl={false}
      width="600px"
      height={600}
      language="zh-CN"
      centerLatitude={55.944357}
      centerLongitude={-3.1967116}
    >
      <BpkMapMarker
        latitude={55.944357}
        longitude={-3.1967116}
        title="Skyscanner"
      />
    </BpkMap>
  ))
  .add('BoundBox', () => (
    <BpkMap
      boundSouth={40.712216}
      boundWest={-74.226556}
      boundNorth={41.773941}
      boundEast={-74.12544}
    >
      <BpkMapMarker
        latitude={40.944357}
        longitude={-74.1967116}
        title="Skyscanner"
        type="station"
      />
    </BpkMap>
  ));
