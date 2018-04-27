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
import BpkText from 'bpk-component-text';
import BpkButton from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@storybook/react';

import BpkNavigationStack from './index';
import STYLES from './stories.scss';

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
    className={[getClassName('bpk-navigation-stack-view'), className].join(' ')}
    {...rest}
  >
    <BpkText
      tagName="h1"
      textStyle="lg"
      className={getClassName('bpk-navigation-stack-view__title')}
    >
      View {index}
    </BpkText>
    <BpkButton
      onClick={() =>
        navigationController &&
        navigationController.pushView(<View index={index + 1} />)
      }
    >
      Add view
    </BpkButton>
    {index > 1 && (
      <BpkButton
        destructive
        onClick={() => navigationController && navigationController.popView()}
      >
        Remove view
      </BpkButton>
    )}
  </section>
);

View.defaultProps = {
  index: 1,
  navigationController: null,
  className: null,
};

storiesOf('bpk-component-navigation-stack', module).add('Default', () => (
  <BpkNavigationStack
    className={getClassName('bpk-navigation-stack-wrapper')}
    initialViews={[<View />]}
  />
));
