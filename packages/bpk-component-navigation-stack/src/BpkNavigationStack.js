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
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { TransitionGroup, Transition } from 'react-transition-group';
import React, { Component, cloneElement, Children, type Element } from 'react';

import { isRTL } from './utils';
import STYLES from './BpkNavigationStack.scss';

const getClassName = cssModules(STYLES);

type Props = {
  initialViews: Array<Element<any>>,
  className: ?string,
};

type State = {
  views: Array<Element<any>>,
};

class BpkNavigationStack extends Component<Props, State> {
  static defaultProps = {
    className: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      views: this.props.initialViews,
    };
  }

  pushView(view: Element<any>) {
    this.setState(prevState => {
      const views = prevState.views.slice();
      views.push(view);

      return {
        views,
      };
    });
  }

  popView() {
    this.setState(prevState => {
      const views = prevState.views.slice();
      views.pop();

      return {
        views,
      };
    });
  }

  render() {
    const {
      initialViews, // unused
      className,
      ...rest
    } = this.props;

    const lastViewIndex = this.state.views.length - 1;

    return (
      <div
        className={getClassName('bpk-navigation-stack', className && className)}
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
          {Children.map(this.state.views, view => (
            <Transition timeout={parseInt(durationSm, 10)}>
              <div className={getClassName('bpk-navigation-stack__view')}>
                {cloneElement(view, { navigationController: this })}
              </div>
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default BpkNavigationStack;
