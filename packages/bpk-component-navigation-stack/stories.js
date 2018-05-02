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
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@storybook/react';
import BpkNavigationBar, {
  BpkNavigationBarIconButton,
} from 'bpk-component-navigation-bar';
import { withRtlSupport } from 'bpk-component-icon';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import BpkLeftArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import BpkRightArrowIcon from 'bpk-component-icon/sm/long-arrow-right';

import STYLES from './stories.scss';
import BpkNavigationStack from './index';

const LeftArrowIcon = withRtlSupport(BpkLeftArrowIcon);
const RightArrowIcon = withRtlSupport(BpkRightArrowIcon);
const RtlAwareBpkNavigationStack = updateOnDirectionChange(BpkNavigationStack);

const getClassName = cssModules(STYLES);

const View = ({
  index,
  navigationController,
  className,
  ...rest
}: {
  index: number,
  navigationController: ?BpkNavigationStack,
  className: ?string,
}) => (
  <section
    className={getClassName(
      'bpk-navigation-stack-view',
      index % 2 === 0 && 'bpk-navigation-stack-view--alternate',
      className,
    )}
    {...rest}
  >
    <BpkNavigationBar
      id={`my-navigation-bar-${index}`}
      title={`View ${index}`}
      leadingButton={
        index > 1 ? (
          <BpkNavigationBarIconButton
            onClick={() =>
              navigationController && navigationController.popView()
            }
            icon={LeftArrowIcon}
            label="Back"
          />
        ) : null
      }
      trailingButton={
        <BpkNavigationBarIconButton
          onClick={() =>
            navigationController &&
            navigationController.pushView(<View index={index + 1} />)
          }
          icon={RightArrowIcon}
          label="Next"
        />
      }
    />
  </section>
);

View.defaultProps = {
  index: 1,
  navigationController: null,
  className: null,
};

storiesOf('bpk-component-navigation-stack', module).add('Default', () => (
  <RtlAwareBpkNavigationStack
    className={getClassName('bpk-navigation-stack-wrapper')}
    initialViews={[<View />]}
  />
));
