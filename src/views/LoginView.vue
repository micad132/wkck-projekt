<template>

  <h1>Zaloguj się</h1>
  
  <form @submit.prevent class="wrapper">
	  
	  <label>Login:</label>
	  <input v-model="loginName" type="text">
	  <label>Hasło:</label>
	  <input type="password">
	  <button @click="submitForm(loginName)">Zaloguj</button>

  </form>
</template>

<script>
export default {

	
	data(){

		return{

			loginName: '',

		}


		
	},
	
	methods: {

		submitForm(name){


			
			if(name)
			{
				
				
				this.$router.push({name: 'home', params: {login: name}});
			}
			
			

		}

	}
}
</script>

<style scoped lang="scss">



	h1{
		margin-bottom: 20px;
		color: var(--theme-font-color);
	}

	.wrapper{

		//background-image: linear-gradient(45deg,#C3A8EE,#F5C1EA);
		border-radius: 10px;
		margin: 0 auto;
		width: 70%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		padding: 40px;
		align-items: center;
		background-color: transparent;
		border: 3px solid var(--theme-button-border);

		
		label{

			font-weight: bold;
			color: var(--theme-font-color);

		}

		input{

			width: 50%;
			border: 0;
			border-radius: 10px;
			padding: 10px;
			outline: 0;
			margin: 10px 0;
		}

		button{

			margin-top: 10px;
			padding: 10px 50px;
			border: 0;
			border: 3px solid var(--theme-button-border);
			border-radius: 20px;
			font-weight: bold;
			background-color: transparent;
			color: var(--theme-font-color);
			text-transform: uppercase;
			transition: 300ms all;
			outline-color: #e996b6;

			&:hover{

			background-color: var(--theme-hover-button-color);
			border: 3px solid var(--theme-hover-button-color);
			color: var(--theme-hover-button-text);
		}
		}
	}

</style>
