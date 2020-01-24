<template>
  <div class="room">
    <v-list three-line>
      <v-list-item v-for="item in roomMessages" :key="item.to">
        <v-list-item-avatar>
          <!-- TODO: get the avatar -->
          <v-img :src="item.avatar">WIP</v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.sender"></v-list-item-title>
          <v-list-item-subtitle
            v-html="item.content.body"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
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
  components: {},
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
      // push the new message to store
      console.log(event.event);
      store.commit("newmessage", event.event);
    });
    client.startClient();
  }
};
</script>

<style scoped lang="scss"></style>
