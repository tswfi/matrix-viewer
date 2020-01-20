<template>
  <div class="room">
    <div class="title">{{ room.title }}</div>

    <message
      v-for="message in messages"
      v-bind:message="message"
      v-bind:key="message.id"
    ></message>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Message from "@/components/Message.vue";

export default {
  name: "Room",
  computed: {
    ...mapState(["room", "clientconfig"]),
    ...mapGetters(["messages"])
  },
  components: {
    Message
  },
  mounted: function() {
    const client = matrixcs.createClient({
      baseUrl: this.clientconfig.baseUrl,
      userId: this.clientconfig.userId,
      accessToken: this.clientconfig.accessToken
    });

    // clear old messages
    this.$store.commit("clearmessages");

    let store = this.$store;

    // start listening on events
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

<style scoped lang="scss">
.title {
  border: 1px solid red;
}
.messages {
  border: 1px solid green;
}
</style>
