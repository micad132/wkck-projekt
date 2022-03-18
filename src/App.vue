<template>
  <header>
	<nav>
		<router-link to="/">Home</router-link> 
		<router-link to="/about">Login</router-link>
		<router-link to="/help">Help</router-link>
	</nav>
	<button @click="changeTheme()" class="theme">motyw</button>
  </header>
  <router-view/>
</template>


<script>
export default {



	mounted(){

		if(localStorage.getItem('theme') === 'dark-theme')
		{
			this.setTheme('dark-theme');
		}
		else
		{
			this.setTheme('light-theme');
		}
	},
	
	methods: {

		changeTheme(){

			if(localStorage.getItem('theme') === 'dark-theme')
			{
				this.setTheme('light-theme');
			}
			else
			{
				this.setTheme('dark-theme');
			}
			
		},

		setTheme(themeName){

			localStorage.setItem('theme', themeName);
    		document.documentElement.className = themeName;

		},


	}

	
}
</script>

<style lang="css">


@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import 'styles/variables';
  
   

	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Montserrat', sans-serif;
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
  
  
  background-color: var(--background-main);
}



header{

	
	width: 300px;
	margin-left: auto;
	margin-bottom: 20px;

}
	

	nav {
	padding: 30px;

	}
	

	nav a {
		font-weight: bold;
		font-size: 20px;
		color: #2c3e50;
		text-decoration: none;
		margin-right: 20px;
		

		

		
	}
	

	nav a.router-link-exact-active{

		color: #fff;
	}

	nav a:hover{

		color: #fff;
	}


	.theme{
		
		padding: 10px 30px;
		border: 3px solid var(--theme-button-border);
		border-radius: 5px;
		font-weight: bold;
		text-transform: uppercase;
		transition: 300ms all;
		background-color: #17252A;
		background-color: transparent;
		color: #fff;
		letter-spacing: 2px;
		

		
	}

	.theme:hover{

		background-color: #fff;
		border: 3px solid #fff;
		color: #17252A;
	}



#app.darktheme{


	 
	 
	 
 }



</style>
