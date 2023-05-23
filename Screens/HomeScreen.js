import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { useEffect } from "react";
import StatCarousel from "../components/StatCarousel";

const HomeScreen = ({ navigation }) => {
  const statContent = [
    <>
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>4</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>3</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.510</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>AVG</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.695</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>OBP</Text>
        </View>
      </View>
      <View style={styles.divH} />
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>6</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>INN</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>7</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>K</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>1.25</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>ERA</Text>
        </View>
      </View>
    </>,
    <>
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>12</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>5</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.450</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>AVG</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>.625</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>OBP</Text>
        </View>
      </View>
      <View style={styles.divH} />
      <View style={styles.rectText}>
        <View style={styles.stats}>
          <Text style={styles.textBig}>17</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>INN</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>8</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>H</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>15</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>K</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>5</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>BB</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.textBig}>2.59</Text>
          <Text style={{ ...styles.textSmall, bottom: 5 }}>ERA</Text>
        </View>
      </View>
    </>,
  ];

  const gameContent = [
    <View
      style={{
        ...styles.rectText,
        top: 10,
      }}
    >
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Pirates</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>5</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>MON</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Rockies</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>8</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>MON</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>White Sox</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>11</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>MON</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          12 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Giants</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>16</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>MON</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6:30 PM
        </Text>
      </View>
    </View>,
    <View
      style={{
        ...styles.rectText,
        top: 10,
      }}
    >
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Red Sox</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>17</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>SAT</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Brewers</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>21</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>MON</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Royals</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>25</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>THU</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          12 PM
        </Text>
      </View>
      <View style={styles.divV} />
      <View style={styles.stats}>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>Giants</Text>
        <Text style={{ ...styles.textBig, fontSize: 50 }}>31</Text>
        <Text style={{ ...styles.textBig, fontSize: 24 }}>JUN</Text>
        <Text style={{ ...styles.textSmall, fontSize: 16 }}>TUE</Text>
        <Text
          style={{
            ...styles.textSmall,
            fontFamily: "WorkSans-SemiBoldItalic",
            fontSize: 16,
          }}
        >
          6:30 PM
        </Text>
      </View>
    </View>,
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.topBar}>
        <Image
          source={require("../assets/cloud.png")}
          resizeMode="cover"
          style={styles.cloud}
        />
        <Text style={styles.titleText}>StatTracker</Text>
        <View style={styles.progressBar}>
          <ProgressBar percent={25} />
        </View>
      </View>
      <View style={styles.content}>
        <StatCarousel
          content={statContent}
          titles={["Last 3 Games", "This Season"]}
        />
        <StatCarousel content={gameContent} titles={["Upcoming"]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: "center",
    justifyContent: "center",
    height: 182,
  },
  content: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  cloud: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    top: 0,
  },
  progressBar: {
    position: "absolute",
    width: "85%",
    alignItems: "center",
    top: 167,
    zIndex: 1,
    opacity: 0.8,
  },
  titleText: {
    fontFamily: "WorkSans-Bold",
    fontSize: 48,
    fontWeight: "bold",
    color: "#354F60",
    zIndex: 2,
  },
  // content
  stats: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
  },
  rectText: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  rectVertText: {
    justifyContent: "space-evenly",
    alignContent: "center",
    flexDirection: "column",
  },
  divH: {
    height: 2,
    backgroundColor: "rgba(53,79,96,0.8)",
    marginTop: 10,
    marginBottom: 10,
    width: "80%",
    alignSelf: "center",
  },
  divV: {
    height: "80%",
    backgroundColor: "rgba(53,79,96,0.8)",
    marginTop: 10,
    marginBottom: 10,
    width: 2,
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
  },
});

export default HomeScreen;
