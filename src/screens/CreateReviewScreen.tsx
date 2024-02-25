import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
/* components */
import { IconButton } from "../components/IconButton";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Buttom";
import { addReview } from "../lib/firebase";
import { UserContext } from "../contexts/userContext";
import { Timestamp } from "firebase/firestore";
import { Review } from "../types/review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    const review = {
      user: {
        name: user?.name,
        id: user?.id,
      },
      shop: {
        name: shop.name,
        id: shop.id,
      },
      text: text,
      score: score,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    } as Review;

    await addReview(shop.id, review);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビューを書いてみましょう"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={() => {}} color="#ccc" />
      </View>
      <Button text="レビューを投稿する" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
});
