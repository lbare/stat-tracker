import { View, Text, StyleSheet } from "react-native";

const PageIndicator = ({ index, total }) => {
  // create array of length total
  // fill with null values
  // map to jsx
  // set opacity to 0.5 if not selected
  // otherwise 1
  // return <View style={styles.container} />;

  const pages = new Array(total).fill(false);
  const pageIndicators = pages.map((page, pageIndex) => {
    return (
      <View
        key={pageIndex}
        style={{
          ...styles.container,
          ...(pageIndex === index ? styles.active : styles.inactive),
        }}
      />
    );
  });
  return <View style={styles.layout}>{pageIndicators}</View>;
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    justifyContent: "center",
    width: 14,
  },
  container: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  active: {
    opacity: 1,
    backgroundColor: "rgba(53,79,96,0.8)",
  },
  inactive: {
    opacity: 0.5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default PageIndicator;
