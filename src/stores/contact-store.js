import { defineStore } from "pinia";
import { server } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { openDB } from "idb";

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
      // TODO se não foi informado a pagina pegar a ultima pagina
      /*  if (!page) {
        page = this.getLastPage;
      } */
      const userStore = useUserStore();
      try {
        console.log("showAllContact");
        await server
          .get("api/cadastros", {
            "Content-Type": "application/json",
            headers: { Authorization: `Bearer ${userStore.getToken}` },
            params: { page: page },
          })
          .then((response) => {
            const { data } = response;

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
          })
          .catch((error) => {
            console.log("Contact offline 1!");
            console.log("erro 4 A");
            if (error) throw error;
          });
      } catch (error) {
        console.log("Contact offline 6!");
        console.log("erro 4 B");
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
            console.log("promisse de cadastro offline!");
            result.status = true;
          })
          .catch((error) => {
            console.log("erro na promisse de cadastro!");
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
      try {
        let db = await openDB("workbox-background-sync").then((db) => {
          console.log("database is open: ", db);
          db.getAll("requests")
            .then((failedRequests) => {
              failedRequests.forEach((failedRequest) => {
                if (failedRequest.queueName == "createPostQueue") {
                  let requestData = failedRequest.requestData;

                  console.log("Dados do Request: ", requestData);
                  if (requestData && requestData.body) {
                    // Converte o ArrayBuffer para uma string
                    let requestBodyString = new TextDecoder().decode(
                      requestData.body
                    );

                    let requestBody = JSON.parse(requestBodyString);

                    console.log("requestBody: ", requestBody);
                    // Agora você pode acessar os campos específicos
                    /*  let nome = requestBody.nome;
                    let endereco = requestBody.endereco;

                    console.log("nome: ", nome);
                    console.log("endereco: ", endereco); */

                    let offLineContact = {};
                    offLineContact.id = requestBody.id ? requestBody.id : null;
                    offLineContact.nome = requestBody.nome;
                    offLineContact.endereco = requestBody.endereco;
                    offLineContact.telefone = requestBody.telefone;
                    offLineContact.offline = true;

                    console.log("offLineContact: ", offLineContact);
                    console.log("getAllContact: ", this.getAllContact);

                    this.allContact.push(offLineContact);

                    console.log("getAllContact: ", this.getAllContact);
                  }
                }
              });
            })
            .catch((error) => {
              console.log("getAll error: ", error);
            });
        });
      } catch (error) {
        console.log("database com erro: ", error);
      }
    },

    async delete(id) {
      const result = {
        status: false,
        msg: "",
      };

      const userStore = useUserStore();
      try {
        await server
          .delete(`api/cadastros/${id}`, {
            "Content-Type": "application/json",
            headers: { Authorization: `Bearer ${userStore.getToken}` },
          })
          .then((res) => {
            this.showAllContact();
            console.log("Contato deletado com sucesso!");
            result.status = true;
          })
          .catch((error) => {
            console.log("Erro ao deletar o cadastro!");
            result.msg = error.response.data.message
              ? error.response.data.message
              : "";
          });

        return result;
      } catch (error) {
        console.log("Erro ao deletar o cadastro!");
        result.msg = error.response.data.message
          ? error.response.data.message
          : "";
        return result;
      }
    },
  },
  persist: true,
});
