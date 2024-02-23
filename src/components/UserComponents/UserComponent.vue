<!-- UserComponent.vue -->
<template>
  <div class="container">
    <div class="table">
      <h1 class="tittle" align="left">Lista de Tareas</h1>
      <input class="search" type="text" placeholder="Search" v-model="searchTerm" @keyup.enter="searchTask">
      <button type="button" class="btn" @click="showModal = true">
        <img src="@/assets/boton-mas.png">
      </button>
      
      <table>
        <thead>
          <tr>
            <th align="center" class="nombre">Nombre</th>
            <th align="center" class="descripcion">Descripcion</th>
            <th align="center" class="estado">Estado</th>
            <th align="center" class="acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="tarea in tareas" :key="tarea.id"> -->
          <tr v-for="tarea in paginatedTasks" :key="tarea.id">
            <td align="left" class="pl-3">{{ tarea.nombre }}</td>
            <td align="left" class="pl-3">{{ tarea.descripcion }}</td>
            <td align="left" class="pl-3">{{ tarea.estado }}</td>
            <td>
              <button class="editar" @click="showModalEdit = true">
                <img src="@/assets/boligrafo.png" />
              </button>
              
              <button class="eliminar" @click="deleteTask(tarea.id)">
                <img src="@/assets/borrar.png" />
              </button>

            </td>
          </tr> 
        </tbody>
      </table>

      
        
      

      <!-- AGREGAR -->
      <transition name="fade">
        <div class="modal-overlay-add" v-if="showModal"></div>
      </transition>
      <transition name="fade">
        <div class="modal-add" v-if="showModal">
          <form class="form-add">
            <h2>Agregar Tarea</h2>
            <div class="flex-add">
              <label>
                <input
                  id="nombre"
                  class="input-add"
                  type="text"
                  placeholder=""
                  required=""
                  v-model="nombre"
                />
                <span>Nombre</span>
              </label>

              <label>
                <input
                  id="descripcion"
                  class="input-add"
                  type="text"
                  placeholder=""
                  required=""
                  v-model="descripcion"
                />
                <span>Descripcion</span>
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
            
            <button
              type="button"
              class="btn-modal-cancelar-add"
              @click="showModal = false"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-modal-save-add" @click="addTask">Guardar</button>
          </form>
        </div>
      </transition>

      <!-- EDITAR -->
      <transition name="fade">
        <div class="modal-overlay-editar" v-if="showModalEdit"></div>
      </transition>
      <transition name="fade">
        <div class="modal-editar" v-if="showModalEdit">
          <form class="form">
            <h2>Editar Tarea</h2>
            <div class="flex">
              <label>
                <input
                  id="nombre"
                  class="input"
                  type="text"
                  placeholder=""
                  required=""
                  v-model="nombre"
                />
                <span>Nombre</span>
              </label>

              <label>
                <input
                  id="descripcion"
                  class="input"
                  type="text"
                  placeholder=""
                  required=""
                  v-model="descripcion"
                />
                <span>Descripcion</span>
              </label>

              <label>
                <input
                  id="estado"
                  class="input"
                  type="text"
                  placeholder=""
                  required=""
                  v-model="estado"
                />
                <span>Estado</span>
              </label>
            </div>
            
            <button
              type="button"
              class="btn-modal-cancelar"
              @click="showModalEdit = false"
            >
              Cancelar
            </button>
            <button type="submit" class="btn-modal-save" @click="updateTask(editedTask.id)">
              Guardar
            </button>
          </form>
        </div>
      </transition>

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
      tareas: [], //que guardan los datos en esta array
      showModal: false, //mostrar formulario de añadir
      showModalEdit: false, //mostrar formulario de editar
      showModalEliminar: false, //mostrar formulario de editar
      searchTerm: '', //buscador
      currentPage: 1, // Página actual
      pageSize: 9, // Tamaño de página
    };
  },
  computed: {
    //lo usamos para el buscador search
    filteredUsers() {
      return this.tareas.filter(tarea => tarea.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
    // Calcular el número total de páginas
    totalPages() {
      return Math.ceil(this.tareas.length / this.pageSize);
    },
    // Obtener las tareas para la página actual
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tareas.slice(start, end);
    }
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    //lo usamos para obtener todos los datos de la tabla
    async fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/tareas");
        this.tareas = response.data;
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    },

    //agregar usuario nuevo
    async addTask() {
      try {
        await axios.post("http://localhost:5000/new-tarea", {
          nombre: this.nombre,
          descripcion: this.descripcion,
          estado: this.estado,
        });
        this.showModal = false;
        this.fetchTasks();
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    },

    //actualizar tarea (no funciona aun)
    // async updateTask(id) {
    //   try {
    //     await axios.put(`http://localhost:5000/update-tarea/${id}`, {
          
    //       nombre: this.editedTask.nombre,
    //       descripcion: this.editedTask.descripcion,
    //       estado: this.editedTask.estado,
    //     });
    //     this.showModalEdit = false; // Cerrar el modal de edición
    //     this.fetchTasks(); // Actualizar la lista de tareas
    //   } catch (error) {
    //     console.error("Error al actualizar la tarea:", error);
    //   }
    // },

    //eliminar tarea de la BD
    async deleteTask(id) {
      try {
        await axios.delete(`http://localhost:5000/delete-tareas/${id}`);
        // Eliminar la tarea de la lista localmente
        this.tareas = this.tareas.filter(tarea => tarea.id !== id);
        console.log("Tarea eliminada correctamente");
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    },

    //buscar tarea por su nombre
    async searchTask() {
      try {
        const response = await axios.get("http://localhost:5000/search", {
          params: { nombre: this.searchTerm }
        });
        this.tareas = response.data;
      } catch (error) {
        console.error("Error al buscar usuarios:", error);
      }
    },
    
    editTask(tarea) {
      // Establecer la tarea editada para mostrarla en el modal de edición
      this.editedTask = { tarea };
      // Mostrar el modal de edición
      this.showModalEdit = true;
    },

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
  @import "@/css/user/userComponent.css";
</style>
