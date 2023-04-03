import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

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
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [home, setHome] = useState(null);
  const [showTeamPicker, setShowTeamPicker] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="justify-center w-full items-center py-16">
        {showTeamPicker ? (
          <View className="w-1/2">
            <Picker
              selectedValue={selectedTeam}
              onValueChange={(value) => {
                setSelectedTeam(value);
                setShowTeamPicker(false);
              }}
            >
              {teams.map((team) => (
                <Picker.Item label={team} value={team} />
              ))}
            </Picker>
          </View>
        ) : (
          <TouchableOpacity
            className="border border-gray-500 rounded-xl w-1/2 h-12 justify-center"
            onPress={() => setShowTeamPicker(!showTeamPicker)}
          >
            <Text className="text-center text-xl">{selectedTeam}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="justify-center items-center h-12 w-1/2 border border-grey-500 rounded-xl">
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate)}
          style={{}}
        />
      </View>
      <View className="justify-center items-center h-12 w-1/2 border border-grey-500 rounded-xl">
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => setTime(selectedDate)}
          style={{}}
        />
      </View>
      <View className="flex-row justify-evenly p-6 w-full">
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
                const datetime = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  time.getHours(),
                  time.getMinutes()
                ).toISOString();
                console.log(opponent, datetime, home);
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
