<template>
  <div class="message">
    <span class="sender-name">{{ message.sender }}</span>
    <span class="content-body">{{ message.content.body }}</span>
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
  border-bottom: 1px solid #eee;
}
.message .sender-name::after {
  content: ": ";
}
</style>
