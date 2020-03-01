<template>
  <div class="about">
    <div><button @click="createNewRoom">Create New Room</button></div>
    <div class="rooms">
      <router-link
        :to="{ name: 'Chat', query: { room: room.room, nickname: nickName } }"
        class="square"
        v-for="room in rooms"
        :key="room"
      >
        {{ room.room }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      nickName: "",
      id: 0,
      rooms: []
    };
  },
  created() {
    this.nickName = this.$route.query.nickname;
  },
  mounted() {
    const path = `http://localhost:5000/rooms`;
    this.$http
      .get(path)
      .then(res => {
        console.log(res.data);
        this.rooms = res.data;
        console.log(this.rooms);
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    createNewRoom() {
      let room = prompt("What is the room's name>");
      if (room != null) {
        const path = `http://localhost:5000/rooms`;
        const payload = {
          room: room
        };
        this.$http
          .post(path, payload)
          .then(res => {
            console.log(res)
            this.rooms.push({ room: room });
          })
          .catch(e => {
            console.log(e);
          });
        const path2 = `http://localhost:5000/newroom`;
        this.$http
          .post(path2, payload)
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }
};
</script>
<style>
.square {
  text-decoration-line: none;
  color: black;
  width: 15vw;
  height: 5vh;
  background-color: white;
  border: 1px solid black;
  display: inline-block;
  margin-top: 20vh;
  margin-right: 2vw;
}
</style>
