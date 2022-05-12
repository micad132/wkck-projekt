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

onMounted(() => {
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
  width: 400px;
  margin-left: auto;
  margin-bottom: 20px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  font-size: 20px;
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
  padding: 1rem 3rem;
  border: 3px solid var(--theme-button-border);

  font-weight: bold;
  text-transform: uppercase;
  transition: 300ms all;

  background-color: transparent;
  color: #fff;
  letter-spacing: 2px;
  font-size: 1em;
}

.theme:hover {
  background-color: var(--theme-hover-button-color);
  border: 3px solid var(--theme-hover-button-color);
  color: var(--theme-hover-button-text);
}
</style>
