const { createApp } = Vue;

createApp({
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      users: [
        { username: "dummychef", password: "contraseñasegura" },
        { username: "juanhorseadmin21", password: "hola123" },
        { username: "waiterjorge", password: "waiter123" },
      ],
      user: "",
    };
  },
  methods: {
    login() {
      if (this.input.username !== "" && this.input.password !== "") {
        const user = this.users.find(
          (user) =>
            user.username === this.input.username &&
            user.password === this.input.password
        );
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          location.href = "../../index.html";
        } else {
          alert("El usuario no existe");
        }
      } else {
        alert("Debes llenar todos los campos para poder continuar");
      }
    },
  },

  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    if (this.user) {
      location.href = "../../index.html";
    }
  },
  created() {},
  beforeUpdate() {},
  update() {},
}).mount("#login");
