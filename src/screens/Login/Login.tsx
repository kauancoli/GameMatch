import { LoginFormValues } from "@dtos/Login/Login";
import useAuth from "@hooks/useAuth";
import { RegisterScreen } from "@screens/Register/Register";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import { ForgotPasswordScreen } from "./ForgotPassword";

export const LoginScreen = () => {
  const { loading, signIn } = useAuth();

  const [page, setPage] = useState("login");

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Email Invalido").required("Email é obrigatório"),
    password: Yup.string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const handleLogin = async (values: LoginFormValues) => {
    signIn(values.email, values.password);
  };

  return (
    <View style={styles.container}>
      <Image source={require("./GameMatch.png")} className="w-fit mb-8" />

      {page === "login" && (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
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
              <View>
                <Text
                  style={styles.forgotPasswordText}
                  onPress={() => setPage("resetar")}
                >
                  Esqueceu a Senha?
                </Text>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <Button title="Cadastro" onPress={() => setPage("cadastro")} />
            </>
          )}
        </Formik>
      )}

      {page === "cadastro" && <RegisterScreen setPage={setPage} />}

      {page === "resetar" && <ForgotPasswordScreen setPage={setPage} />}
    </View>
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
  loginButton: {
    backgroundColor: "#D31FC1",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPasswordText: {
    marginBottom: 10,
    alignItems: "flex-start",
    color: "#D31FC1",
  },
  errorText: {
    color: "red",
  },
});
