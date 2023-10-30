import { defineStore } from "pinia";
import { server } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    email: null,
    name: null,
    token: null,
  }),
  getters: {
    getId: (state) => state.id,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getToken: (state) => state.token,
  },
  actions: {
    async getSanctumCookie() {
      try {
        await server.get("/sanctum/csrf-cookie");
      } catch (error) {
        console.log("erro 1");
        if (error) throw error;
      }
    },
    async login(email, password) {
      try {
        return await server.post("api/login", {
          email,
          password,
          device_name: "vuePH",
        });
      } catch (error) {
        console.log("erro 2");
        if (error) throw error;
      }
    },
    async fetchUser(token, id) {
      try {
        return await server.get(`api/usuarios/${id}`, {
          "Content-Type": "application/json",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log("erro 3");
        if (error) throw error;
      }
    },
    setUser(payload, token) {
      const { data } = payload;
      console.log("payload");
      console.log(data);
      if (data.id) this.id = data.id;
      if (data.email) this.email = data.email;
      if (data.name) this.name = data.name;
      if (token) this.token = token;
    },
    clearUser() {
      this.id = null;
      this.email = null;
      this.name = null;
      this.token = null;
    },
  },
});
