<template>
  <div>
    <aside class="sidebar">
      <div class="user-info">
        <img src="../assets/erik-lucatero-d2MSDujJl2g-unsplash.jpg" alt="Imagen de Usuario" />
        <p>User</p>
      </div>
      <hr />
      <br>
      <div class="menu">
        <button @click="navigate('Inicio')" class="btn-home">
          <img class="home" align="left" src="../assets/casa.png" /> <a href="/user">Inicio</a>
        </button>
        <div :class="{ 'dropdown-open': isDropdownOpen1 }" class="dropdown">
          <button @click="toggleDropdown(1)" class="btn-dropdown">
            <img class="tareas" align="left" src="../assets/lista-de-tareas.png" />Tareas
            <img
              class="flecha"
              align="right"
              src="../assets/flecha-hacia-abajo.png"
            />
          </button>
          <ul v-if="isDropdownOpen1" class="dropdown-menu">
            <li><a href="/user/tarea">Listar Tareas</a></li>
            <li><a href="">Subopción 2</a></li>
            <li><a href="#">Subopción 3</a></li>
          </ul>
        </div>
        <div :class="{ 'dropdown-open': isDropdownOpen2 }" class="dropdown">
          <button @click="toggleDropdown(2)" class="btn-dropdown">
            <img class="tareas" align="left" src="../assets/google-docs.png" /> Documentos
            <img
              class="flecha"
              align="right"
              src="../assets/flecha-hacia-abajo.png"
            />
          </button>
          <ul v-if="isDropdownOpen2" class="dropdown-menu">
            <li><a href="#">Subopción 1</a></li>
            <li><a href="#">Subopción 2</a></li>
            <li><a href="#">Subopción 3</a></li>
          </ul>
        </div>
      </div>
      <br>
      <hr />
      <div class="logout">
        <button class="btn-exit" @click="logout">
          <img src="../assets/cerrar-sesion (1).png" align="left" class="exit" /><a href="/"
            >EXIT</a
          >
        </button>
      </div>
    </aside>
  </div>
  <div class="component-user">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen1: false,
      isDropdownOpen2: false,
    };
  },
  methods: {
    toggleDropdown(index) {
      switch (index) {
        case 1:
          this.isDropdownOpen1 = !this.isDropdownOpen1;
          this.isDropdownOpen2 = false;
          break;
        case 2:
          this.isDropdownOpen2 = !this.isDropdownOpen2;
          this.isDropdownOpen1 = false;
          break;
        default:
          break;
      }
    },
    navigate(option) {
      // Implementa la navegación según la opción seleccionada
      console.log(`Navegando a: ${option}`);
    },
    logout() {
      // Implementa la lógica de salida
      console.log("Saliendo...");
    },
  },
};
</script>

<style>
 @import "../css/user/userPage.css";
</style>
