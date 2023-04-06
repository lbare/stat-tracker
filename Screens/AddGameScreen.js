import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { addGame, generateId } from "../services/firebase";
import { UserContext } from "../services/UserContext";

const teams = [
  "Brewers",
  "Giants",
  "Pirates",
  "Red Sox",
  "Reds",
  "Rockies",
  "Royals",
  "White Sox",
];

const AddGameScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(2023, 1, 1, 18));
  const [home, setHome] = useState(null);
  const [location, setLocation] = useState("layritz");
  const [gameType, setGameType] = useState("regular");
  const [showTeamPicker, setShowTeamPicker] = useState(false);
  const [opponent, setOpponent] = useState(teams[0]);

  const { userGames, setUserGames } = useContext(UserContext);

  const handleAddGame = async () => {
    try {
      const newGame = {
        opponent,
        date,
        home,
        location,
        gameType,
      };
      await addGame(newGame, generateId()).then(() => {
        setUserGames([...userGames, newGame]);
      });
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <View className="justify-center w-full items-center">
        {showTeamPicker ? (
          <View className="w-1/2">
            <Picker
              selectedValue={opponent}
              onValueChange={(value) => {
                setOpponent(value);
                setShowTeamPicker(false);
              }}
            >
              {teams.map((team, index) => (
                <Picker.Item label={team} value={team} key={index} />
              ))}
            </Picker>
          </View>
        ) : (
          <View className="pt-16 w-full justify-center items-center pb-6">
            <TouchableOpacity
              className="border border-gray-500 rounded-xl w-1/2 h-12 justify-center"
              onPress={() => setShowTeamPicker(!showTeamPicker)}
            >
              <Text className="text-center text-xl">{opponent}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="flex-row justify-center w-full">
        <View className="justify-center items-center h-12 w-1/3  border-grey-500 rounded-xl">
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate)}
          />
        </View>
        <View className="justify-center items-center h-12 w-1/3  border-grey-500 rounded-xl">
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => setTime(selectedDate)}
          />
        </View>
      </View>
      <View className="flex-row justify-evenly pt-6 w-full">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/4 h-14 justify-center ${
            location === "layritz" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setLocation("layritz")}
        >
          <Text
            className={`text-center text-xl ${
              location === "layritz" ? "text-white" : ""
            }`}
          >
            Layritz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/4 h-14 justify-center ${
            location === "lambrick" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setLocation("lambrick")}
        >
          <Text
            className={`text-center text-xl ${
              location === "lambrick" ? "text-white" : ""
            }`}
          >
            Lambrick
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/4 h-14 justify-center ${
            location === "duncan" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setLocation("duncan")}
        >
          <Text
            className={`text-center text-xl ${
              location === "duncan" ? "text-white" : ""
            }`}
          >
            Duncan
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly py-6 w-full">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/3 h-14 justify-center ${
            home ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setHome(true)}
        >
          <Text className={`text-center text-xl ${home ? "text-white" : ""}`}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/3 h-14 justify-center ${
            home === false ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => setHome(false)}
        >
          <Text
            className={`text-center text-xl ${
              home === false ? "text-white" : ""
            }`}
          >
            Away
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-evenly pb-6 w-full">
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/3 h-14 justify-center ${
            gameType === "exhibition" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => {
            gameType === "exhibition"
              ? setGameType("regular")
              : setGameType("exhibition");
          }}
        >
          <Text
            className={`text-center text-xl ${
              gameType === "exhibition" ? "text-white" : ""
            }`}
          >
            Exhibition
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-gray-100 border border-gray-500 rounded-xl w-1/3 h-14 justify-center ${
            gameType === "playoff" ? "bg-blue-500 border-blue-700" : ""
          }`}
          onPress={() => {
            gameType === "playoff"
              ? setGameType("regular")
              : setGameType("playoff");
          }}
        >
          <Text
            className={`text-center text-xl ${
              gameType === "playoff" ? "text-white" : ""
            }`}
          >
            Playoff
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="border rounded-xl w-1/3 h-14 justify-center bg-blue-500 border-blue-700"
        onPress={() => {
          Alert.alert("Confirm", "Are you sure you want to add this game?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Add",
              onPress: () => {
                handleAddGame();
              },
            },
          ]);
        }}
      >
        <Text className="text-center text-xl text-white">Add Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddGameScreen;
