import { View, Text, TouchableOpacity, TextInput } from "react-native";

const AddGameScreen = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-row justify-evenly w-full">
        <Text className="text-white text-2xl">Add AB</Text>
      </View>
    </View>
  );
};

export default AddGameScreen;
