<template>
  <div class="home">
    <h1>Choose your NickName</h1>
    <input type="text" v-model="nickName" />
    <button @click="chooseNickName">
      <router-link
        class="submit"
        :to="{ name: 'Rooms', query: { nickname: this.nickName } }"
        >Submit</router-link
      >
    </button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      nickName: ""
    };
  },
  methods: {
    chooseNickName() {
      const path = `http://localhost:5000/nickname`;
      const payload = {
        nickname: this.nickName
      };
      this.$http
        .post(path, payload)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
button {
  margin-top: 20vh;
}
.submit {
  margin-top: 80vh;
  text-decoration-line: none;
  color: black;
}
</style>
