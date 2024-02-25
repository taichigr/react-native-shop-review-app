import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  // Ensure Constants.platform is defined before accessing its properties
  if (Constants.platform?.ios) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
  // パーミッションの取得
  await getCameraRollPermission();
  // ImagePicker起動
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });

  // Check if the operation was not cancelled and then return the uri
  if (!result.cancelled) {
    // Ensure that 'result' contains an object with a 'uri' property
    return result.uri;
  }
};
