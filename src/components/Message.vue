<template>
  <div class="message">
    {{ message.msg }}
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["message"]
};
</script>

<style scoped lang="scss">
.message {
  border: 1px solid blue;
}
</style>
