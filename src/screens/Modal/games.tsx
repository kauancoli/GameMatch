import useAuth from "@hooks/useAuth";
import { db } from "@services/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MultiSelect from "react-native-multiple-select";

export const GamesScreen = ({ setGamePage }) => {
  const { user } = useAuth();

  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const fetchGames = async () => {
    try {
      const gamesSnapshot = await getDocs(collection(db, "games"));
      const gamesData = gamesSnapshot.docs.map((doc) => doc.data().name);
      setGames(gamesData);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setSelectedGames(userData.games || []);
          setSelectedCategories(userData.categories || []);
        }
      });
      return unsubscribe;
    };
    fetchUserProfile();
  }, [user]);

  const handleUpdate = () => {
    const gameAndCategories = {
      games: selectedGames,
      categories: selectedCategories,
    };

    updateDoc(doc(db, "users", user.uid), {
      ...gameAndCategories,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        setGamePage(false);
      })
      .catch(alert);
  };

  console.log(selectedGames, selectedCategories);

  return (
    <>
      <Image source={require("@assets/GameMatch.png")} className="w-fit mb-8" />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Jogos Favoritos</Text>
        <MultiSelect
          items={games.map((game) => ({ id: game, name: game }))}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedGames}
          selectedItems={selectedGames}
          selectText="Jogos favoritos"
          searchInputPlaceholderText="Busque seus jogos favoritos..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#000"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#48d22b"
          submitButtonText="Selecionar"
          styleDropdownMenuSubsection={styles.multiSelectDropdown}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categorias Favoritas</Text>
        <MultiSelect
          items={categories.map((cat) => ({ id: cat, name: cat }))}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedCategories}
          selectedItems={selectedCategories}
          selectText="Categorias favoritas"
          searchInputPlaceholderText="Busque suas categorias favoritas..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#000"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#48d22b"
          submitButtonText="Selecionar"
          styleDropdownMenuSubsection={styles.multiSelectDropdown}
        />
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.text}>Atualizar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setGamePage(false)}
      >
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
    </>
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
  updateButton: {
    backgroundColor: "#007BFF",
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
