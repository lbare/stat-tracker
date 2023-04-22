import { View, Text } from "react-native";
import { useContext } from "react";
import { UserContext } from "../services/UserContext";

const GameInfoScreen = ({ navigation }) => {
  const { userAtBats, currentGame } = useContext(UserContext);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Game Info Screen</Text>
    </View>
  );
};

export default GameInfoScreen;
