import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { auth, signInWithEmailAndPassword, db, doc, getDoc } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignupPress = () => {
    navigation.navigate("Register");
  };

  const onLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        getDoc(doc(db, "users", uid)).then((docSnap) => {
          if (docSnap.exists()) {
            const user = docSnap.data();
            navigation.navigate("HomeScene", { user: user });
          } else {
            console.log("No such document");
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View className="flex-1 justify-center bg-white">
      <View className="h-1/4">
        <Text className="text-7xl pb-20 font-black text-center text-blue-500 pt-1">
          Sign In
        </Text>
      </View>
      <View className="h-1/4">
        <TextInput
          className="bg-gray-100 border border-gray-500 mx-10 p-4 rounded-lg"
          title="Email"
          placeholder="Email"
          blurOnSubmit={false}
          secureTextEntry={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(value) => setEmail(value.toString())}
          returnKeyType="next"
        />
        <TextInput
          className="bg-gray-100 border border-gray-500 mx-10 mt-5 p-4 rounded-lg"
          title="Password"
          placeholder="Password"
          blurOnSubmit={true}
          keyboardType="default"
          textContentType="password"
          value={password}
          onChangeText={(value) => setPassword(value.toString())}
          returnKeyType="done"
          onSubmitEditing={onLoginPress}
        />
        <TouchableOpacity
          className="bg-blue-500 mx-10 mt-5 py-5 rounded-lg"
          onPress={onLoginPress}
        >
          <Text className="text-xl text-center text-white">Login</Text>
        </TouchableOpacity>
        <Text
          className="mt-5 text-center text-20 text-blue-900 text-sm"
          onPress={onSignupPress}
          suppressHighlighting={true}
        >
          Don't have an account?{"\n"}SIGN UP
        </Text>
      </View>
    </View>
  );
};

export default Login;
