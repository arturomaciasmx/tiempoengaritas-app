import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

interface Props {
  author: string;
  body: string;
  created_at?: string;
}

const CommentCard = (props: Props) => {
  let timeago = null;
  if (props.created_at) {
    timeago = moment.utc(props.created_at).local().startOf("seconds").fromNow();
  }
  console.log(timeago);
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}></View>
      <View style={styles.commentBlock}>
        <Text style={styles.authorName}>{props.author}</Text>
        <Text style={styles.timeAgo}>{timeago}</Text>
        <Text style={styles.commentBody}>{props.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#aaa",
    marginRight: 10,
  },
  commentBlock: {
    backgroundColor: "#dadada",
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },
  authorName: {
    fontWeight: "800",
  },
  timeAgo: {
    fontSize: 12,
  },
  commentBody: {
    marginTop: 8,
  },
});

export default CommentCard;
