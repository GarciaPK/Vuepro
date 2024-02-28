<template>
  <div>
    <aside class="sidebar-admin">
      <div class="admin-info">
        <img src="../assets/admin.jpg" />
        <p>Admin</p>
        <hr />
      </div>
      <br>
      <div class="menu-admin">
        <button @click="navigate('Inicio')" class="btn-home-admin">
          <img class="home-admin" align="left" src="../assets/casa.png" /> <a href="/admin">Inicio</a>
        </button>
        <div :class="{ 'dropdown-open': isDropdownOpen1 }" class="dropdown-admin">
          <button @click="toggleDropdown(1)" class="btn-dropdown-admin">
            <img class="tareas" align="left" src="../assets/lista-de-tareas.png" />Usuarios
            <img
              class="flecha"
              align="right"
              src="../assets/flecha-hacia-abajo.png"
            />
          </button>
          <ul v-if="isDropdownOpen1" class="dropdown-menu-admin">
            <li><a href="/admin/listar-usuarios">Listar Usuarios</a></li>
            <!-- <li><a href="#">tarea 2</a></li>
            <li><a href="#">tarea 3</a></li> -->
          </ul>
        </div>
        <div :class="{ 'dropdown-open': isDropdownOpen2 }" class="dropdown-admin">
          <button @click="toggleDropdown(2)" class="btn-dropdown-admin">
            <img class="tareas" align="left" src="../assets/google-docs.png" /> Reportes
            <img
              class="flecha"
              align="right"
              src="../assets/flecha-hacia-abajo.png"
            />
          </button>
          <ul v-if="isDropdownOpen2" class="dropdown-menu-admin">
            <li><a href="#">Subopción 1</a></li>
            <li><a href="#">Subopción 2</a></li>
            <li><a href="#">Subopción 3</a></li>
          </ul>
        </div>
        <div :class="{ 'dropdown-open': isDropdownOpen3 }" class="dropdown-admin">
          <button @click="toggleDropdown(3)" class="btn-dropdown-admin">
            <img align="left" class="tareas" src="../assets/grupo.png" />Parametrización
            <img
              class="flecha"
              align="right"
              src="../assets/flecha-hacia-abajo.png"
            />
          </button>
          <ul v-if="isDropdownOpen3" class="dropdown-menu-admin">
            <li><a href="#">Subopción 1</a></li>
            <li><a href="#">Subopción 2</a></li>
            <li><a href="#">Subopción 3</a></li>
          </ul>
        </div>
      </div>
      <br>
      <hr />
      <div class="logout">
        <button class="btnexit" @click="logout">
          <a href="/"><img class="imgexit" src="../assets/exit.png" align="center" /></a
          >
        </button>
      </div>
    </aside>
  </div>
  <div class="component-admin">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen1: false,
      isDropdownOpen2: false,
      isDropdownOpen3: false,
    };
  },
  methods: {
    toggleDropdown(index) {
      switch (index) {
        case 1:
          this.isDropdownOpen1 = !this.isDropdownOpen1;
          this.isDropdownOpen2 = false;
          this.isDropdownOpen3 = false;
          break;
        case 2:
          this.isDropdownOpen2 = !this.isDropdownOpen2;
          this.isDropdownOpen1 = false;
          this.isDropdownOpen3 = false;
          break;
        case 3:
          this.isDropdownOpen3 = !this.isDropdownOpen3;
          this.isDropdownOpen1 = false;
          this.isDropdownOpen2 = false;
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

  @import "../css/admin/adminPage.css";

</style>