import React from "react";
import { ImageBackground } from "react-native";

const BackgroundImage = ({ children, source }) => (
  <ImageBackground
    className="flex-1"
    style={{
      width: "100%",
      height: "100%",
    }}
    resizeMode="cover"
    source={source || require("../assets/bg-full.png")}
  >
    {children}
  </ImageBackground>
);

export default BackgroundImage;
