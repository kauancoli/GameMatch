import useAuth from "@hooks/useAuth";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Yup from "yup";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen = ({ setPage }) => {
  const { signUp } = useAuth();

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const signUpValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      await signUp(values.email, values.password);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Failed to register user: ", error);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={signUpValidationSchema}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        resetForm,
      }) => (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.signText}>Cadastrar</Text>
          </TouchableOpacity>

          {registrationSuccess && (
            <Text style={styles.successText}>
              Usuário cadastrado com sucesso!
            </Text>
          )}

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => setPage("login")}
          >
            <Text style={styles.signText}>Tela de Login</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  signUpButton: {
    backgroundColor: "#D31FC1",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  signText: {
    color: "#fff",
    fontSize: 16,
  },
  successText: {
    color: "green",
    marginTop: 10,
  },
  errorText: {
    color: "red",
  },
});
