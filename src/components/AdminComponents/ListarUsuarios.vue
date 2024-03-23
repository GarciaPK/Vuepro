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
            <th align="left" class="pl-3">Nombres</th>
            <th align="left" class="pl-3">Documento</th>
            <th align="left" class="pl-3">Login</th>
            <th align="left" class="pl-3">Estado</th>
            <th align="left" class="accion pl-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="user in users" :key="user.id"> -->
          <tr v-for="user in users" :key="user.id">
            <td align="left" class="pl-3">{{ user.names}}</td>
            <td align="left" class="pl-3">{{ user.document }}</td>
            <td align="left" class="pl-3">{{ user.login }}</td>
            <td align="left" class="pl-3">{{ user.status }}</td>
            <td>
              <button class="editar" @click="prepareEdit(user.id)">
                <img src="@/assets/boligrafo.png" />
              </button>

              <button class="eliminar" @click="deleteUser(user.id)">
                <img src="@/assets/borrar.png" />
              </button>

              <button class="visualizar" @click="fetchUsersForm(user.id)">
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
                          id="document"
                          class="input-add"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="document"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="names"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="names"
                        />
                        <span>Nombres</span>
                      </label>

                      <label>
                        <input
                          id="phone1"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="phone1"
                        />
                        <span>Telefono</span>
                      </label>
                    </div>

                    <div class="flex-add">

                      <label>
                        <input
                          id="email"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="email"
                        />
                        <span>Correo</span>
                      </label>

                      <label>
                        <input
                          id="status"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="status"
                        />
                        <span>Estado</span>
                      </label>

                      <label>
                        <input
                          id="active"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="active"
                        />
                        <span>Activo</span>
                      </label>

                      <label>
                        <input
                          id="password"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="password"
                        />
                        <span>Password</span>
                      </label>

                    </div>

                    <div class="flex-add">

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
                          id="roleId"
                          class="input-add"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="roleId"
                        />
                        <span>Rol</span>
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
                          v-model="editUser.document"
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
                          v-model="editUser.names"
                        />
                        <span>Nombre Completo</span>
                      </label>

                      <label>
                        <input
                          id="phone1"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.phone1"
                        />
                        <span>Telefono</span>
                      </label>
                    </div>
                    <div class="flex-edit">
                      <label>
                        <input
                          id="email"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.email"
                        />
                        <span>Correo</span>
                      </label>

                      <label>
                        <input
                          id="status"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.status"
                        />
                        <span>Estado</span>
                      </label>

                      <label>
                        <input
                          id="activo"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="editUser.active"
                        />
                        <span>Activo</span>
                      </label>
                    </div>

                    <div class="flex-edit">
                      <label>
                        <input
                          id="password"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="editUser.password"
                        />
                        <span>Contraseña</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="editUser.login"
                        />
                        <span>Login</span>
                      </label>

                      <label>
                        <input
                          id="rol"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="editUser.roleId"
                        />
                        <span>Rol</span>
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
                          id="document"
                          class="input-visu"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="document"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.document }}</span>
                      </label>

                      <label>
                        <input
                          id="names"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="names"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.names }}</span>
                      </label>

                      <label>
                        <input
                          id="phone1"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="phone1"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.phone1 }}</span>
                      </label>
                    </div>

                    <div class="flex-visu">
                      <label>
                        <input
                          id="email"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="email"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.email }}</span>
                      </label>

                      <label>
                        <input
                          id="status"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="status"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.status }}</span>
                      </label>

                      <label>
                        <input
                          id="active"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="active"
                          :disabled="isDisabled"
                        />
                        <span>{{ User.active }}</span>
                      </label>
                    </div>

                    <div class="flex-visu">

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
                        <span>{{ User.login }}</span>
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
                    <h2>Eliminar Usuario {{ user.document }}</h2>
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
      <div class="pagination">
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
      showModal: false,
      showModalEdit: false,
      showModalVisu: false,
      showModalAlert: false,
      searchTerm: '', //buscador
      User:{
        document: '',
        names: '',
        phone1: '',
        email: '',
        status: '',
        active: '',
        login: '',
      },
      editUser: {
          id: '',
          document: '',
          names: '',
          phone1: '',
          email: '',
          status: '',
          active: '',
          password: '',
          login: '',
          roleId: '',
      },

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
    fetchUsers() {
    axios.get("https://localhost:44355/api/User")
      .then(response => {
        this.users = response.data.data; 
      })
      .catch(error => {
        console.error("Error al obtener los usuarios:", error);
      });
    },

    // Método para cargar y mostrar los datos del usuario en el modal
    fetchUsersForm(id) {
    axios.get(`https://localhost:44355/api/User/${id}`)
      .then((response) => {
        this.User = response.data.data; // Asegúrate de que esta asignación sea correcta
        this.showModalVisu = true; // Abre el modal de visualización
      })
      .catch((error) => {
        console.log(this.User);
        console.error("Error al obtener los datos del usuario:", error);
      });
    },


    async prepareEdit(usu_idagente) {
      await this.fetchUsersFormUpdate(usu_idagente); // Carga los datos del usuario
      this.showModalEdit = true; // Muestra el modal de edición
    },

    fetchUsersFormUpdate(id) {
      axios.get(`https://localhost:44355/api/User/${id}`)
        .then((response) => {
          this.editUser = response.data.data; // Asigna los datos obtenidos a User para editar
          this.showModalEdit = true; // Abre el modal de edición
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    },


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


    addUser() {
      const usuarios = {
        Document: this.document,
        Names: this.names,
        Phone1: this.phone1,
        Email: this.email,
        Status: this.status,
        Active: this.active,
        Password: this.password,
        Login: this.login,
        RoleId: this.roleId,
      }

      console.log(usuarios);
      axios.post("https://localhost:44355/api/User", {userPostDto : usuarios})
        .then(() => {
          this.showModal = false;
          this.fetchUsers();
        })
        .catch((error) => {
          console.error("Error al agregar usuario:", error);
        });
    },


    deleteUser(id) {
      axios.delete(`https://localhost:44355/api/User/${id}`)
        .then(() => {
          this.fetchUsers();
          console.log("Usuario eliminado correctamente");
        })
        .catch((error) => {
          console.error("Error al eliminar el usuario:", error);
        });
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
