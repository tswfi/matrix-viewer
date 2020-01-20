<template>
  <div class="hello">
    <h2>configure</h2>
    baseUrl:
    <input :value="baseUrl" @input="updateBaseUrl" />
    userid:
    <input :value="userId" @input="updateUserId" />
    accesstoken:
    <input :value="accessToken" @input="updateAccessToken" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Config",
  computed: {
    ...mapState({
      baseUrl: state => state.clientconfig.baseUrl,
      userId: state => state.clientconfig.userId,
      accessToken: state => state.clientconfig.accessToken
    }),
    ...mapGetters(["clientconfig"])
  },
  methods: {
    updateBaseUrl(e) {
      this.$store.commit("updateBaseUrl", e.target.value);
    },
    updateUserId(e) {
      this.$store.commit("updateUserId", e.target.value);
    },
    updateAccessToken(e) {
      this.$store.commit("updateAccessToken", e.target.value);
    }
  }
};
</script>

<style scoped lang="scss"></style>
