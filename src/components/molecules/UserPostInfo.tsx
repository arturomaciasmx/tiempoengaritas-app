import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import "moment/locale/es";
import { Icon } from "@rneui/base";

interface Props {
  user: string;
  body?: string;
  created_at?: string;
}

const UserPostInfo = ({ user, body, created_at }: Props) => {
  let timeago = null;
  if (created_at) {
    timeago = moment.utc(created_at).local().startOf("seconds").fromNow();
  }
  return (
    <>
      <View style={styles.header}>
        <View style={styles.posted_by}>
          <View style={styles.profile_image_container}>
            <Icon style={styles.profile_image} name="perm-identity" />
          </View>
          <View>
            <Text style={styles.user_name}>{user}</Text>
            <Text style={styles.post_date}>{timeago}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.post_body}>{body}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {},
  posted_by: {
    flexDirection: "row",
    alignItems: "center",
  },
  user_name: {
    fontSize: 18,
  },
  post_date: {
    fontSize: 12,
    color: "#8a8a8a",
  },
  profile_image_container: {
    alignItems: "flex-start",
    marginRight: 15,
  },
  profile_image: {
    backgroundColor: "#cdcdca",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  post_body: {
    marginTop: 15,
    fontSize: 18,
  },
});

export default UserPostInfo;
