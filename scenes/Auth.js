import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Eye, EyeSlash } from "phosphor-react-native";

const EyeIcon = ({ password }) => {
  return password.showPassword ? <Eye size={32} /> : <EyeSlash size={32} />;
};

const Auth = ({ styles }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });

  console.log("RENDERED");

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={styles.h1}>Sign In</Text>
      </View>

      {/* Main Content */}
      <View style={styles.middle}>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          value={email}
          textContentType='emailAddress'
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={!password.showPassword}
          textContentType='password'
          value={password.password}
          onChangeText={(value) =>
            setPassword({ ...password, password: value })
          }
        />
        {console.log(password.showPassword)}
        <Text style={styles.p}>Test</Text>
        <TouchableOpacity
          style={styles.Eye}
          onPress={() =>
            setPassword({ ...password, showPassword: !password.showPassword })
          }
        >
          <EyeIcon password={password} />
        </TouchableOpacity>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottom}></View>
    </View>
  );
};

export default Auth;
