import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import PageIndicator from "./PageIndicator";

const StatCarousel = ({ content, titles }) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{titles[index] || titles[0]}</Text>
      </View>

      <View style={styles.rect}>
        <Carousel
          loop={false}
          vertical={false}
          pagingEnabled={true}
          autoPlayInterval={5000}
          height={160}
          width={354}
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
          data={[...new Array(2).keys()]}
          renderItem={({ index }) => content[index]}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
      <View style={styles.indicator}>
        <PageIndicator index={index} total={2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
  },
  indicator: {
    alignSelf: "center",
    marginTop: 6,
  },
  rect: {
    height: 160,
    backgroundColor: "rgba(53,79,96,0.8)",
    borderRadius: 15,
    flexDirection: "column",
  },

  labelText: {
    fontFamily: "WorkSans-SemiBoldItalic",
    fontSize: 18,
    color: "#354F60",
  },
});

export default StatCarousel;
