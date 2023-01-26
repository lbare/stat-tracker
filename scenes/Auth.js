import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Eye, EyeSlash } from "phosphor-react-native";
import Button from "../components/Button";
import Input from "../components/Input";

const EyeIcon = ({ password }) => {
  return password.showPassword ? (
    <Eye size={32} color='#FFF8DE' />
  ) : (
    <EyeSlash size={32} color='#FFF8DE' />
  );
};

const Auth = ({ styles }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });

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
          value={email}
          textContentType='emailAddress'
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          title='PASSWORD'
          secureTextEntry={!password.showPassword}
          textContentType='password'
          value={password.password}
          onChangeText={(value) =>
            setPassword({ ...password, password: value })
          }
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() =>
            setPassword({ ...password, showPassword: !password.showPassword })
          }
        >
          <EyeIcon password={password} />
        </TouchableOpacity>
        <Button title='Login' onPress={() => console.log("Pressed")} />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}></View>
    </View>
  );
};

export default Auth;
