<template>
  <div class="hello">
    <h2>configure</h2>

    <v-text-field
      :value="baseUrl"
      label="baseUrl"
      @change="updateBaseUrl"
      required
    />
    <v-text-field
      :value="userId"
      label="userId"
      @change="updateUserId"
      required
    />
    <v-text-field
      :value="accessToken"
      label="accessToken"
      @change="updateAccessToken"
      required
    />
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
    updateBaseUrl(val) {
      this.$store.commit("updateBaseUrl", val);
    },
    updateUserId(val) {
      this.$store.commit("updateUserId", val);
    },
    updateAccessToken(val) {
      this.$store.commit("updateAccessToken", val);
    }
  }
};
</script>

<style scoped lang="scss"></style>
