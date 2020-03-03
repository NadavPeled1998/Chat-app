<template>
  <div>
    <div class="about">
      <div class="chat">
        <div style="text-align: left">
          <p v-for="message in messages" :key="message">
            {{ message.name }}: {{ message.message }}
          </p>
        </div>
      </div>
    </div>
    <input type="text" v-model="message" />
    <button @click="newMessage">Send</button>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      nickName: "",
      room: "",
      messages: [],
      message: ""
    };
  },
  created() {
    this.nickName = this.$route.query.nickname;
    this.room = this.$route.query.room;
  },
  /*sockets:{
    connect () {
      console.log('connected to chat server')
    }
  },*/
  mounted() {
    setInterval(() => {
      const path = `http://localhost:5000/newroom/${this.room}`;
      this.$http
        .get(path)
        .then(res => {
          this.messages = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }, 1000);
  },
  methods: {
    newMessage() {
      const path = `http://localhost:5000/message`;
      const payload = {
        nickname: this.nickName,
        message: this.message,
        room: this.room
      };
      this.$http
        .post(path, payload)
        .then(res => {
          console.log(res);
          this.messages.push({ name: this.nickName, message: this.message });
          //this.$socket.emit('message', payload)
          this.message = "";
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
.about {
  display: flex;
  justify-content: center;
}
.chat {
  width: 25vw;
  height: 60vh;
  background-color: lightgrey;
}
input {
  width: 25vw;
  height: 5vh;
  align-self: flex-end;
  margin-bottom: 1vh;
  background-color: lightblue;
  border: none;
}
button {
  height: 5.25vh;
  align-self: flex-end;
  margin-bottom: 1vh;
  background-color: lightblue;
  margin-left: -2vw;
  cursor: pointer;
  border: none;
}
</style>
