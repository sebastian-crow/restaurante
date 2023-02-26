const { createApp } = Vue;

createApp({
  data() {
    return {
      isLogged: false,
      user: "",
    };
  },
  methods: {},
  computed: {},
  beforeCreate() {},
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {},
  update() {},
}).mount("#about");
