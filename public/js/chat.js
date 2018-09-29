Vue.component("Letter", {
  data: function() {
    return {
      user: {}
    };
  },
  props: ["letter", "username", "created"],
  template: `
    <div class="card-panel white z-depth-1 letter-box"> 
      <div class="row">
        <div class="input-field col m12">
          <h5>{{ letter }}</h5>
        </div>
      </div>
      <p class="username-letter"><span class="badge">{{ username }}</span>{{ created }}</p>
      <button v-on:click="$emit('remove-msg')">X</button>
    </div>
  `
});

//Vue instance
const letters = new Vue({
  el: "#vue-chat",
  data: {
    user: {},
    userMatch: {}
  },
  methods: {
    getData: function() {
      axios
        .get("/api/users/currentUser")
        .then(response => {
          this.user = response.data[0];
          this.getMatchData();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSubmit(event) {
      event.preventDefault();
      let formData = {
        message: event.target.message.value
      };
      console.log(formData);
      axios
        .post("/api/messages", formData)
        .then(response => {
          console.log(response);
          this.getData();
        })
        .catch(err => console.log(err));
    },
    getMatchData() {
      axios
        .get(`/api/users/${this.user.matchId}`)
        .then(response => {
          this.userMatch = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    logout() {
      axios
        .get("/api/logout")
        .then(response => {
          console.log(response);
          window.location.replace(response.data);
        })
        .catch(err => console.log(err));
    },
    removeMsg(letterId) {
      axios
        .delete(`/api/messages/${letterId}`)
        .then(response => {
          console.log(response);
          this.getData();
        })
        .catch(err => console.log(err));
    }
  }
});

letters.getData();
