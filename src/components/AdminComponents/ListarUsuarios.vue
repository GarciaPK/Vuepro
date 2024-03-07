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
              <button class="editar" @click="showModalEdit = true">
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
                          type="number"
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
                  <form class="form-edit" >
                    <h2>Editar Usuario</h2>
                    <div class="flex-edit">
                      <label>
                        <input
                          id="nombre"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="User.nombre"
                        />
                        <span>Nombres {{ user.usu_nombre }}</span>
                      </label>

                      <label>
                        <input
                          id="documento"
                          class="input-edit"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="User.documento"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-edit"
                          type="number"
                          placeholder=""
                          required=""
                          v-model="User.estado"
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
                          v-model="User.contrasena"
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
                          v-model="User.login"
                        />
                        <span>Login</span>
                      </label>

                      <label>
                        <input
                          id="perfil"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="User.perfil"
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
                          v-model="User.login_new"
                        />
                        <span>New Login</span>
                      </label>

                      <label>
                        <input
                          id="login_temp"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          v-model="User.login_temp"
                        />
                        <span>Login Temp</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      class="btn-modal-cancelar-edit"
                      @click="showModalEdit = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-edit"
                      @click="updateUser(user.usu_idagente)" 
                    >
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
                          type="number"
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
                    <h2>Eliminar Usuario</h2>
                    <p>Seguro quieres elimininar la tarea</p>
                    <button
                      type="button"
                      class="btn-modal-cancelar-delete"
                      @click="showModalAlert = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-delete"
                     @click="deleteUser(user.usu_idagente)">
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
    // Obtener las tareas para la página actual
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchUsersForm();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/users");
        this.users = response.data;
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

//_____________________________________________________________________
    
    // async updateUser(id) {
    //   try {
    //     await axios.put(`http://localhost:5000/update-user/${id}`, {
    //      
    //        id: this.users.id,
//
    //     });
    //     this.showModalEdit = false; // Cerrar el modal de edición
    //     this.fetchTasks(); // Actualizar la lista de tareas
    //   } catch (error) {
    //     console.error("Error al actualizar al:", error);
    //   }
    // },

    ////async updateUser(id) {
      //try {
      //  // Verificar que todos los campos estén definidos
      //  if (this.users.documento && this.users.nombre /* && otros campos */) {
     //     await axios.put(`http://localhost:5000/update-user/${id}`, {
      //      documento: this.users.documento,
      //      nombre: this.users.nombre,
      //      estado: this.users.estado,
      //      contrasena: this.users.contrasena,
      //      login: this.users.login,
      //      login_new: this.users.perfil,
      //      login_temp: this.users.login_temp,
      //    });
      //    this.showModalEdit = false;
      //    this.fetchTasks();
      //  } else {
      //    console.error("Error: Algunos datos no están definidos");
      //  }
    //  } catch (error) {
    //    console.error("Error al actualizar la tarea:", error);
    //  }
    //},

    async updateUser(usu_idagente) {
      try {
        const { documento, nombre, estado, contrasena, login, perfil, login_temp, login_new } = this.User;

        // Verificar que todos los campos estén definidos
        if (documento && nombre && estado && contrasena && login && perfil && login_temp && login_new) {
          await axios.put(`http://localhost:5000/update-user/${usu_idagente}`,{
            documento: this.documento,
            nombre: this.nombre,
            estado: this.estado,
            contrasena: this.contrasena,
            login: this.login,
            perfil: this.perfil,
            login_temp: this.login_new,
            login_new: this.login_temp,
          });

          this.showModalEdit = false;
          
        } else {
          console.log("Error: Algunos datos no están definidos");
        }

        this.fetchUsersForm();
      } catch (error) {
        console.log("Error al actualizar la tarea:", error);

        // Imprimir detalles específicos de la respuesta si está disponible
        if (error.response) {
          console.log("Detalles de la respuesta:", error.response.data);
        }
      }
    },

  

    //eliminar tarea de la BD
    // async deleteUser(usu_idagente) {
    //   try {
    //     await axios.delete(`http://localhost:5000/delete-user/${usu_idagente}`);
    //     // Eliminar la tarea de la lista localmente
    //     this.users = this.users.filter(user => user.usu_idagente !== usu_idagente);
    //     console.log("Usuario eliminada correctamente");
    //   } catch (error) {
    //     console.error("Error al eliminar la tarea:", error);
    //   }
    // },

    async deleteUser(usu_idagente) {
    try {
      await axios.delete(`http://localhost:5000/delete-user/${usu_idagente}`);
      this.showModalAlert = true; // Abre el modal de visualización
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
