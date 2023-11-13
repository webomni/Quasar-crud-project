import { defineStore } from "pinia";
import { server } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const useContactStore = defineStore("contact", {
  state: () => ({
    id: null,
    nome: null,
    endereco: null,
    telefone: null,
    allContact: null,
    currentPage: null,
    lastPage: null,
  }),
  getters: {
    getId: (state) => state.id,
    getName: (state) => state.name,
    getEndereco: (state) => state.endereco,
    getTelefone: (state) => state.telefone,
    getAllContact: (state) => state.allContact,
    getCurrentPage: (state) => state.currentPage,
    getLastPage: (state) => state.lastPage,
  },
  actions: {
    // fazer o getSanctumCookie, ocorre erro para se for usar PWA offline.
    async getSanctumCookie() {
      /*  try {
        await server.get("/sanctum/csrf-cookie");
      } catch (error) {
        if (error) throw error;
      } */
    },
    async showAllContact(page = 1) {
      const userStore = useUserStore();
      try {
        const { data } = await server.get("api/cadastros", {
          "Content-Type": "application/json",
          headers: { Authorization: `Bearer ${userStore.getToken}` },
          params: { page: page },
        });
        console.log("data paginação");
        console.log(data);
        this.allContact = data.data;
        this.currentPage = data.meta.current_page; // pagina atual
        this.lastPage = data.meta.last_page; // quantidade de pagina

        // verifica se esta offline
        console.log("Contact offline 0!");
        console.log("navigator.onLine");
        console.log(navigator.onLine);
        if (!navigator.onLine) {
          this.getOffLineContact();
        }

        return data.data;
      } catch (error) {
        console.log("Contact offline 1!");
        console.log("erro 4");
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
            this.showAllContact();
            result.status = true;
          })
          .catch((error) => {
            console.log("erro na promisse!");
            result.msg = error.response.data.message
              ? error.response.data.message
              : "";
          });

        return result;
      } catch (error) {
        console.log("register teste 4");
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
    async getOffLineContact() {
      console.log("Contact offline 2!");
      /* try {
        let db = openDB("workbox-background-sync").then((db) => {
          console.log("database is open: ", db);
        });
      } catch (error) {
        console.log("database com erro: ", error);
      } */
    },
    //workbox-background-sync
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
