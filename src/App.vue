<template>
  <header>
	<nav>
		<router-link to="/">Home</router-link> 
		<router-link to="/about">Login</router-link>
		<router-link to="/help">Help</router-link>
	</nav>
	<button @click="changeTheme" class="theme">motyw</button>
  </header>
  <router-view/>
</template>


<script>
export default {
	
	methods: {


		changeTheme(){

			let view = document.getElementById('app');
			view.classList.toggle('darktheme');
			
		}


	}
}
</script>

<style lang="scss">


	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}


	button{

		cursor: pointer;
	}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(45deg,#B6C1D4,#EC68B1);
}

 #app.darktheme{


	 background-image: linear-gradient(45deg,#484C91,#929BEF);
 }

header{

	
	width: 300px;
	margin-left: auto;
	margin-bottom: 20px;
	

	nav {
	padding: 30px;
	

	a {
		font-weight: bold;
		font-size: 20px;
		color: #2c3e50;
		text-decoration: none;
		margin-right: 20px;
		

		&.router-link-exact-active {
		color: #42b983;
		}

		&:hover{

			color: #fff;
		}
	}
	}

	.theme{
		
		padding: 10px 30px;
		border: 2px solid black;
		border-radius: 20px;
		font-weight: bold;
		text-transform: uppercase;
	}

}


</style>
