import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import PageIndicator from "./PageIndicator";

const StatCarousel = () => {
  const [index, setIndex] = useState(0);

  const statLine = {
    h: 4,
    bb: 3,
    avg: 0.51,
    obp: 0.695,
    inn: 6,
    ha: 1,
    k: 7,
    bba: 1,
    era: 1,
  };

  const statComponent = [
    <>
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>4</Text>
          <Text style={styles.textSmall}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>3</Text>
          <Text style={styles.textSmall}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.510</Text>
          <Text style={styles.textSmall}>AVG</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.695</Text>
          <Text style={styles.textSmall}>OBP</Text>
        </View>
      </View>
      <View style={styles.div} />
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>6</Text>
          <Text style={styles.textSmall}>INN</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1</Text>
          <Text style={styles.textSmall}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>7</Text>
          <Text style={styles.textSmall}>K</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1</Text>
          <Text style={styles.textSmall}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1.25</Text>
          <Text style={styles.textSmall}>ERA</Text>
        </View>
      </View>
    </>,
    <>
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>12</Text>
          <Text style={styles.textSmall}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>5</Text>
          <Text style={styles.textSmall}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.450</Text>
          <Text style={styles.textSmall}>AVG</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.625</Text>
          <Text style={styles.textSmall}>OBP</Text>
        </View>
      </View>
      <View style={styles.div} />
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>17</Text>
          <Text style={styles.textSmall}>INN</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>8</Text>
          <Text style={styles.textSmall}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>15</Text>
          <Text style={styles.textSmall}>K</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>5</Text>
          <Text style={styles.textSmall}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>2.59</Text>
          <Text style={styles.textSmall}>ERA</Text>
        </View>
      </View>
    </>,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}>Last 3 Games</Text>
      </View>
      <View style={styles.indicator}>
        <PageIndicator index={index} total={2} />
      </View>
      <View style={styles.rect}>
        <Carousel
          loop={false}
          vertical={true}
          pagingEnabled={true}
          autoPlay={true}
          autoPlayInterval={5000}
          height={160}
          style={{
            justifyContent: "center",
            alignContent: "center",
          }}
          data={[...new Array(2).keys()]}
          renderItem={({ index }) => statComponent[index]}
          onSnapToItem={(index) => setIndex(index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: "100%",
  },
  indicator: {
    position: "absolute",
    top: 82,
    left: -15,
    right: 100,
  },
  rect: {
    height: 160,
    backgroundColor: "rgba(53,79,96,0.8)",
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rectText: {
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  div: {
    height: 2,
    backgroundColor: "rgba(53,79,96,0.8)",
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
  },
  textBig: {
    fontFamily: "WorkSans-ExtraBold",
    fontSize: 40,
    color: "#FFCB9F",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
  },
  textSmall: {
    fontFamily: "WorkSans-SemiBold",
    fontSize: 18,
    color: "#FFCB9F",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    bottom: 5,
  },
  labelText: {
    fontFamily: "WorkSans-SemiBoldItalic",
    fontSize: 18,
    color: "#354F60",
  },
  stats: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
});

export default StatCarousel;
