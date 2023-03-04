import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { Icon } from "@rneui/base";

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

  return (
    <View style={styles.container}>
      <Icon style={styles.profile_image} name="perm-identity" />
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
  profile_image: {
    backgroundColor: "#cdcdca",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  commentBlock: {
    backgroundColor: "#dadada",
    padding: 15,
    marginLeft: 15,
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
