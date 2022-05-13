<template>
  <div class="taskWrapper__tasks__task">
    <p
      ref="taskText"
      :class="[
        isTaskNameChecked ? 'checked' : '',
        'taskWrapper__tasks__task__name',
      ]"
    >
      {{ taskItem.name }}
    </p>
    <div class="taskWrapper__tasks__task__buttons">
      <button
        v-if="userRole.isPracownik"
        ref="doneButton"
        @click="setDone()"
        :class="[
          isDone ? 'doneClicked' : '',
          'taskWrapper__tasks__task__buttons__button done',
        ]"
      >
        <fa class="icon" icon="check" />
      </button>
      <button
        v-else
        ref="doneButton"
        :class="[
          isDone ? 'doneClicked' : '',
          'taskWrapper__tasks__task__buttons__button done canceled',
        ]"
      >
        <fa class="icon" icon="check" />
      </button>
      <button
        v-if="userRole.isPrezes"
        @click="showModal = true"
        class="taskWrapper__tasks__task__buttons__button cancel"
      >
        <fa class="icon" icon="xmark" />
      </button>
      <button
        v-else
        class="taskWrapper__tasks__task__buttons__button cancel canceled"
      >
        <fa class="icon" icon="xmark" />
      </button>

      <button
        v-if="userRole.isPracownik"
        ref="helpButton"
        @click="setHelp()"
        :class="[
          isHelp ? 'helpClicked' : '',
          'taskWrapper__tasks__task__buttons__button help',
        ]"
      >
        <fa class="icon" icon="bell" />
      </button>
      <button
        v-else
        ref="helpButton"
        :class="[
          isHelp ? 'helpClicked' : '',
          'taskWrapper__tasks__task__buttons__button help canceled',
        ]"
      >
        <fa class="icon" icon="bell" />
      </button>
      <button
        v-if="userRole.isPrezes"
        ref="importantButton"
        @click="setImportant()"
        :class="[
          isImportant ? 'importantClicked' : '',
          'taskWrapper__tasks__task__buttons__button important',
        ]"
      >
        <fa class="icon" icon="circle-exclamation" />
      </button>
      <button
        v-else
        ref="importantButton"
        @click="setImportant()"
        class="taskWrapper__tasks__task__buttons__button important canceled"
      >
        <fa class="icon" icon="circle-exclamation" />
      </button>
    </div>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      title="Usunięcie"
      content="Czy chcesz usunąć to zadanie?"
      positive-text="Usuń"
      negative-text="Anuluj"
      @positive-click="submitCallback(taskItem.id)"
      @negative-click="cancelCallback"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { NModal } from "naive-ui";
import {collection, deleteDoc,doc,updateDoc,getDocs } from "firebase/firestore"
import db from '../firebase';

const props = defineProps(["taskItem", "taskList", "userRole"]);
const emit = defineEmits(['size','taskArray']);
const showModal = ref(false);
const helpButton = ref(null);
const importantButton = ref(null);
const doneButton = ref(null);
const taskText = ref(null);
const isImportant = ref(null);
const isDone = ref(null);
const isHelp = ref(null);
const isTaskNameChecked = ref(null);
const userRole = props.userRole;

onMounted(() => {});

const cancelCallback = () => {};

const submitCallback = async (id) => {

   await deleteDoc(doc(db,'tasks',id));
   fetchTasks();
   

};

const setHelp = async () => {
  //isHelp.value = !isHelp.value;
  props.taskItem.help = !props.taskItem.help;
  isHelp.value = props.taskItem.help;
  await updateDoc(doc(db,'tasks','Fg3PxVhP9qfym7UL0TDb'), {
	  isHelp: !isHelp
  })
};
const setImportant = () => {
  //isImportant.value = !isImportant.value;
  props.taskItem.important = !props.taskItem.important;
  isImportant.value = props.taskItem.important;
};
const setDone = () => {
  isDone.value = !isDone.value;
  isTaskNameChecked.value = !isTaskNameChecked.value;
  props.taskItem.done = isDone.value;
};

const fetchTasks = async () => {

	
	const tempTaskList = [];
	const taskTemp = await getDocs(collection(db,'tasks'));
	
	taskTemp.forEach(task => {
		tempTaskList.push({id:task.id, ...task.data()});
		
	})
	props.taskList.value = tempTaskList;
	console.log(props.taskList.value);
	emit("size", props.taskList.value.length);
	emit('taskArray',props.taskList.value);
}

</script>

<style lang="scss" scoped>
.taskWrapper__tasks__task {
  display: flex;
  height: 70px;
  padding: 0 1rem;
  margin-top: 1rem;

  &__name {
    flex-basis: 50%;
    border: 3px solid var(--theme-button-border);
    text-align: left;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    color: var(--theme-font-color);

    &.checked {
      text-decoration-line: line-through;
      text-decoration-color: var(--pure-white);
    }
  }

  &__buttons {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    height: 100%;

    &__button {
      width: 20%;
      height: 100%;
      padding: 1rem;
      background-color: transparent;
      border: 0;
      outline: 0;
      border: 3px solid var(--theme-button-border);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 200ms all ease-in-out;
      color: var(--theme-font-color);

      .icon {
        font-size: 1.6rem;
      }

      &.doneClicked,
      &.done:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--done-color);
      }
      &.cancel:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--canceled-color);
      }
      &.helpClicked,
      &.help:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--help-color);
      }
      &.importantClicked,
      &.important:hover {
        background-color: var(--theme-hover-button-color);
        color: var(--important-color);
      }

      &.important.canceled {
        color: var(--canceled-color);
        &:hover {
          color: var(--canceled-color);
        }
      }

      &.cancel.canceled {
        color: var(--canceled-color);
        &:hover {
          color: var(--canceled-color);
        }
      }

      &.help.canceled {
        color: var(--canceled-color);
        &:hover {
          color: var(--canceled-color);
        }
      }
      &.done.canceled {
        color: var(--canceled-color);
        &:hover {
          color: var(--canceled-color);
        }
      }
    }
  }

  &.marked {
    & > * {
      text-decoration-line: line-through;
      text-decoration-color: var(--pure-white);
    }
  }
}
</style>
