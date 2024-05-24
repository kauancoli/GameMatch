import { ForgotPasswordFormValues } from "@dtos/Login/Login";
import { auth } from "@services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import * as Yup from "yup";

export const ForgotPasswordScreen = ({ setPage }) => {
  const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handlePasswordReset = async (values: ForgotPasswordFormValues) => {
    await sendPasswordResetEmail(auth, values.email)
      .then(() => {
        alert("Email para recuperação de senha enviado!");
      })
      .catch((error) => {
        console.error("Failed to send password reset email: ", error);
        alert(error.message);
      });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgotPasswordValidationSchema}
      onSubmit={handlePasswordReset}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
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
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.resetText}>Recuperar senha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setPage("login")}
          >
            <Text style={styles.backText}>Voltar para tela de Login</Text>
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
  resetButton: {
    backgroundColor: "#D31FC1",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    marginTop: 10,
  },
  backText: {
    color: "#D31FC1",
  },
  errorText: {
    color: "red",
  },
});
