<template>
  <div class="wrapper">
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
            @click="addTask"
			v-if="userRole.isPrezes"
			
          >
            Dodaj task
          </button>
		  <button
		   v-else
		   class="taskWrapper__mainoperations__buttons__button canceled"
		  
		  >Zła rola</button>
          <select
            name="taskWrapper__mainoperations__buttons__select"
            class="taskWrapper__mainoperations__buttons__button select"
			@change="changeList($event)"
			
			
          >
            <option value="all">WSZYSTKIE</option>
            <option value="important">WAŻNE</option>
          </select>
        </div>
      </div>
      <div class="taskWrapper__tasks">
        <TaskItem
          v-bind:class="{ marked: isActive }"
          ref="item"
          v-for="(task, index) in taskList"
          :key="index"
          :taskItem="task"
          
		  :taskList="taskList"
		  :userRole="userRole"
        />
      </div>
    </div>
    <div v-if="ifButtons" class="wrapper__buttons">
      <button v-if="userRole.isPrezes" @click="markTasks()" class="wrapper__buttons__button">
        odznacz wszystko
      </button>
	  <button v-else class="wrapper__buttons__button canceled">
        zła rola
      </button>
      <button v-if="userRole.isPrezes" @click="deleteTasks()" class="wrapper__buttons__button">
        usuń wszystko
      </button>
	  <button v-else  class="wrapper__buttons__button canceled">
        zła rola
      </button>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { ref, watch,onMounted, computed } from "vue";
import Toast from "vue-toastification";
import { useToast } from "vue-toastification";
export default {
  components: { TaskItem },
  props: ['userRole'],
  setup(props, context) {
    let taskId = 0;
    const toast = useToast();
    const ifButtons = ref(false);
    //const taskList = ref([]);
    const taskList = ref([{

	   	id: 0,
    	name: 'sprzatanie',
    	done: false,
    	help: false,
    	important: false,
    },
    {
    	id: 1,
	   	name: 'kawka',
	   	done: false,
    	help: false,
    	important: false,
    },
    {
    	id: 2,
    	name: 'pisanie',
    	done: false,
	   	help: false,
	   	important: false
	   }])
	const copyofTaskList = ref([]);
    const isActive = ref(false);
    const inputValue = ref(null);
    const item = ref(null);
	let importantCount = 0;
    const userRole = props.userRole;
	

    const addTask = () => {
      let listItem = inputValue.value.value;
      
      if (listItem.length < 5 || listItem.length > 20) {
        toast.error("Wrong task name!", {
          timeout: 2000,
        });
        return;
      }
      taskList.value.push({ id: taskId, name: listItem,done:false,help:false,important: false });
      inputValue.value.value = "";
      context.emit("size", taskList.value.length);
      toast.success("Task added", {
        timeout: 2000,
      });
      isActive.value = false;
	  ++taskId;
	  copyofTaskList.value = [...taskList.value];
    };

    const deleteTasks = () => {
      taskList.value.length = 0;
      context.emit("size", taskList.value.length);
    };

    const markTasks = () => {
      isActive.value = !isActive.value;
      
    };

	const changeList = (event) => {
		
		if(event.target.value == 'important'){
			taskList.value = filteredTaskList();
		}
		else{
			taskList.value = copyofTaskList.value;
		}
	}

	onMounted(()=> {
		if(taskList.value.length>0){
			ifButtons.value = true;
		}
		else{
			ifButtons.value = false;
		}
	})

    watch(taskList.value, () => {
	  console.log('siemanko');
      if (taskList.value.length > 0) {
        ifButtons.value = true;
      }
	  else{
		  ifButtons.value = false;
		  taskId = 0;
	  }
	

	//   let  newArr = filteredTaskList();
	//   importantCount = newArr.length;
	//   console.log(importantCount);
    });

	const filteredTaskList = () => {

		return taskList.value.filter(task => task.important == true);
		
	}

	

    return {
      taskList,
      inputValue,
      addTask,
      ifButtons,
      toast,
      deleteTasks,
      markTasks,
      isActive,
      item,
	  filteredTaskList,
	  changeList,
	  copyofTaskList,
	  userRole,
	  importantCount
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 50vh;
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 0;

  .taskWrapper {
    height: 100%;
    width: 100%;

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
          color: var(--theme-font-color);

          &:hover {
            background-color: var(--theme-hover-button-color);
            color: var(--theme-hover-button-text);
          }

		  &.canceled{
			  color: red;
			  &:hover{
				  color: red;
			  }
		  }
        }
      }
    }
    &__tasks {
      width: 100%;

      height: 80%;
      overflow: hidden;
      overflow-y: auto;

      &.marked {
        font-size: 5rem;
      }

      //   border: 3px solid var(--theme-button-border);
    }
  }

  &__buttons {
    width: 100%;
    padding: 1rem;
	margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__button {
      border: 3px solid var(--theme-button-border);
      padding: 0.8rem 2rem;
      width: 45%;
      font-size: 1.4rem;
      transition: 200ms all ease-in-out;
      text-transform: uppercase;
      background-color: transparent;
      font-weight: bold;
      color: var(--theme-font-color);


	  





      &:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--theme-hover-button-text);
      }

	  &.canceled{
		  color: red;
		
		&:hover{
			color: red;
		}
	  }
    }
  }
}
</style>
