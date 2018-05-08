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

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { durationSm } from 'bpk-tokens/tokens/base.es6';

const FUCUSABLE_SELECTOR =
  'button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"]), textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

type Props = {
  tabbable: boolean,
  children: Node,
  autoFocus: boolean,
};

export default class TabbableContainer extends Component<Props, {}> {
  containerRef: any;

  static propTypes = {
    tabbable: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    autoFocus: PropTypes.bool.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.containerRef = null;
  }

  componentDidMount() {
    this.updateTabIndex(this.props.tabbable);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.tabbable !== prevProps.tabbable) {
      this.updateTabIndex(this.props.tabbable);
    }
  }

  updateTabIndex(tabbable: boolean) {
    if (this.containerRef) {
      this.containerRef.querySelectorAll('*').forEach(elem => {
        const tabIndex = elem.getAttribute('tabindex');
        if (!tabbable) {
          elem.setAttribute('data-bpkprevtabindex', tabIndex);
          elem.setAttribute('tabindex', -1);
        } else {
          const prevTabIndex = elem.getAttribute('data-bpkprevtabindex');
          const touched = elem.hasAttribute('data-bpkprevtabindex');
          const hasPrevIndex = prevTabIndex != null && prevTabIndex !== 'null';
          if (!hasPrevIndex && touched) {
            elem.removeAttribute('tabindex');
          } else if (hasPrevIndex) {
            elem.setAttribute('tabindex', prevTabIndex);
          }
        }
      });

      if (this.props.autoFocus) {
        const firstFocusable = this.containerRef.querySelector(
          FUCUSABLE_SELECTOR,
        );
        if (firstFocusable) {
          setTimeout(() => firstFocusable.focus(), parseInt(durationSm, 10));
        }
      }
    }
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <div
        ref={ref => {
          this.containerRef = ref;
        }}
        {...omit(rest, 'tabbable', 'autoFocus')}
      >
        {children}
      </div>
    );
  }
}
