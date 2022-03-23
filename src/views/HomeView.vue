<template>
  <div class="home">
    <h1>home</h1>
	<p v-show="login">Jesteś zalogowany jako {{login}}</p>
	
	
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  

  data(){

	  return{

		  login: this.$route.params.login,
	  }

  }
  

  
}
</script>
