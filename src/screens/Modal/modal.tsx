import { UserDTO } from "@dtos/User/UserType";
import useAuth from "@hooks/useAuth";
import { db } from "@services/firebase";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GamesScreen } from "./games";

const LabeledInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...props
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      {...props}
    />
  </View>
);

export const ModalScreen = ({ onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [age, setAge] = useState<string>("18");
  const [gender, setGender] = useState<string>("male");
  const [description, setDescription] = useState<string>("");

  const [gamePage, setGamePage] = useState(false);

  const handleGamePage = () => {
    setGamePage(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setName(userData.name || "");
          setImage(userData.photoURL || "");
          setAge(userData.age.toString() || "18");
          setGender(userData.gender || "male");
          setDescription(userData.description || "");
        }
      });

      return unsubscribe;
    };

    fetchUserProfile();
  }, [user]);

  const updateUserProfile = () => {
    if (!image || !age || !gender) return;

    const userProfile: Omit<UserDTO, "games" | "categories"> = {
      id: user.uid,
      name: name,
      photoURL: image,
      description: description,
      age: parseInt(age),
      gender: gender,
    };

    updateDoc(doc(db, "users", user.uid), {
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
      {gamePage ? (
        <GamesScreen setGamePage={setGamePage} />
      ) : (
        <>
          <Image
            source={require("@assets/GameMatch.png")}
            className="w-fit mb-8"
          />

          <LabeledInput
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />
          <LabeledInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholder="Digite sua descrição"
          />
          <LabeledInput
            label="URL da Foto"
            value={image}
            onChangeText={setImage}
            placeholder="Digite a URL da sua foto de perfil"
          />
          <LabeledInput
            label="Idade"
            value={age}
            onChangeText={setAge}
            placeholder="Digite sua idade"
            maxLength={2}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleGamePage}>
            <Text style={styles.text}>Jogos Favoritos</Text>
          </TouchableOpacity>

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

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.text}>Fechar</Text>
          </TouchableOpacity>
        </>
      )}
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
  inputContainer: {
    width: "80%",
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
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
  closeButton: {
    backgroundColor: "#000000",
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
  multiSelectDropdown: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedItemsScroll: {
    maxHeight: 100,
    marginTop: 10,
  },
  selectedItem: {
    backgroundColor: "#eaeaea",
    padding: 5,
    marginVertical: 2,
    borderRadius: 3,
  },
});

export default ModalScreen;
