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

import { cssModules } from 'bpk-react-utils';
import React, { Component, Children, type Element } from 'react';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { TransitionGroup, Transition } from 'react-transition-group';

import TabbableContainer from './TabbableContainer';
import { isRTL } from './utils';
import STYLES from './BpkNavigationStack.scss';

const getClassName = cssModules(STYLES);

export type Views = Array<Element<any>>;

export type Props = {
  views: Views,
  className: ?string,
  autoFocusNextView: boolean,
};

class BpkNavigationStack extends Component<Props, {}> {
  firstRender: boolean;

  static defaultProps = {
    className: null,
    autoFocusNextView: false,
  };

  constructor(props: Props) {
    super(props);
    this.firstRender = true;
  }

  componentWillUpdate() {
    this.firstRender = false;
  }

  render() {
    const { views, className, autoFocusNextView, ...rest } = this.props;
    const lastViewIndex = (views || []).length - 1;

    return (
      <div
        className={getClassName('bpk-navigation-stack', className)}
        {...rest}
      >
        <TransitionGroup
          className={getClassName('bpk-navigation-stack__view-track')}
          style={{
            transform: `translateX(${
              lastViewIndex === 0
                ? '0%'
                : `${isRTL() ? '' : '-'}${lastViewIndex}00%`
            })`,
          }}
        >
          {Children.map(views, (view, idx) => (
            <Transition timeout={parseInt(durationSm, 10)}>
              <TabbableContainer
                tabbable={idx === lastViewIndex}
                autoFocus={
                  !this.firstRender &&
                  autoFocusNextView &&
                  idx === lastViewIndex
                }
                aria-hidden={idx !== lastViewIndex}
                className={getClassName('bpk-navigation-stack__view')}
              >
                {view}
              </TabbableContainer>
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default BpkNavigationStack;
