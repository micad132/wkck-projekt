<template>
  <div class="home">
    <h1 class="home__logo">taskList</h1>
    <p v-if="loginName" class="home__login">
      Jesteś zalogowany jako <span>{{ loginName }}</span>
    </p>
    <p class="home__tasks">Lista obowiązków w firmie:</p>
    <div class="home__counts">
      <div class="home__counts__count" v-if="taskAmount">{{ taskAmount }}</div>
      <div class="home__counts__count" v-else>0</div>
      <div class="home__counts__count important">0</div>
    </div>
    <TaskWrapper @size="addTask" :userRole="userRole" />
  </div>
</template>

<script>
import TaskWrapper from "../components/TaskWrapper.vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "HomeView",
  components: { TaskWrapper },

  setup() {
    const route = useRoute();
    const taskAmount = ref(null);
    const userRole = {
      isPrezes: false,
      isPracownik: false,
    };
    let loginName = route.params.login;

    if (loginName === "prezes") {
      userRole.isPrezes = true;
    } else if (loginName === "pracownik") {
      userRole.isPracownik = true;
    }

    const addTask = (val) => {
      taskAmount.value = val;
      
    };

    watch(taskAmount, () => {});

    return { taskAmount, addTask, loginName, userRole };
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: -5rem;
  h1,
  &__tasks,
  &__login {
    color: var(--theme-font-color);
    padding-top: 0.5rem;
  }

  h1 {
    font-size: 40px;
    font-style: italic;
    color: var(--pure-white);
  }
  &__login {
    font-size: 22px;

    & > span {
      font-weight: bold;
      color: rgb(51, 255, 0);
    }
  }

  &__tasks {
    font-size: 20px;
  }

  &__counts {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 30%;
    max-width: 300px;
    margin: 0.5rem auto;
    padding: 0.5rem;

    &__count {
      border: 3px solid var(--theme-button-border);
      padding: 1.2rem 1.4rem;
      color: var(--pure-white);
      font-weight: bold;

      transition: 200ms all ease-in-out;

      &.important {
        color: var(--pure-red);
      }
    }
  }
}
</style>
