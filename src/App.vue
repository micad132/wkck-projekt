<template>
  <div class="wrapper">
    <header>
      <nav>
        <router-link to="/">Strona główna</router-link>
        <router-link to="/about">Login</router-link>
        <router-link to="/help">Pomoc</router-link>
      </nav>
      <button @click="changeTheme" class="theme">motyw</button>
    </header>
    <router-view class="content" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword,signOut} from 'firebase/auth';

onMounted(() => {

  let auth = getAuth();
  signOut(auth);
  
  if (localStorage.getItem("theme") === "dark-theme") {
    setTheme("dark-theme");
  } else {
    setTheme("light-theme");
  }
  
});

const changeTheme = () => {
  if (localStorage.getItem("theme") === "dark-theme") {
    setTheme("light-theme");
  } else {
    setTheme("dark-theme");
  }
};

const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
};

</script>


<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import "styles/variables";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
}


html{
	font-size: 10px;
}

button {
  cursor: pointer;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100vw;
  min-height: 100vh;
  transition: 300ms all ease-in-out;
  background-color: var(--background-main);
  overflow: hidden;
}

header {
  width: 40rem;
  margin-left: auto;
  margin-bottom: 2rem;
  border: 2px solid red;
  position: absolute;
  top: 0;
  right: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  font-size: 2rem;
  color: var(--theme-font-color);
  text-decoration: none;
  margin-right: 20px;
}

nav a.router-link-exact-active {
  color: rgb(0, 255, 0);
}

nav a:hover {
  color: rgb(255, 0, 0);
}

.theme {
  padding: 1.5rem 5rem;
  border: 3px solid var(--theme-button-border);

  font-weight: bold;
  text-transform: uppercase;
  transition: 300ms all;

  background-color: transparent;
  color: #fff;
  letter-spacing: 2px;
  font-size: 1.5rem;
}

.theme:hover {
  background-color: var(--theme-hover-button-color);
  border: 3px solid var(--theme-hover-button-color);
  color: var(--theme-hover-button-text);
}


@media (max-width: 1000px){


	html{
		font-size: 7px;
	}
	

	nav a{
		font-size: 1.6rem;
	}

	
}

@media (max-width: 750px){
	header{
		width: 250px;
		

	}

	nav a{
		font-size: 1.5rem;
		padding: 0;
		margin: 0 1rem;
	}
}


@media (max-width: 700px){
	

	header{
		width: 200px;
	}
	nav{
		display: flex;
		flex-direction: column;
		gap: 1rem;
		
	}
	nav a{
		font-size: 2rem;
	}
}

</style>
