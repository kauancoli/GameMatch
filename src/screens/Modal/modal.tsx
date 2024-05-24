import { UserDTO } from "@dtos/User/UserType";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { db } from "@services/firebase";
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const ModalScreen = ({ onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [age, setAge] = useState<string>("18");
  const [games, setGames] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("male");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setName(userData.name || "");
          setImage(userData.photoURL || "");
          setAge(userData.age.toString() || "18");
          setGames(userData.games || []);
          setGender(userData.gender || "male");
        }
      });

      return unsubscribe;
    };

    fetchUserProfile();
  }, [user]);

  const updateUserProfile = () => {
    if (!image || !age || games.length === 0 || !gender) return;

    const userProfile: UserDTO = {
      id: user.uid,
      name: name,
      photoURL: image,
      games: games,
      age: parseInt(age),
      gender: gender,
    };

    setDoc(doc(db, "users", user.uid), {
      ...userProfile,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        onClose();
      })
      .catch(alert);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "grey" }}>Olá {user?.displayName}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={setImage}
        placeholder="Digite a URL da sua foto de perfil"
      />
      <TextInput
        style={styles.input}
        maxLength={2}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Digite sua idade"
      />
      <TextInput
        style={styles.input}
        value={games.join(",")}
        onChangeText={(text) => setGames(text.split(","))}
        placeholder="Digite seus jogos favoritos separados por vírgula"
      />
      <View style={styles.genderSelector}>
        <Text>Gênero: </Text>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "male" && styles.selectedGenderButton,
          ]}
          onPress={() => setGender("male")}
        >
          <Text>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "female" && styles.selectedGenderButton,
          ]}
          onPress={() => setGender("female")}
        >
          <Text>Feminino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === "non-binary" && styles.selectedGenderButton,
          ]}
          onPress={() => setGender("non-binary")}
        >
          <Text>Não-binário</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={updateUserProfile}>
        <Text style={styles.text}>Atualizar Perfil</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#D31FC1",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  genderSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  genderButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#ffbaf8",
    marginHorizontal: 5,
  },
  selectedGenderButton: {
    backgroundColor: "#f18be7",
  },
});
