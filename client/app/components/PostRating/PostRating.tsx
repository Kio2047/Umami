import { View, Text } from "react-native";
import styles from "./PostRating.styles";

const PostRating = ({ title, score }: { title: string; score: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.ratingTitle}>{title}</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score.toFixed(1)}</Text>
        <Text style={styles.separator}>/5</Text>
      </View>
    </View>
  );
};

export default PostRating;
