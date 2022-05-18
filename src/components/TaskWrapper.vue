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
            class="taskWrapper__mainoperations__buttons__button addtask"
            @click="addTask"
            v-if="userRole.isPrezes"
          >
            Dodaj task
          </button>
          <button
            v-else
            class="taskWrapper__mainoperations__buttons__button canceled"
          >
            Zła rola
          </button>
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
		  @taskArray="fetchTasks"
          v-bind:class="{ marked: isActive }"
          ref="item"
          v-for="(task, index) in taskList"
          :key="index"
          :taskItem="task"
          :taskList="taskList"
          :userRole="userRole"
		  @importantCount="countImportant"
        />
      </div>
    </div>
    <div v-if="ifButtons" class="wrapper__buttons">
      <button
        v-if="userRole.isPrezes"
        @click="markTasks()"
        class="wrapper__buttons__button"
      >
        odznacz wszystko
      </button>
      <button v-else class="wrapper__buttons__button canceled">zła rola</button>
      <button
        v-if="userRole.isPrezes"
        @click="deleteTasks()"
        class="wrapper__buttons__button"
      >
        usuń wszystko
      </button>
      <button v-else class="wrapper__buttons__button canceled">zła rola</button>
    </div>
  </div>
</template>

<script setup>
import TaskItem from "./TaskItem.vue";
import { ref, watch, onMounted, computed } from "vue";
import Toast from "vue-toastification";
import { useToast } from "vue-toastification";
import {collection, addDoc, getDocs,updateDoc, deleteDoc,doc,query,where} from "firebase/firestore"
import db from '../firebase';

const emit = defineEmits(['size']);

const props = defineProps(["userRole",'importantCount']);

let taskId = 0;
const toast = useToast();
const ifButtons = ref(false);
const taskList = ref([]);

const copyofTaskList = ref([]);
const isActive = ref(false);
const inputValue = ref(null);
const item = ref(null);
const userRole = props.userRole;
let count = 0;

const addTask = async () => {
  let listItem = inputValue.value.value;

  if (listItem.length < 5 || listItem.length > 20) {
    toast.error("Wrong task name!", {
      timeout: 2000,
    });
	inputValue.value.value = '';
    return;
  }
  await addDoc(collection(db,'tasks'),{name: listItem,isDone: false,isHelp: false, isImportant: false})
  

  inputValue.value.value = "";
  emit("size", taskList.value.length);
  toast.success("Dodano zadanie!", {
    timeout: 2000,
  });
  isActive.value = false;
  copyofTaskList.value = [...taskList.value];
  fetchTasks();
};


const countImportant = (count) => {
	emit('importantCount',count);
}

const deleteTasks =  () => {


  taskList.value.forEach(task => {
	   deleteDoc(doc(db,'tasks',task.id))
  })
 
  emit("size", taskList.value.length);
  fetchTasks();
};

const markTasks = () => {
  isActive.value = !isActive.value;
};

const changeList = (event) => {
  if (event.target.value == "important") {
 
	
	fetchImportantTask();
  } else {
	 
    fetchTasks();
  }
};

const fetchTasks = async () => {

	
	const tempTaskList = [];
	const taskTemp = await getDocs(collection(db,'tasks'));
	
	taskTemp.forEach(task => {
		tempTaskList.push({id:task.id, ...task.data()});
		
	})
	taskList.value = tempTaskList;
	count = taskList.value.reduce((total,task)=> total + task.isImportant,0)
	emit("size", taskList.value.length);
	emit('importantCount',count);
}

const fetchImportantTask = async () => {

	const tempImportantTaskList = [];
	const tasksImportant = await getDocs(query(collection(db,'tasks'),where("isImportant","==",true)));
	tasksImportant.forEach( task => {
		tempImportantTaskList.push({id:task.id,...task.data()});
	})
	console.log(tasksImportant);
	taskList.value = tempImportantTaskList;
	emit("size",taskList.value.length);
}

onMounted(() => {

  fetchTasks();

  if (taskList.value.length > 0) {
    ifButtons.value = true;
  } else {
    ifButtons.value = false;
  }
});

watch(taskList, () => {
  
  console.log(count);
  if (taskList.value.length > 0) {
    ifButtons.value = true;
  } else {
    ifButtons.value = false;
    taskId = 0;
  }
  
  
});



</script>

<style lang="scss" scoped>
.wrapper {
  height: 50vh;
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 0;

  .taskWrapper {
    height: 100%;
    width: 100%;
	border: 2px solid red;

    &__mainoperations {
      display: flex;
      padding: 1.4rem 1rem;

      &__input {
        flex-basis: 50%;
        padding: 0.5rem;
        border: 3px solid var(--theme-button-border);
        background-color: transparent;
        outline: 0;
        font-size: 1.4rem;
        color: var(--pure-white);
      }

      &__buttons {
        flex: 1;
        display: flex;
        justify-content: space-evenly;

        &__button {
          padding: 2rem;
          border: 3px solid var(--theme-button-border);
          background-color: transparent;
          font-size: 1.6rem;
          font-weight: bold;
          transition: 200ms all ease-in-out;
          color: var(--theme-font-color);

          &:hover {
            background-color: var(--theme-hover-button-color);
            color: var(--theme-hover-button-text);
          }

          &.canceled {
            color: var(--canceled-color);
            &:hover {
              color: var(--canceled-color);
            }
          }

		  &.select{
			  padding: 2rem 3rem;
		  }

		  &.addtask{
			  padding: 2rem 4rem;
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
    }
  }

  &__buttons {
    width: 100%;
    padding: 1rem;
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__button {
      border: 3px solid var(--theme-button-border);
      padding: 1.8rem 2rem;
      width: 45%;
      font-size: 1.8rem;
      transition: 200ms all ease-in-out;
      text-transform: uppercase;
      background-color: transparent;
      font-weight: bold;
      color: var(--theme-font-color);

      &:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--theme-hover-button-text);
      }

      &.canceled {
        color: var(--canceled-color);

        &:hover {
          color: var(--canceled-color);
        }
      }
    }
  }
}
</style>
