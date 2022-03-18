<template>
  <div class="home">
    <h1>home</h1>
	<p v-if="login">Jesteś zalogowany jako {{login}}</p>
	
	
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  props: ['login'],

  data(){

	  return{

		  login: this.$route.params.login,
	  }

  }
  

  
}
</script>
