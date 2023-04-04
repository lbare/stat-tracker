import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { AuthContext } from "../components/AuthContext";
import { auth } from "../services/firebase";

const Stats = () => {
  const user = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl font-bold">
        Hello, {user !== null ? user.email : "test"}
      </Text>
      <TouchableOpacity
        className="bg-blue-500 rounded-lg p-4 mt-10"
        onPress={handleSignOut}
      >
        <Text className="text-white text-2xl">Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
