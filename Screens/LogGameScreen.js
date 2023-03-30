import React, { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import HitLocation from "../components/HitLocation";
import Result from "../components/Result";
import Count from "../components/Count";

const LogGame = () => {
  const [activePage, setActivePage] = useState(0);
  const [hitLocation, setHitLocation] = useState({ x: 0, y: 0 });
  const [result, setResult] = useState(null);
  const [count, setCount] = useState({
    balls: 0,
    strikes: 0,
  });

  const handleNext = () => {
    result === "K" || result === "BB" || result === "HBP"
      ? setActivePage(activePage + 2)
      : setActivePage(activePage + 1);
  };
  const handleBack = () => {
    result === "K" || result === "BB" || result === "HBP"
      ? setActivePage(activePage - 2)
      : setActivePage(activePage - 1);
  };

  const handleFinish = () => {
    console.log({
      result: result,
      hitLocation: {
        x: Math.floor(hitLocation.x),
        y: Math.floor(hitLocation.y),
      },
      count: count,
    });
  };

  const content = [
    <Result result={result} setResult={setResult} />,
    <Count count={count} setCount={setCount} />,
    <HitLocation hitLocation={hitLocation} setHitLocation={setHitLocation} />,
  ];

  return (
    <View className="flex flex-col h-full w-full py-5 pb-48">
      <StepIndicator
        customStyles={{
          stepIndicatorSize: 25,
          currentStepIndicatorSize: 30,
          separatorStrokeWidth: 2,
          currentStepStrokeWidth: 3,
          stepStrokeCurrentColor: "#fe7013",
          stepStrokeWidth: 3,
          stepStrokeFinishedColor: "#fe7013",
          stepStrokeUnFinishedColor: "#aaaaaa",
          separatorFinishedColor: "#fe7013",
          separatorUnFinishedColor: "#aaaaaa",
          stepIndicatorFinishedColor: "#fe7013",
          stepIndicatorUnFinishedColor: "#ffffff",
          stepIndicatorCurrentColor: "#ffffff",
          stepIndicatorLabelFontSize: 13,
          currentStepIndicatorLabelFontSize: 13,
          stepIndicatorLabelCurrentColor: "#fe7013",
          stepIndicatorLabelFinishedColor: "#ffffff",
          stepIndicatorLabelUnFinishedColor: "#aaaaaa",
          labelColor: "#999999",
          labelSize: 13,
          currentStepLabelColor: "#fe7013",
        }}
        currentPosition={activePage}
        s
        stepCount={3}
      />
      <View
        className="flex-1 align-items justify-content"
        style={{ overflow: "hidden" }}
      >
        {content[activePage]}
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          className="bg-blue-500 w-1/3 h-16 justify-center items-center rounded-xl"
          onPress={handleBack}
        >
          <Text className="text-white text-2xl">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 w-1/3 h-16 justify-center items-center rounded-xl"
          onPress={activePage === 2 ? handleFinish : handleNext}
          disabled={
            !(
              (activePage === 0 && result !== null) ||
              activePage === 1 ||
              (activePage === 2 && hitLocation.y !== 0)
            )
          }
        >
          <Text className="text-white text-2xl">
            {activePage === 2 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogGame;
