const { createApp } = Vue;

createApp({
  data() {
    return {
      waiter: "hello world",
    };
  },
  methods: {},
  beforeCreate() {},
  mounted() {},
  beforeUpdate() {},
  update() {},
}).mount("#waiter");
