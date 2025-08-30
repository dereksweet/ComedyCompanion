'use strict';

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';

export const SlidingPane = forwardRef(({ children, style }, ref) => {
  useImperativeHandle(ref, () => ({
    warpCenter: () => {},
    warpLeft: () => {},
    warpRight: () => {},
  }));
  return <View style={style}>{children}</View>;
});

export const SlidingPaneWrapper = forwardRef(({ children, style }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const panes = React.Children.toArray(children);

  const apiRef = useRef({
    setActive: (index) => setActiveIndex(index),
    childPanes: [],
  });

  useImperativeHandle(ref, () => apiRef.current);

  // Render all panes so refs exist even for inactive panes (legacy code expects this)
  return <View style={style}>{children}</View>;
});

export default { SlidingPane, SlidingPaneWrapper };


