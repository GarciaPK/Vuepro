<template>
    <div class="tablee">
      <h1 class="tittle">Lista de Usuarios</h1>
      <input class="search" type="text" placeholder="Search" v-model="searchTerm" @keyup.enter="searchUser">
      <button type="button" class="btn" @click="showModal = true">
        <img src="@/assets/boton-mas.png">
      </button>
      <table>
        <thead>
          <tr>
            <th align="left" class="pl-3">Cod Interno</th>
            <th align="left" class="pl-3">Nombres</th>
            <th align="left" class="pl-3">Documento</th>
            <th align="left" class="pl-3">Login</th>
            <th align="left" class="pl-3">Estado</th>
            <th align="left" class="accion pl-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="user in users" :key="user.id"> -->
          <tr v-for="user in paginatedTasks" :key="user.usu_idagente">
            <td align="left" class="pl-3">{{ user.usu_idagente }}</td>
            <td align="left" class="pl-3">{{ user.usu_nombre }}</td>
            <td align="left" class="pl-3">{{ user.usu_documento }}</td>
            <td align="left" class="pl-3">{{ user.usu_login }}</td>
            <td align="left" class="pl-3">{{ user.usu_estado }}</td>
            <td>
              <button class="editar" @click="prepareEdit(user.usu_idagente)">
                <img src="@/assets/boligrafo.png" />
              </button>

              <button class="eliminar" @click="deleteUser(user.usu_idagente)">
                <img src="@/assets/borrar.png" />
              </button>

              <button class="visualizar" @click="fetchUsersForm(user.usu_idagente)">
                <img src="@/assets/ojo.png" />
              </button>

              <!--Formulario Agregar Usuario  -->
              <transition name="fade">
                <div class="modal-overlay-add" v-if="showModal"></div>
              </transition>
              <transition name="fade">
                <div class="modal-add" v-if="showModal">
                  <form class="form-add">
                    <h2>Agregar Usuario</h2>
                    <div class="flex-add">
                      <label>
                        <input
                          id="documento"
                          class="input-add"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="documento"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="nombre"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="nombre"
                        />
                        <span>Nombres</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="estado"
                        />
                        <span>Estado</span>
                      </label>
                    </div>

                    <div class="flex-add">
                      <label>
                        <input
                          id="passwd"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="passwd"
                        />
                        <span>Password</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login"
                        />
                        <span>Login</span>
                      </label>

                      <label>
                        <input
                          id="cod_cargo"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="cod_cargo"
                        />
                        <span>Cargo</span>
                      </label>
                    </div>

                    <div class="flex-add">
                      <label>
                        <input
                          id="login_new"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login_new"
                        />
                        <span>New Login</span>
                      </label>

                      <label>
                        <input
                          id="login_temp"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login_temp"
                        />
                        <span>Login Temp</span>
                      </label>
                    </div>
                    
                    <button
                      type="button"
                      class="btn-modal-cancelar-add"
                      @click="showModal = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-add" @click="addUser">Guardar</button>
                  </form>
                </div>
              </transition>

              <!--Formulario Editar Usuario  -->
              <transition name="fade">
                <div class="modal-overlay-edit" v-if="showModalEdit"></div>
              </transition>
              <transition name="fade">
                <div class="modal-edit" v-if="showModalEdit">
                  <form @submit.prevent="updateUser" class="form-edit" >
                    <h2>Editar Usuario</h2>
                    <div class="flex-edit">

                      <label>
                        <input
                          id="documento"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.usu_documento"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="nombre"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.usu_nombre"
                        />
                        <span>Nombre Completo</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.usu_estado"
                        />
                        <span>Estado</span>
                      </label>
                    </div>
                    <div class="flex-edit">
                      <label>
                        <input
                          id="contrasena"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.usu_passwd"
                        />
                        <span>Contraseña</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.usu_login"
                        />
                        <span>Login</span>
                      </label>

                      <label>
                        <input
                          id="cargo"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.cau_codcargo"
                        />
                        <span>Cargo</span>
                      </label>
                    </div>

                    <div class="flex-edit">
                      <label>
                        <input
                          id="login_new"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="editUser.usu_login_new"
                        />
                        <span>Login New</span>
                      </label>

                      <label>
                        <input
                          id="login_temp"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="editUser.usu_logintemp"
                        />
                        <span>Login Temporal</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      class="btn-modal-cancelar-edit"
                      @click="showModalEdit = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-edit">
                      Guardar
                    </button>
                  </form>
                </div>
              </transition>

              <!--Formulario Visualizar Usuario  -->
              <transition name="fade">
                <div class="modal-overlay-visu" v-if="showModalVisu"></div>
              </transition>
              <transition name="fade">
                <div class="modal-visu" v-if="showModalVisu">
                  <form class="form-visu">
                    <h2>Visualizar Usuario</h2>
                    <div class="flex-visu">
                      <label>
                        <input
                          id="documento"
                          class="input-visu"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="documento"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_documento }}</span>
                      </label>

                      <label>
                        <input
                          id="nombre"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="nombre"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_nombre }}</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="estado"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_estado }}</span>
                      </label>
                    </div>

                    <div class="flex-visu">
                      <label>
                        <input
                          id="passwd"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="passwd"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_passwd }}</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_login }}</span>
                      </label>

                      <label>
                        <input
                          id="cod_cargo"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="cod_cargo"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.cau_codcargo }}</span>
                      </label>
                    </div>

                    <div class="flex-visu">
                      <label>
                        <input
                          id="login_new"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login_new"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_login_new }}</span>
                      </label>

                      <label>
                        <input
                          id="login_temp"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="login_temp"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.usu_logintemp }}</span>
                      </label>
                    </div>
                    
                    <button
                      type="button"
                      class="btn-modal-save-visu"
                      @click="showModalVisu = false"
                    >
                      Aceptar
                    </button>
                  </form>
                </div>
              </transition>

              <!--Formulario ELIMINAR Usuario  -->
              <transition name="fade">
                <div class="modal-overlay-delete" v-if="showModalAlert"></div>
              </transition>
              <transition name="fade">
                <div class="modal-delete" v-if="showModalAlert">
                  <form class="form-delete">
                    <h2>Eliminar Usuario {{ user.usu_documento }}</h2>
                    <p>Seguro quieres elimininar la tarea</p>
                    <button
                      type="button"
                      class="btn-modal-cancelar-delete"
                      @click="showModalAlert = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-delete"
                     >
                      Aceptar
                    </button>
                  </form>
                </div>
              </transition>
              
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>{{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isDisabled: true,
      users: [],
      user:[],
      showModal: false,
      showModalEdit: false,
      showModalVisu: false,
      showModalAlert: false,
      searchTerm: '', //buscador
      User: {
          documento: '',
          nombre: '',
          estado: '',
          contrasena: '',
          login: '',
          perfil: '',
          login_new: '',
          login_temp: '',
      },
      editUser: {
          usu_idagente: '',
          usu_documento: '',
          usu_nombre: '',
          usu_estado: '',
          usu_passwd: '',
          usu_login: '',
          cau_codcargo: '',
          usu_login_new: '',
          usu_logintemp: '',
      },
      usu_idagente: '',

      currentPage: 1, // Página actual
      pageSize: 10, // Tamaño de página
    };
  },
  computed: {
    //lo usamos para el buscador search
    filteredUsers() {
      return this.users.filter(user => user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    // Calcular el número total de páginas
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    // Obtener las tareas para la página actual (FUNCIONA)
    // paginatedTasks() {
    //   const start = (this.currentPage - 1) * this.pageSize;
    //   const end = start + this.pageSize;
    //   return this.users.slice(start, end);
    // }
  },
  mounted() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("https://localhost:44355/api/User");
        this.users = response.data;
        console.log(this.users);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    },

    // Método para cargar y mostrar los datos del usuario en el modal
    async fetchUsersForm(usu_idagente) {
      try {
        const response = await axios.get(`http://localhost:5000/view-user/${usu_idagente}`);
        this.User = response.data; // Asegúrate de que esta asignación sea correcta
        this.showModalVisu = true; // Abre el modal de visualización
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    },

    async prepareEdit(usu_idagente) {
      await this.fetchUsersFormUpdate(usu_idagente); // Carga los datos del usuario
      this.showModalEdit = true; // Muestra el modal de edición
    },

    async fetchUsersFormUpdate(usu_idagente) {

      // this.editUser.login_new = this.editUser.login_new ?? null;
      // this.editUser.login_temp = this.editUser.login_temp ?? null;

      //this.updateUser(); // Procede con la actualización
      try {
        const response = await axios.get(`http://localhost:5000/view-user/${usu_idagente}`);
        this.editUser = response.data; // Asigna los datos obtenidos a User para editar
        this.showModalEdit = true; // Abre el modal de edición
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    },

    // Dentro de methods en tu componente Vue
    // async updateUser() {
    //   console.log("Datos a enviar:", this.editUser);
    //   console.log("Datos a enviar:", JSON.parse(JSON.stringify(this.editUser)));

    //   try {
    //     // Asegúrate de usar `editUser` para la actualización, 
    //     // y de que `editUser.usu_idagente` contenga el ID correcto del usuario a actualizar.
    //     const response = await axios.put(`http://localhost:5000/update-user/${this.editUser.usu_idagente}`, this.editUser)
    //     this.editUser = response.data;
    //     this.showModalEdit = false; // Cierra el modal de edición
    //     await this.fetchUsers(); // Recarga la lista de usuarios para reflejar los cambios
    //     console.log("Usuario actualizado correctamente");
    //   } catch (error) {
    //     console.error("Error al actualizar el usuario:", error.response.data);
    //     // Considera mostrar un mensaje de error en la UI.
    //   }
    // },

    async updateUser() {
      try {
        // Asegúrate de usar `this.editUser` si ese es el objeto correcto
        await axios.put(`http://localhost:5000/update-user/${this.editUser.usu_idagente}`, this.editUser);
        this.showModalEdit = false;
        await this.fetchUsers();
        console.log("Usuario actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    },


    async addUser() {
      try {
        await axios.post("http://localhost:5000/new-user", {
          documento: this.documento,
          nombre: this.nombre,
          estado: this.estado,
          passwd: this.passwd,
          login: this.login,
          cod_cargo: this.cod_cargo,
          login_new: this.login_new,
          login_temp: this.login_temp,
        });
        this.showModal = false;
        this.fetchUsers();
      } catch (error) {
        console.error("Error al agregar usuario:", error);
      }
    },


    async deleteUser(usu_idagente) {
    try {
      await axios.delete(`http://localhost:5000/delete-user/${usu_idagente}`);
      this.fetchUsers();
      console.log("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  },

    //buscar tarea por su nombre
    async searchUser() {
      try {
        const response = await axios.get("http://localhost:5000/search-user", {
          params: { nombre: this.searchTerm }
        });
        this.users = response.data;
      } catch (error) {
        console.error("Error al buscar usuarios:", error);
      }
    },
    
    //editTask(tarea) {
    //   // Establecer la tarea editada para mostrarla en el modal de edición
    //   this.editedUser = { tarea };
    //   // Mostrar el modal de edición
    //   this.showModalEdit = true;
    // },

    // Métodos para cambiar de página
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style>
@import "@/css/admin/adminComponent.css";
</style>
