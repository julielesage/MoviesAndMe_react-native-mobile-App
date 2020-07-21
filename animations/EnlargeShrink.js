import React from "react";
import { Animated } from "react-native";

const EnlargeShrink = (props) => {
  const _getSize = () => {
    if (props.shouldEnlarge) return 80;
    else return 40;
  };

  const viewSize = new Animated.Value(_getSize());
  console.log(viewSize, props.shouldEnlarge);

  Animated.spring(viewSize, {
    toValue: _getSize(),
  }).start();

  return (
    <Animated.View style={{ width: viewSize, height: viewSize }}>
      {props.children}
    </Animated.View>
  );
};

export default EnlargeShrink;
