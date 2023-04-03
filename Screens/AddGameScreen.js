import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddGameScreen = ({ navigation }) => {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [home, setHome] = useState(null);

  return (
    <View className="flex-1 justify-center items-center">
      <TextInput
        className="bg-gray-100 border border-gray-500 mx-10 p-4 rounded-xl w-1/2 text-center"
        title="Opponent"
        placeholder="Opponent"
        blurOnSubmit={false}
        secureTextEntry={false}
        keyboardType="default"
        textContentType="none"
        returnKeyType="next"
        onChangeText={(value) => setOpponent(value)}
      />
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
    </View>
  );
};

export default AddGameScreen;
