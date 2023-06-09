import { Text, View } from "react-native";
import React, { useState } from "react";

import styles from "./PasswordRequirementsStyles";

const PasswordRequirements = ({ password }: { password: string }) => {
  const [fulfilledRequirements, setFulfilledRequirements] = useState<{
    numberAdded: Boolean;
    specialAdded: Boolean;
  }>({ numberAdded: false, specialAdded: false });
  return (
    <View>
      <Text
        style={[
          styles.passwordStrengthText
          // { color: showPasswordReqs ? colors.primaryFontColor : "#000000" }
        ]}
      >
        Password must include:
        <Text style={{ color: numberAdded ? "green" : "red" }}>
          {"\n"}• one number
        </Text>
        <Text style={{ color: specialAdded ? "green" : "red" }}>
          {"\n"}• one special character
        </Text>
      </Text>
    </View>
  );
};

export default PasswordRequirements;
