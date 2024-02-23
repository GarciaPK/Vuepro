<template>
  <div class="container">
    <div class="uno">
      <img class="claro" src="../assets/claro.png">
      <img class="separador" src="../assets/linea (1).png">
      <img class="rep" src="../assets/republica-dominicana.png">
      <h2 class="title">BIENVENIDO</h2>
      <p class="p"> Estamos encantados de recibirte aquí, donde la satisfacción de nuestros clientes es nuestra máxima prioridad. Ingresa tus credenciales para acceder a una experiencia de atención personalizada y eficiente. ¡Gracias por confiar en nosotros para satisfacer tus necesidades de comunicación!</p>
    </div>
    <div class="dos">
      <form class="login" @submit.prevent="login">

          <h1>Account</h1>

          <div class="login_field">
            <img src="../assets/usuario.png" class="icon">
            <input class="login_input" type="text" placeholder="UserName" v-model="username" id="username" required>
          </div>

          <div class="login_field">
            <img src="../assets/cerrar.png" class="icon">
            <input class="login_input" placeholder="Password" v-model="password" type="password" id="password" required>
          </div>
          <br><br>
          <button class="login_submit">
            <span class="button_text">Login Now</span>
          </button>
        </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:5000/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        const { role } = response.data;

        // Almacena el rol del usuario en el almacenamiento local
        localStorage.setItem('user', role);

        // Redirige según el rol
        this.redirectBasedOnRole(role);
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      });
    },
    redirectBasedOnRole(role) {
      // Redirige según el rol
      if (role === 'M') { // Suponiendo que el rol de administrador se identifica como 'M'
        this.$router.push('/admin'); // Redirige directamente a la página del administrador
      } else {
        this.$router.push('/user'); // Redirige a la página del dashboard para el usuario regular
      }
    }
  },
};
</script>


<style>

 @import "../css/loginPage.css";

</style>