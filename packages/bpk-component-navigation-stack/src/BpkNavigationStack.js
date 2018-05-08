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
import last from 'lodash/takeRight';

import { isRTL } from './utils';
import STYLES from './BpkNavigationStack.scss';

const getClassName = cssModules(STYLES);

export type Views = Array<Element<any>>;

export type Props = {
  views: Views,
  className: ?string,
};

type TransitionDirection = 'forward' | 'backwards';
type StateName = 'idle' | 'animating';

type State = {
  name: StateName,
  direction?: TransitionDirection,
  views: Views,
};

class BpkNavigationStack extends Component<Props, State> {
  firstRender: boolean;

  static defaultProps = {
    className: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'idle',
      direction: undefined,
      views: last(props.views, 1),
    };
  }

  componentWillReceiveProps(newProps: Props) {
    const diff = newProps.views.length - this.props.views.length;
    if (diff !== 0) {
      const direction = diff < 0 ? 'backwards' : 'forward';
      const views = last(diff < 0 ? this.props.views : newProps.views, 2);
      this.transition('animating', { direction, views }, this.onTransitionEnd);
    }
  }

  onTransitionEnd = () => {
    const views = last(this.props.views, 1);
    const next = () => this.transition('idle', { views });
    setTimeout(next, parseInt(durationSm, 10));
  };

  getTransitionDirection() {
    const { direction } = this.state;
    const directions = isRTL() ? ['100%', '-100%'] : ['-100%', '100%'];
    return direction === 'forward' ? directions[0] : directions[1];
  }

  transition(
    name: StateName,
    state: { direction?: TransitionDirection, views: Views },
    onTransitionEnd?: () => void,
  ) {
    this.setState({ name, direction: undefined, ...state }, onTransitionEnd);
  }

  render() {
    const { views, className, ...rest } = this.props;
    const { name: state, direction, views: visibleViews } = this.state;
    const isIdle = state === 'idle';

    return (
      <div
        className={getClassName('bpk-navigation-stack', className)}
        {...rest}
      >
        <div
          className={getClassName(
            'bpk-navigation-stack__view-track',
            !isIdle && 'bpk-navigation-stack__view-track--animating',
          )}
          style={{
            transform: `translateX(${
              isIdle ? '0%' : this.getTransitionDirection()
            })`,
          }}
        >
          {Children.map(visibleViews, view => (
            <div
              className={getClassName(
                'bpk-navigation-stack__view',
                direction && `bpk-navigation-stack__view--${direction}`,
              )}
            >
              {view}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BpkNavigationStack;
