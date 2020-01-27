<template>
  <div class="room">
    <v-list three-line>
      <v-list-item v-for="item in roomMessages" :key="item.id">
        <v-list-item-avatar>
          <!-- TODO: get the avatar -->
          <v-img :src="item.sender_avatar_url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            >{{ item.sender }}
            <vue-moments-ago
              prefix="posted"
              suffix="ago"
              :date="item.date"
              lang="en"
            ></vue-moments-ago
          ></v-list-item-title>
          <v-list-item-subtitle
            v-html="item.content.body"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import VueMomentsAgo from "vue-moments-ago";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Room",
  computed: {
    ...mapState(["clientconfig"]),
    ...mapGetters(["messages"]),
    roomMessages() {
      // try to filter messages to one room
      if (this.$route.params.id) {
        return this.$store.getters.messages.filter(
          message => message.room_id === this.$route.params.id
        );
      } else {
        return this.$store.getters.messages;
      }
    }
  },
  components: {
    VueMomentsAgo
  },
  updated: function() {
    // scroll down when ever the element is updated
    window.scrollTo(0, this.$el.clientHeight);
  },
  mounted: function() {
    // build the matrix client and start listening on events
    const client = matrixcs.createClient({
      baseUrl: this.clientconfig.baseUrl,
      userId: this.clientconfig.userId,
      accessToken: this.clientconfig.accessToken
    });

    // clear old messages
    this.$store.commit("clearmessages");

    let store = this.$store;

    // start listening on events, TODO: this seems to duplicate events
    client.on("Room.timeline", function(event, room, toStartOfTimeline) {
      if (toStartOfTimeline) {
        return; // don't print paginated results
      }
      if (event.getType() !== "m.room.message") {
        return; // only print messages
      }

      console.log(event);

      // build nicer data model with only some of the data and
      // avatar urls etc ready made
      const data = {
        room_id: event.getRoomId(),
        id: event.getId(),
        content: event.getContent(),
        date: event.getDate(),
        sender: event.sender.name,
        sender_id: event.sender.userId,
        sender_avatar_url: event.sender.getAvatarUrl(client.getHomeserverUrl())
      };

      store.commit("newmessage", data);
    });
    client.startClient();
  }
};
</script>

<style scoped lang="scss"></style>
