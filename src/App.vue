<template>
  <div id="app">
    <Case></Case>
  </div>
</template>

<script>
import Case from "./views/Case";
export default {
  name: "app",
  components: {
    Case,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
