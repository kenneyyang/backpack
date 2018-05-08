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
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import BpkNavigationStack from './BpkNavigationStack';

describe('BpkNavigationStack', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(<BpkNavigationStack views={[<div />]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should set "aria-hidden" to true on non active views', () => {
    const tree = renderer
      .create(<BpkNavigationStack views={[<div />, <div />, <div />]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should set "tabbable" to true on the last view', () => {
    const tree = shallow(
      <BpkNavigationStack views={[<span />, <span />, <span />]} />,
    );
    const containers = tree.find('TabbableContainer');
    expect(containers.at(0).props().tabbable).toBe(false);
    expect(containers.at(1).props().tabbable).toBe(false);
    expect(containers.at(2).props().tabbable).toBe(true);
  });

  it('should set "autoFocus" to true on the last view, after the first render', () => {
    const tree = shallow(
      <BpkNavigationStack views={[<span />, <span />]} autoFocusNextView />,
    );

    let containers = tree.find('TabbableContainer');
    expect(containers.at(0).props().autoFocus).toBe(false);
    expect(containers.at(1).props().autoFocus).toBe(false);

    tree.setProps({ views: [<span />, <span />, <span />] });

    containers = tree.find('TabbableContainer');
    expect(containers.at(0).props().autoFocus).toBe(false);
    expect(containers.at(1).props().autoFocus).toBe(false);
    expect(containers.at(2).props().autoFocus).toBe(true);
  });
});
