import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { useEffect } from "react";
import StatCarousel from "../components/StatCarousel";

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
        <StatCarousel />
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
    marginHorizontal: 28,
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
});

export default HomeScreen;
