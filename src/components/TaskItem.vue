<template>
  <div class="taskWrapper__tasks__task">
    <p
      ref="taskText"
      :class="[
        isTaskNameChecked ? 'checked' : '',
        'taskWrapper__tasks__task__name',
      ]"
    >
      {{taskItem.name}} 
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
        @click="showModal = true"
        class="taskWrapper__tasks__task__buttons__button cancel"
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
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    />
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import { NModal } from "naive-ui";
export default {

	props: ['taskItem','taskList','userRole'],
  setup(props) {
    
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

	onMounted(()=> {

		
	})

    const cancelCallback = () => {

		
	};

    const submitCallback = () => {

		let deletingId = props.taskItem.id;
		
		props.taskList.splice(deletingId,1);
		
		
	};

    const setHelp = () => {
      //isHelp.value = !isHelp.value;
	  props.taskItem.help = !props.taskItem.help;
	  isHelp.value = props.taskItem.help;
	  
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
    return {
      helpButton,
      importantButton,
      setHelp,
      setImportant,
      doneButton,
      setDone,
      taskText,
      isImportant,
      isDone,
      isHelp,
      isTaskNameChecked,
      showModal,
      NModal,
	  cancelCallback,
	  submitCallback,
	  userRole
	  
    };
  },
  
};
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
      text-decoration-color: #fff;
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
        color: green;
      }
      &.cancel:hover {
        background-color: var(--theme-hover-button-color);
        color: red;
      }
      &.helpClicked,
      &.help:hover {
        background-color: var(--theme-hover-button-color);
        color: yellow;
      }
      &.importantClicked,
      &.important:hover {
        background-color: var(--theme-hover-button-color);
        color: rgb(212, 141, 9);
      }

	  &.important.canceled{
		  color: red;
		  &:hover{
			  color: red;
		  }
	  }

	  &.help.canceled{
		  color: red;
		  &:hover{
			  color: red;
		  }
	  }
	  &.done.canceled{
		  color: red;
		  &:hover{
			  color: red;
		  }
	  }
    }
  }

  &.marked {
    & > * {
      text-decoration-line: line-through;
      text-decoration-color: #fff;
    }
  }
}
</style>
