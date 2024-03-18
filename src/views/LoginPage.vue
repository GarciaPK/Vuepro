<template>
  <div class="container-login">
    <div class="uno-login">
      <img class="claro-login" src="../assets/claro.png">
      <img class="separador-login" src="../assets/linea-vertical.png">
      <img class="pais-login" src="../assets/republica-dominicana.png">
      <h2 class="title-login">BIENVENIDO</h2>
      <p class="parrafo-login"> Estamos encantados de recibirte aquí, donde la satisfacción de nuestros clientes es nuestra máxima prioridad. Ingresa tus credenciales para acceder a una experiencia de atención personalizada y eficiente. <strong>¡Gracias por confiar en nosotros para satisfacer tus necesidades de comunicación!</strong> </p>
    </div>
    <div class="dos-login">
      <form class="login" @submit.prevent="login">

          <h1>Account</h1>

          <div class="login_field">
            <img src="../assets/usuario.png" class="icon">
            <input class="login_input" type="text" placeholder="Document*" v-model="document" id="document" required>
          </div>

          <div class="login_field">
            <img src="../assets/cerrar.png" class="icon">
            <input class="login_input" placeholder="Password*" v-model="password" type="password" id="password" required>
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
      document: '',
      password: ''
    };
  },
  methods: {
    login() {
      const auth = {
        Document: this.document,
        Password: this.password
      }
      axios.post('https://localhost:44355/api/AuthToken/',auth,{
        headers: {
        'Content-Type': 'application/json'
      }
      })
      .then(response => {
        const { role } = response.data.user; 
        const token = response.data.token;
        // Almacena el rol del usuario en el almacenamiento local
        localStorage.setItem('tokenDeAcceso', token);
        localStorage.setItem('user', role.name);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Redirige según el rol
        this.redirectBasedOnRole(role.name);
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        console.log('ROLE:',this.role);
        alert('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      });
    },
    redirectBasedOnRole(role) {
      // Redirige según el rol
      if (role === 'admin') { // Suponiendo que el rol de administrador se identifica como 'M'
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