<template>
  <div class="wrapper">
    <h1>Zaloguj się</h1>

    <form @submit.prevent class="wrapper__form" autocomplete="off">
      <label>Email:</label>
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
      <button v-if="isLogged" @click="logoutHandler">Wyloguj sie</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const toast = useToast();
const router = useRouter();
const errorMsg = ref("");
let auth;
const isLogged = ref(false);
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

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  });
});

const submitForm = (event, name) => {
  event.preventDefault();

  console.log(loginInfo.value.name);
  console.log(loginInfo.value.password);
  signInWithEmailAndPassword(
    auth,
    loginInfo.value.name,
    loginInfo.value.password
  )
    .then((res) => {
      console.log(auth.currentUser);
      //let login = loginValidation(name);
      router.push({ name: "home", params: { login: loginInfo.value.name } });
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Niepoprawny email";
          break;
        case "auth/user-not-found":
          errorMsg.value = "Nie ma takiego konta";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Niepoprawne haslo";
          break;
        default:
          errorMsg.value = "Niepoprawne dane";
          break;
      }
      // toast.error(errorMsg.value,{
      // 	timeout: 2000,
      // });
      loginInfo.value.name = "";
      loginInfo.value.password = "";
    });
};

const logoutHandler = () => {
  signOut(auth).then(() => {
    router.push({ name: "home" });
  });
};
</script>

<style scoped lang="scss">
.wrapper {
  max-width: 120rem;
  margin: 0 auto;
  margin-top: 17rem;
  h1 {
    margin-bottom: 0px;
    color: var(--theme-font-color);
  }

  .wrapper__form {
    border-radius: 10px;

    width: 70%;
	margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    align-items: center;
    background-color: transparent;
    
    border: 2px solid red;

    label {
      font-size: 1.6rem;
      font-weight: bold;
      color: var(--theme-font-color);
    }

    input {
      width: 30%;
      border: 3px solid var(--theme-button-border);
      background-color: transparent;
      padding: 10px;
      outline: 0;
      margin: 1rem 0;
      transition: 300ms all ease-in-out;
      color: var(--pure-white);

      &:focus {
        width: 40%;
        color: var(--pure-white);
      }
    }

    button {
      margin-top: 2rem;
      width: 30%;
      padding: 1rem 3rem;
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
}
</style>
