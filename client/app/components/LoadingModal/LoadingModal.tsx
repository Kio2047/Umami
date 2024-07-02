import Modal from "react-native-modal";
import { View, Text, ActivityIndicator } from "react-native";

import styles from "./LoadingModalStyles";

const LoadingModal = ({
  isVisible,
  text
}: {
  isVisible: boolean;
  text: string;
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      statusBarTranslucent={true}
      // coverScreen={true}
    >
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.modalText}>{text}</Text>
      </View>
    </Modal>
  );
};

export default LoadingModal;
