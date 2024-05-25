import { UserDTO } from "@dtos/User/UserType";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import useAuth from "@hooks/useAuth";
import { db } from "@services/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import generateID from "src/lib/generateId";

export const Home = () => {
  const { user } = useAuth();
  const swipeRef = useRef();

  const [profiles, setProfiles] = useState([]);
  const [matchModalVisible, setMatchModalVisible] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

  useEffect(() => {
    const checkAndCreateUserProfile = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          id: user.uid,
          name: "Padrão",
          photoURL: "https://example.com/default-photo.jpg",
          description: "Padrão",
          age: 18,
          gender: "male",
          timestamp: serverTimestamp(),
        });
      }
    };

    const fetchProfiles = async () => {
      const passesSnapshot = await getDocs(
        collection(db, "users", user.uid, "passes")
      );
      const passes = passesSnapshot.docs.map((doc) => doc.id);

      const swipesSnapshot = await getDocs(
        collection(db, "users", user.uid, "swipes")
      );
      const swipes = swipesSnapshot.docs.map((doc) => doc.id);

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      const unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );

      return unsub;
    };

    checkAndCreateUserProfile().then(fetchProfiles);
  }, [db, user]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = (await getDoc(doc(db, "users", user.uid))).data();

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          setMatchedUser(userSwiped);
          setMatchModalVisible(true);
        } else {
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <View className="flex-1 justify-center p-4">
      <View>
        <Text className="text-2xl font-bold">Jogadores</Text>
        <Text className="text-sm">Encontre seu duo para a jogatina</Text>
      </View>

      <View className="flex-1 -m-4">
        <Swiper
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
          backgroundColor="#a31a5f"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#D31FC1",
                },
              },
            },
          }}
          animateCardOpacity
          cards={profiles}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card: UserDTO, id) =>
            card ? (
              <View
                key={id}
                style={{
                  position: "relative",
                  height: "75%",
                  borderRadius: 20,
                  backgroundColor: "white",
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 15,
                    position: "absolute",
                    top: 0,
                  }}
                  source={{ uri: card?.photoURL }}
                />
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    backgroundColor: "white",
                    flexDirection: "row",
                    bottom: 0,
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    paddingVertical: 15,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <View className="mt-2">
                    <View className="flex-row">
                      <Text className="text-xl font-bold pr-2">
                        {card?.name},
                      </Text>
                      <Text className="text-xl font-bold">{card?.age}</Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-md">{card?.games[0]}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-center">
                    {card.gender === "male" && (
                      <MaterialCommunityIcons
                        name="gender-male"
                        size={30}
                        color="blue"
                      />
                    )}

                    {card.gender === "female" && (
                      <MaterialCommunityIcons
                        name="gender-female"
                        size={30}
                        color="pink"
                      />
                    )}

                    {card.gender === "non-binary" && (
                      <MaterialCommunityIcons
                        name="gender-non-binary"
                        size={30}
                        color="black"
                      />
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <View
                key={id}
                style={{
                  position: "relative",
                  height: "75%",
                  borderRadius: 20,
                  backgroundColor: "red",
                }}
              >
                <Text>No more Profiles</Text>
                <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={styles.nopeButton}
          >
            <Entypo name="cross" size={25} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={styles.matchButton}
          >
            <AntDesign name="heart" size={25} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      {matchedUser && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={matchModalVisible}
          onRequestClose={() => setMatchModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.matchText}>It's a Match!</Text>
              <Image
                style={styles.matchImage}
                source={{ uri: matchedUser.photoURL }}
              />
              <Text style={styles.matchUserName}>{matchedUser.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMatchModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    right: 0,
    left: 0,
    bottom: 10,
  },
  nopeButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 56,
    height: 56,
    backgroundColor: "#FDDCDC",
  },
  matchButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 56,
    height: 56,
    backgroundColor: "#D4F1D6",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  matchText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  matchImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  matchUserName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#D4F1D6",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
