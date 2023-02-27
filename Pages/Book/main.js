const { createApp } = Vue;

createApp({
  data() {
    return {
      isLogged: false,
      user: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      location.href = "../../index.html";
    },
  },
  computed: {},
  beforeCreate() {},
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {},
  update() {},
}).mount("#book");
