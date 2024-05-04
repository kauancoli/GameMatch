import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  fullWidth?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const DefaultTheme = {
  backgroundColor: "#fff",
  textColor: "#000",
};

export const ButtonStyles = {
  success: {
    backgroundColor: "#28a745",
  },
  error: {
    backgroundColor: "#dc3545",
  },
  green: {
    backgroundColor: "#20c997",
  },
  blue: {
    backgroundColor: "#007bff",
  },
  black: {
    backgroundColor: "#000",
  },
};

export const Button = ({
  onPress,
  title,
  buttonStyle,
  titleStyle,
  disabled,
  fullWidth,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 4 },
        fullWidth && { width: "100%" },
        disabled ? { backgroundColor: "#ccc" } : { backgroundColor: "#007bff" },
        buttonStyle,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          {
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
