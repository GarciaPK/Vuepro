<template>
  <div class="container-admin">
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
          <tr v-for="user in paginatedTasks" :key="user.idu">
            <td align="left" class="pl-3">{{ user.usu_idagente }}</td>
            <td align="left" class="pl-3">{{ user.usu_nombre }}</td>
            <td align="left" class="pl-3">{{ user.usu_documento }}</td>
            <td align="left" class="pl-3">{{ user.usu_login }}</td>
            <td align="left" class="pl-3">{{ user.usu_estado }}</td>
            <td>
              <button class="editar" @click="showModalEdit = true">
                <img src="@/assets/boligrafo.png" />
              </button>

              <button class="eliminar" @click="showModalAlert = true">
                <img src="@/assets/borrar.png" />
              </button>

              <button class="visualizar" @click="showModalVisu = true">
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
                  <form class="form-edit">
                    <h2>Editar Usuario</h2>
                    <div class="flex-edit">
                      <label>
                        <input
                          id="nombre"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="nombre"
                        />
                        <span>Nombres</span>
                      </label>

                      <label>
                        <input
                          id="documento"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="documento"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-edit"
                          type="email"
                          placeholder=""
                          required=""
                          v-model="login"
                        />
                        <span>Login</span>
                      </label>
                    </div>
                    <div class="flex-edit">
                      <label>
                        <input
                          id="perfil"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="perfil"
                        />
                        <span>Perfil</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="estado"
                        />
                        <span>Estado</span>
                      </label>

                      <label>
                        <input
                          id="punto-venta"
                          class="input-edit"
                          type="email"
                          placeholder=""
                          required=""
                          v-model="punto_venta"
                        />
                        <span>Punto de Venta</span>
                      </label>
                    </div>

                    <div class="flex-edit">
                      <label>
                        <input
                          id="team-leader"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="team_leader"
                        />
                        <span>Team Leader</span>
                      </label>

                      <label>
                        <input
                          id="gerente"
                          class="input-edit"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="gerente"
                        />
                        <span>Gerente</span>
                      </label>
                    </div>

                    <div class="flex-edit">
                      <label>
                        <input
                          id="productos"
                          class="input-edit"
                          type="password"
                          placeholder=""
                          required=""
                          v-model="productos"
                        />
                        <span>Productos</span>
                      </label>
                      <label>
                        <input
                          id="contrasena"
                          class="input-edit"
                          type="password"
                          placeholder=""
                          required=""
                          v-model="contrasena"
                        />
                        <span>Contraseña</span>
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
                          id="nombre"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="nombre"
                        />
                        <span>ID</span>
                      </label>

                      <label>
                        <input
                          id="documento"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="documento"
                        />
                        <span>Documento</span>
                      </label>

                      <label>
                        <input
                          id="login"
                          class="input-visu"
                          type="email"
                          placeholder=""
                          required=""
                          v-model="login"
                        />
                        <span>Login</span>
                      </label>
                    </div>
                    <div class="flex-visu">
                      <label>
                        <input
                          id="perfil"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="perfil"
                        />
                        <span>Perfil</span>
                      </label>

                      <label>
                        <input
                          id="estado"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="estado"
                        />
                        <span>Estado</span>
                      </label>

                      <label>
                        <input
                          id="punto-venta"
                          class="input-visu"
                          type="email"
                          placeholder=""
                          required=""
                          v-model="punto_venta"
                        />
                        <span>Punto de Venta</span>
                      </label>
                    </div>

                    <div class="flex-visu">
                      <label>
                        <input
                          id="team-leader"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="team_leader"
                        />
                        <span>Team Leader</span>
                      </label>

                      <label>
                        <input
                          id="gerente"
                          class="input-visu"
                          type="text"
                          placeholder=""
                          required=""
                          v-model="gerente"
                        />
                        <span>Gerente</span>
                      </label>
                    </div>

                    <div class="flex-visu">
                      <label>
                        <input
                          id="productos"
                          class="input-visu"
                          type="password"
                          placeholder=""
                          required=""
                          v-model="productos"
                        />
                        <span>Productos</span>
                      </label>
                      <label>
                        <input
                          id="contrasena"
                          class="input-visu"
                          type="password"
                          placeholder=""
                          required=""
                          v-model="contrasena"
                        />
                        <span>Contraseña</span>
                      </label>
                    </div>
                    
                    <button
                      type="button"
                      class="btn-modal-cancelar-visu"
                      @click="showModalVisu = false"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn-modal-save-visu">
                      Guardar
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
                    <button type="submit" class="btn-modal-save-delete"  @click="deleteUser(user.idu)">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      showModal: false,
      showModalEdit: false,
      showModalVisu: false,
      showModalAlert: false,
      searchTerm: '', //buscador
      //editedUser: {
        //   id: '',
        //   nombre: '',
        //   documento: '',
        //   login: '',
        //   perfil: '',
        //   estado: '',
        //   punto_venta: '',
        //   team_leader: '',
        //   gerente: '',
        //   productos: '',
        //   contrasena: '',
      //},
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
    //actualizar tarea (no funciona aun)
    // async updateTask(id) {
    //   try {
    //     await axios.put(`http://localhost:5000/update-tarea/${id}`, {
          
    //       nombre: this.editedUser.nombre,
    //       descripcion: this.editedUser.descripcion,
    //       estado: this.editedUser.estado,
    //     });
    //     this.showModalEdit = false; // Cerrar el modal de edición
    //     this.fetchTasks(); // Actualizar la lista de tareas
    //   } catch (error) {
    //     console.error("Error al actualizar la tarea:", error);
    //   }
    // },

    //eliminar tarea de la BD
    // async deleteUser(id_u) {
    //   try {
    //     await axios.delete(`http://localhost:5000/delete-user/${id_u}`);
    //     // Eliminar la tarea de la lista localmente
    //     this.users = this.users.filter(user => user.id !== id_u);
    //     console.log("Usuario eliminada correctamente");
    //   } catch (error) {
    //     console.error("Error al eliminar la tarea:", error);
    //   }
    // },

    async deleteUser(idu) {
      try {
        await axios.delete(`http://localhost:5000/delete-users/${idu}`);
        // Actualizar la lista de tareas después de eliminar
        this.fetchTasks();
        console.log("Tarea eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
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
    
    // editTask(tarea) {
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
