import React from "react";
import { Animated, Dimensions } from "react-native";

const FadeIn = (props) => {
  // animation from right to left :
  const positionLeft = new Animated.Value(Dimensions.get("window").width);
  Animated.spring(positionLeft, {
    toValue: 0,
  }).start();

  return (
    <Animated.View style={{ left: positionLeft }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeIn;
