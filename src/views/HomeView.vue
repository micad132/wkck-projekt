<template>
  <div class="home">
    <h1 class="home__logo">taskList</h1>
    <p v-if="loggedUser" class="home__login">
      Jesteś zalogowany jako <span>{{ whoIsLogged }}</span>
    </p>
	<p v-else class="home__login">
		Nie jesteś zalogowany
	</p>
    <p class="home__tasks">Lista obowiązków w firmie:</p>
    <div class="home__counts">
      <div class="home__counts__count" v-if="taskAmount">{{ taskAmount }}</div>
      <div class="home__counts__count" v-else>0</div>
      <div v-if="importantAmount" class="home__counts__count important">{{importantAmount}}</div>
	  <div v-else class="home__counts__count important">{{beginImportantAmount}}</div>
    </div>
    <TaskWrapper @size="addTask" :userRole="userRole" @importantCount="countImportant" />
  </div>
</template>

<script setup>
import TaskWrapper from "../components/TaskWrapper.vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const loggedUser = auth.currentUser;
const route = useRoute();
const taskAmount = ref(null);
const whoIsLogged = ref('');
const importantAmount = ref(0);
const beginImportantAmount = ref(0);
let count = 0;
const userRole = {
  isPrezes: false,
  isPracownik: false,
  isNotLogged: false,
};
let loginName = route.params.login;

if (loggedUser) {
  if (loggedUser.email === "prezes@prezes.com") {
    userRole.isPrezes = true;
	whoIsLogged.value = 'prezes';
  } else if (loggedUser.email === "pracownik@pracownik.com") {
    userRole.isPracownik = true;
	whoIsLogged.value = 'pracownik';
  } else {
    userRole.isNotLogged = true;
  }
}

const addTask = (val) => {
  taskAmount.value = val;
};

onMounted(()=> {
	addTask();
})

const countImportant = (val) => {
	
	
	importantAmount.value = val;
}

watch(taskAmount, () => {});
</script>

<style lang="scss" scoped>
.home {
  margin-top: 5rem;
  h1,
  &__tasks,
  &__login {
    color: var(--theme-font-color);
    padding-top: 0.5rem;
  }

  h1 {
    font-size: 4rem;
    font-style: italic;
    color: var(--pure-white);
  }
  &__login {
    font-size: 2.2rem;

    & > span {
      font-weight: bold;
      color: rgb(51, 255, 0);
    }
  }

  &__tasks {
    font-size: 2rem;
  }

  &__counts {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 30%;
    max-width: 30rem;
    margin: 0.5rem auto;
    padding: 0.5rem;

    &__count {
      border: 3px solid var(--theme-button-border);
      padding: 2rem 3rem;
      color: var(--pure-white);
      font-weight: bold;

      transition: 200ms all ease-in-out;

      &.important {
        color: var(--pure-red);
      }
    }
  }
}


@media (max-width: 700px){
	.wrapper{
		width: 80%;
	}
}

@media (max-height: 600px){
  .home{
    margin-top: 2rem;
  }
}
</style>
