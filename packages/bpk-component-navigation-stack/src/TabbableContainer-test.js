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
import { mount } from 'enzyme';
import TabbableContainer from './TabbableContainer';

describe('BpkNavigationStack - TabbableContainer', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <TabbableContainer autoFocus={false} tabbable>
          <span />
        </TabbableContainer>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should set `tabindex` to false when tabbable is false', () => {
    const tree = mount(
      <TabbableContainer autoFocus={false} tabbable={false}>
        <span id="focusable" />
      </TabbableContainer>,
    );

    expect(
      tree
        .getDOMNode()
        .querySelector('#focusable')
        .getAttribute('tabindex'),
    ).toBe('-1');
  });

  it('should remove `tabindex` when tabbable is true', () => {
    const tree = mount(
      <TabbableContainer autoFocus={false} tabbable>
        <span id="focusable" />
      </TabbableContainer>,
    );

    expect(
      tree
        .getDOMNode()
        .querySelector('#focusable')
        .getAttribute('tabindex'),
    ).toBeNull();
  });

  it('should return `tabindex` to its previous value', () => {
    const tree = mount(
      <TabbableContainer autoFocus={false} tabbable={false}>
        <span id="focusable" tabIndex="2" /> {/* eslint-disable-line */}
      </TabbableContainer>,
    );

    expect(
      tree
        .getDOMNode()
        .querySelector('#focusable')
        .getAttribute('tabindex'),
    ).toBe('-1');

    tree.setProps({ tabbable: true });

    expect(
      tree
        .getDOMNode()
        .querySelector('#focusable')
        .getAttribute('tabindex'),
    ).toBe('2');
  });

  it('should focus the first focusable element when `autoFocus` is set to true', () => {
    const tree = mount(
      <TabbableContainer tabbable autoFocus>
        <div>
          <input tabIndex="-1" />
          <span />
          <button id="focus-me" />
          <input />
        </div>
      </TabbableContainer>,
    );
    // TODO: not working (it is working actually, just the test isn't)
    const elem = tree.find('#focus-me');

    expect(elem.matchesElement(document.activeElement)).toBe(true);
  });
});
