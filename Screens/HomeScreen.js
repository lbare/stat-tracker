import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { useEffect } from "react";

const HomeScreen = ({ navigation }) => {
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
        <View style={styles.label}>
          <Text style={styles.labelText}>Last 3 Games</Text>
        </View>
        <View style={styles.rect}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 28,
  },
  topBar: {
    alignItems: "center",
    justifyContent: "center",
    height: 182,
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
  },
  content: {
    marginHorizontal: 28,
    marginTop: 20,
  },
  title: {},
  rect: {
    height: 150,
    backgroundColor: "rgba(53,79,96,0.8)",
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
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
  stats: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  textBig: {
    fontFamily: "WS-EB",
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
    fontFamily: "WS-SB",
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
    fontFamily: "WS-SBI",
    fontSize: 18,
    color: "#354F60",
  },
  titleText: {
    fontFamily: "WS-B",
    fontSize: 48,
    fontWeight: "bold",
    color: "#354F60",
    zIndex: 2,
  },
});

export default HomeScreen;
