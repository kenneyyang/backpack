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
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

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

  it('should not interfer with non tabbable elements', () => {
    const tree = mount(
      <TabbableContainer tabbable autoFocus={false}>
        <button id="non-tabbable" tabIndex="-1" />
      </TabbableContainer>,
    );

    expect(
      tree
        .getDOMNode()
        .querySelector('#non-tabbable')
        .getAttribute('tabindex'),
    ).toBe('-1');
  });

  it('should focus the first focusable element when `autoFocus` is set to true', () => {
    const tests = [
      [
        <div key="1">
          <input tabIndex="-1" />
          <span />
          <button id="focus-me" />
          <input />
        </div>,
      ],
      [
        <div key="2">
          <input tabIndex="-1" />
          <span id="focus-me" tabIndex="1" /> {/* eslint-disable-line */}
        </div>,
      ],
      [
        <div key="3">
          <input id="focus-me" />
          <span tabIndex="1" /> {/* eslint-disable-line */}
        </div>,
      ],
      [
        <div key="4">
          <a id="focus-me" href="http://skyscanner.net">
            focus
          </a>
          <input />
        </div>,
      ],
    ];

    tests.forEach(test => {
      const tree = mount(
        <TabbableContainer tabbable autoFocus>
          {test}
        </TabbableContainer>,
      );
      const elem = tree.getDOMNode().querySelector('#focus-me');
      jest.runAllTimers();
      expect(document.activeElement).toBe(elem);
    });
  });
});
