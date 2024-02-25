// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInAnonymously } from "firebase/auth";

import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { Shop } from "../types/shop";
import { initialUser, User } from "../types/user";
import { Review } from "../types/review";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = Constants.expoConfig?.extra?.firebase;
if (!firebaseConfig) {
  console.error(
    "Firebase configuration is not found. Check your app.json or app.config.js",
  );
  // ここでエラーハンドリングや早期リターンを行うなどの処理を追加できます。
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export const getShops = async () => {
  const shopsRef = collection(db, "shops");
  const q = query(shopsRef, orderBy("score", "desc"));
  const querySnapshot = await getDocs(q);
  const shops = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as Shop,
  );

  return shops;
};

//
// const auth = getAuth();
// signInAnonymously(auth)
//   .then(() => {
//     // Signed in..
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });
export const signin = async () => {
  const auth = getAuth();
  const userCredential = await signInAnonymously(auth);
  const { uid } = userCredential.user;
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  // ユーザーが存在する場合はそのデータを返す
  if (userDoc.exists()) {
    return {
      ...userDoc.data(),
      id: uid,
    } as User;
  }
  // ユーザーが存在しない場合は作成する
  await setDoc(userRef, initialUser);
  return {
    ...initialUser,
    id: uid,
  } as User;
};

export const updateUser = async (userId: any, params: any) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, params, { merge: true });
};

export const addReview = async (shopId: any, review: Review) => {
  const shopRef = doc(db, "shops", shopId);
  const reviewRef = collection(shopRef, "reviews");
  await addDoc(reviewRef, review);
};
