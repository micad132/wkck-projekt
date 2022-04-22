<template>
  <div class="taskWrapper">
    <div class="taskWrapper__mainoperations">
      <input
        class="taskWrapper__mainoperations__input"
        type="text"
        name=""
        id=""
        ref="inputValue"
      />
      <div class="taskWrapper__mainoperations__buttons">
        <button
          class="taskWrapper__mainoperations__buttons__button"
          @click="addTask()"
        >
          Add task
        </button>
        <select
          name="taskWrapper__mainoperations__buttons__select"
          class="taskWrapper__mainoperations__buttons__button select"
        >
          <option value="all">WSZYSTKIE</option>
          <option value="important">WAŻNE</option>
        </select>
      </div>
    </div>
    <div class="taskWrapper__tasks">
      <TaskItem
        v-for="(task, index) in taskList"
        :key="index"
        :taskName="task"
      />
    </div>
    
	
  </div>
  
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { ref } from "vue";
export default {
  components: { TaskItem },
  setup(props, context) {
    const taskList = ref([]);
    const inputValue = ref(null);
    const addTask = () => {
      let listItem = inputValue.value.value;
      if (listItem.length < 5 || listItem.length > 20) {
        return;
      }
      taskList.value.push(listItem);
      inputValue.value.value = "";
      context.emit("addTask", taskList.value.length);
    };

    return { taskList, inputValue, addTask };
  },
};
</script>

<style lang="scss" scoped>
.taskWrapper {
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  border: 2px solid blue;
  overflow: hidden;
  overflow-y: auto;
  height: 55vh;

  &__mainoperations {
    display: flex;
    padding: 1.4rem 1rem;

    &__input {
      flex-basis: 50%;
      padding: 0.5rem;
      border: 3px solid var(--theme-button-border);
      background-color: transparent;
      outline: 0;
      font-size: 1.2rem;
      color: #fff;
    }

    &__buttons {
      flex: 1;
      display: flex;
      justify-content: space-evenly;

      &__button {
        padding: 1rem;
        border: 3px solid var(--theme-button-border);
        background-color: transparent;
        font-size: 1.2rem;
        font-weight: bold;
        transition: 200ms all ease-in-out;

        &:hover {
          background-color: var(--theme-hover-button-color);
          color: var(--theme-hover-button-text);
        }
      }
    }
  }
  &__tasks {
    width: 100%;
  }
}
</style>
