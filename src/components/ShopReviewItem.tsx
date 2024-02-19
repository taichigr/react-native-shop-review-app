import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Shop } from "../types/shop";
import { Stars } from "./Stars";

type Props = {
  shop: Shop;
  onPress: () => void;
};
const { width } = Dimensions.get("window");
const COUNTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = COUNTAINER_WIDTH - PADDING * 2;

export const ShopReviewItem: React.FC<Props> = ({ shop, onPress }: Props) => {
  const { name, place, imageUrl, score, description } = shop;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.nameText}>{shop.name}</Text>
      <Text style={styles.placeText}>{shop.place}</Text>
      <Stars score={shop.score} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COUNTAINER_WIDTH,
    padding: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontWeight: "bold",
  },
  placeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
});
