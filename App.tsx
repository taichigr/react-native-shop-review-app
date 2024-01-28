import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// import "firebase/firestore";
import { useEffect, useState } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChklx-HgKKthaOhhrIRYfTv7IrkWrHEV4",
  authDomain: "shop-review-23558.firebaseapp.com",
  projectId: "shop-review-23558",
  storageBucket: "shop-review-23558.appspot.com",
  messagingSenderId: "106940039434",
  appId: "1:106940039434:web:eddbb5fa1e5b42a1bb7af3",
  measurementId: "G-JD5RLYKZXG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

type Shop = {
  name: string;
  place: string;
};

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    console.log("fetch data");
    const querySnapshot = await getDocs(collection(db, "shops"));
    const shops = querySnapshot.docs.map((doc) => doc.data() as Shop);
    console.log(shops);
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => {
    return (
      <View style={{ margin: 10 }} key={index.toString()}>
        <Text>shop</Text>
        <Text>{shop.name}</Text>
        <Text>{shop.place}</Text>
      </View>
    );
  });

  return <View style={styles.container}>{shopItems}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
