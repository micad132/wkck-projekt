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
				console.log(name);
				
				this.$router.push({name: 'home', params: {login: name}});
			}
			
			

		}

	}
}
</script>

<style scoped lang="scss">



	h1{
		margin-bottom: 20px;
	}

	.wrapper{

		background-image: linear-gradient(45deg,#C3A8EE,#F5C1EA);
		border-radius: 20px;
		margin: 0 auto;
		width: 70%;
		max-width: 1200px;
		display: flex;
		flex-direction: column;
		padding: 40px;
		align-items: center;

		
		label{

			font-weight: bold;

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
			border: 2px solid #e996b6;
			border-radius: 20px;
			font-weight: bold;
			background-color: #e996b6;
			color: rgba(255, 255, 255, 0.788);
			text-transform: uppercase;
			transition: 300ms all;
			outline-color: #e996b6;

			&:hover{

			background-color: #42b983;
			border: 2px solid #42b983;
			color: #fff;
		}
		}
	}

</style>
