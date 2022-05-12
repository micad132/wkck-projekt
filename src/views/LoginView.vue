<template>
  <div class="wrapper">
    <h1>Zaloguj się</h1>

    <form @submit.prevent class="wrapper" autocomplete="off">
      <label>Login:</label>
      <input
        v-model="loginInfo.name"
        type="text"
        autocomplete="off"
        autofocus
      />
      <label>Hasło:</label>
      <input
        v-model="loginInfo.password"
        type="text"
        autocomplete="off"
        style="-webkit-text-security: disc"
      />
      <button @click="submitForm($event, loginInfo)">Zaloguj</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const loginInfo = ref({
  name: "",
  password: "",
});
const loginData = ref({
  worker: {
    workerName: "pracownik",
    workerPassword: "pracownik",
  },
  prezes: {
    prezesName: "prezes",
    prezesPassword: "prezes",
  },
});

const submitForm = (event, name) => {
  event.preventDefault();
  let login = loginValidation(name);
  if (login) {
    router.push({ name: "home", params: { login: login } });
  }
};

const loginValidation = (nameParameter) => {
  const { workerName, workerPassword } = loginData.value.worker;
  const { prezesName, prezesPassword } = loginData.value.prezes;
  const { name, password } = nameParameter;
  if (name === workerName && password === workerPassword) {
    return "pracownik";
  }
  if (name === prezesName && password === prezesPassword) {
    return "prezes";
  } else {
    toast.error("Bad login!", {
      timeout: 2000,
    });
    loginInfo.value.name = "";
    loginInfo.value.password = "";
    return;
  }
};
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 20px;
  color: var(--theme-font-color);
}

.wrapper {
  border-radius: 10px;
  margin: 0 auto;
  width: 70%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  background-color: transparent;

  label {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--theme-font-color);
  }

  input {
    width: 50%;
    border: 3px solid var(--theme-button-border);
    background-color: transparent;
    padding: 10px;
    outline: 0;
    margin: 10px 0;
    transition: 300ms all ease-in-out;
    color: var(--pure-white);

    &:focus {
      width: 60%;
      color: var(--pure-white);
    }
  }

  button {
    margin-top: 10px;
    width: 50%;
    padding: 1rem 0;
    border: 0;
    border: 3px solid var(--theme-button-border);
    font-size: 1.2em;
    font-weight: bold;
    background-color: transparent;
    color: var(--theme-font-color);
    text-transform: uppercase;
    transition: 300ms all;

    &:hover,
    &:focus {
      background-color: var(--theme-hover-button-color);
      border: 3px solid var(--theme-hover-button-color);
      color: var(--theme-hover-button-text);
      outline: 0;
    }
  }
}
</style>
