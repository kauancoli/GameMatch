import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { DetailProfile } from "@screens/Profile/DetailProfile";
import { db } from "@services/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import ChatList from "./Components/ChatList";
import Header from "./Components/Header";

export const Chat = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [matches, setMatches] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchMatches = async () => {
      const q = query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const matchesData = querySnapshot.docs.map((doc) => doc.data());
        setMatches(matchesData);
      });
      return unsubscribe;
    };
    fetchMatches();
  }, [user]);

  return (
    <View>
      <Header title="Chat" callEnabled={false} />

      {selectedProfile ? (
        <DetailProfile
          data={selectedProfile}
          onBack={() => setSelectedProfile(null)}
        />
      ) : (
        <ChatList data={matches} setSelectedProfile={setSelectedProfile} />
      )}
    </View>
  );
};
