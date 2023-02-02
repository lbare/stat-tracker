import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import { styles } from "./styles";
import {
  addDoc,
  auth,
  db,
  collection,
  createUserWithEmailAndPassword,
} from "../../firebase";

export const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("levi.bare@gmail.com");
  const [password, setPassword] = React.useState("password");
  const [confirmPassword, setConfirmPassword] = React.useState("password");

  const onLoginPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
        };
        const userRef = addDoc(collection(db, "users"), data);
        userRef.then(console.log(userRef)).catch((error) => alert(error));
        // userRef
        //   .doc(uid)
        //   .set(data)
        //   .then(() => {
        //     navigation.navigate("Home", { user: data });
        //   })
        //   .catch((error) => {
        //     alert(error);
        //   });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={styles.h1}>Sign In</Text>
      </View>

      {/* Main Content */}
      <View style={styles.middle}>
        <Input
          title='EMAIL'
          keyboardType='email-address'
          value='levi.bare@gmail.com'
          textContentType='emailAddress'
        />
        <Input title='PASSWORD' textContentType='password' value='password' />
        <Input
          title='CONFIRM PASSWORD'
          textContentType='password'
          value='password'
        />
        <Button title='Register' onPress={onRegisterPress} />
        <Button title='Login' onPress={onLoginPress} />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}></View>
    </View>
  );
};
