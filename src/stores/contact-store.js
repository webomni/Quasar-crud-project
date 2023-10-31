import { defineStore } from "pinia";
import { server } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const useContactStore = defineStore("contact", {
  state: () => ({
    id: null,
    nome: null,
    endereco: null,
    telefone: null,
  }),
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getEndereco: (state) => state.endereco,
    getTelefone: (state) => state.telefone,
  },
  actions: {
    async getSanctumCookie() {
      try {
        await server.get("/sanctum/csrf-cookie");
      } catch (error) {
        if (error) throw error;
      }
    },
    async register(nome, endereco, telefone) {
      const result = {
        status: false,
        msg: "",
      };

      const userStore = useUserStore();
      try {
        await server
          .post(
            "api/cadastros",
            {
              nome,
              endereco,
              telefone,
            },
            {
              headers: { Authorization: `Bearer ${userStore.getToken}` },
            }
          )
          .then((res) => {
            result.status = true;
          })
          .catch((error) => {
            result.msg = error.response.data.message
              ? error.response.data.message
              : "";
          });
        return result;
      } catch (error) {
        result.msg = error.response.data.message
          ? error.response.data.message
          : "";
        return result;
      }
    },
    async fetchContact(token, id) {
      try {
        /*  return await server.get(`api/usuarios/${id}`, {
          "Content-Type": "application/json",
          headers: { Authorization: `Bearer ${token}` },
        }); */
      } catch (error) {
        console.log("erro 3");
        if (error) throw error;
      }
    },
    /*  setUser(payload, token) {
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
    }, */
  },
  persist: true,
});
