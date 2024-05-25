import useAuth from "@hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import Header from "@screens/Chat/Components/Header";
import { db } from "@services/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import getMactchedUserInfo from "src/lib/getMatchedUserInfo";

export const Message = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!input) return;
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      name: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  const { matchDetails } = params;

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
    return unsub;
  }, [matchDetails, db]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header
        callEnabled
        title={getMactchedUserInfo(matchDetails?.users, user.uid).name}
      />

      <KeyboardAvoidingView keyboardVerticalOffset={10} className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => {
              if (message.userId === user.uid) {
                return (
                  <View
                    key={message.id}
                    className="bg-purple-600 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-3"
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: "auto",
                    }}
                  >
                    <Text className="font-bold text-white">
                      {message.message}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={message.id}
                    className="bg-red-400 rounded-lg rounded-tl-none px-5 py-3 mx-3 my-3"
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: 55,
                    }}
                  >
                    <Image
                      source={{ uri: message.photoURL }}
                      className="w-12 h-12 rounded-full absolute top-0"
                      style={{ left: -55 }}
                    />
                    <Text className="font-bold text-white">
                      {message.message}
                    </Text>
                  </View>
                );
              }
            }}
          />
        </TouchableWithoutFeedback>
        <View className="flex-row justify-between border-t items-center px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message"
            onSubmitEditing={sendMessage}
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity onPress={sendMessage}>
            <Text className="text-lg">Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
