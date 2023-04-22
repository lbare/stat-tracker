import React, { useEffect, useState, useMemo, useContext } from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import HitLocation from "../components/HitLocation";
import Result from "../components/Result";
import Count from "../components/Count";
import Trajectory from "../components/Trajectory";
import Runs from "../components/Runs";
import { UserContext } from "../services/UserContext";
import { addAtBat, getNumberOfAtBatsByGame } from "../services/firebase";

const LogAtBatScreen = ({ navigation }) => {
  const { userGames, setUserGames, currentGame, setCurrentGame } =
    useContext(UserContext);

  const [activePage, setActivePage] = useState(0);
  const [game, setGame] = useState(currentGame);
  const [result, setResult] = useState(null);
  const [count, setCount] = useState({
    balls: 0,
    strikes: 0,
  });
  const [hitLocation, setHitLocation] = useState({ x: 0, y: 0 });
  const [trajectory, setTrajectory] = useState(null);
  const [hardHit, setHardHit] = useState(false);
  const [RBI, setRBI] = useState(0);
  const [runScored, setRunScored] = useState(false);
  const [numAtBat, setNumAtBat] = useState(game.numAtBats);

  useEffect(() => setGame(currentGame), [currentGame]);

  const canProceed = useMemo(() => {
    switch (activePage) {
      case 0:
        return result !== null;
      case 1:
        return true;
      case 2:
        return runScored !== null;
      case 3:
        return hitLocation.y !== 0;
      case 4:
        return trajectory !== null && hardHit !== null;
      default:
        return true;
    }
  }, [activePage, game, result, hitLocation.y, trajectory, hardHit, runScored]);

  const stepCount =
    result === null || result === "BB" || result === "K" || result === "HBP"
      ? 3
      : 5;

  const content = {
    0: <Result result={result} setResult={setResult} />,
    1: <Count count={count} setCount={setCount} />,
    2: (
      <Runs
        runScored={runScored}
        setRunScored={setRunScored}
        RBI={RBI}
        setRBI={setRBI}
      />
    ),
    3: (
      <HitLocation hitLocation={hitLocation} setHitLocation={setHitLocation} />
    ),
    4: (
      <Trajectory
        trajectory={trajectory}
        setTrajectory={setTrajectory}
        hardHit={hardHit}
        setHardHit={setHardHit}
      />
    ),
  };

  const handleStep = (step) => {
    if (step === -1 && activePage === 0) return;
    else if (step === 1 && activePage === stepCount - 1) {
      Alert.alert("Confirm", "Are you sure you want to submit this at-bat?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            handleAddAtBat();
          },
        },
      ]);
    } else setActivePage(activePage + step);
  };

  const clearFields = () => {
    setResult(null);
    setCount({ balls: 0, strikes: 0 });
    setHitLocation({ x: 0, y: 0 });
    setTrajectory(null);
    setHardHit(null);
    setRunScored(null);
    setRBI(0);
  };

  const handleAddAtBat = async () => {
    try {
      const newAtBat = {
        result: result,
        hitLocation: {
          x: hitLocation.x !== 0 ? Math.floor(hitLocation.x) : null,
          y: hitLocation.x !== 0 ? Math.floor(hitLocation.y) : null,
        },
        count: count,
        trajectory: trajectory,
        hardHit: hardHit,
        runScored: runScored,
        RBI: RBI,
        numAtBat: numAtBat,
      };
      await addAtBat(newAtBat, game.id).then(() => {
        setUserGames(
          userGames.map((g) => {
            if (g.id === game.id) {
              g.numAtBats = numAtBat;
              return g;
            } else return g;
          })
        );
        setActivePage(0);
        setNumAtBat(numAtBat + 1);
        clearFields();
        navigation.navigate("Games");
      });
    } catch (error) {
      console.error("Error adding AtBat:", error);
    }
  };

  return (
    <View className="flex flex-col h-full w-full py-5 pb-48">
      <Text className="self-center text-xl font-bold">AB #{numAtBat + 1}</Text>
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
        stepCount={stepCount}
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
          onPress={() => handleStep(-1)}
        >
          <Text className="text-white text-2xl">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 w-1/3 h-16 justify-center items-center rounded-xl"
          onPress={() => handleStep(1)}
          disabled={!canProceed}
        >
          <Text className="text-white text-2xl">
            {activePage === 4 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogAtBatScreen;
