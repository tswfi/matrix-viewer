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
    ...mapState(["room"]),
    ...mapGetters(["messages"])
  },
  components: {
    Message
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
