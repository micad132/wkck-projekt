<template>
  <div class="taskWrapper__tasks__task">
    <p ref="taskText" class="taskWrapper__tasks__task__name">{{taskName}}</p>
    <div class="taskWrapper__tasks__task__buttons">
      <button ref="doneButton" @click="setDone()" class="taskWrapper__tasks__task__buttons__button done"><fa class="icon" icon="check"/></button>
      <button class="taskWrapper__tasks__task__buttons__button cancel"><fa class="icon" icon="xmark"/></button>
      <button  ref="helpButton" @click="setHelp()" class="taskWrapper__tasks__task__buttons__button help"><fa class="icon" icon="bell"/></button>
      <button ref="importantButton" @click="setImportant()" class="taskWrapper__tasks__task__buttons__button important"><fa class="icon" icon="circle-exclamation"/></button>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  setup() {

	  const helpButton = ref(null);
	  const importantButton = ref(null);
	  const doneButton = ref(null);
	  const taskText = ref(null);
	  const setHelp = () => {
		  helpButton.value.style = "background-color: var(--theme-hover-button-color); color: yellow;"
	  };
	  const setImportant = () => {
		  importantButton.value.style = "background-color: var(--theme-hover-button-color); color: rgb(212, 141, 9);"
	  }
	  const setDone = () => {
		  doneButton.value.style = "background-color: var(--theme-hover-button-color); color: green;"
		  taskText.value.style = "text-decoration-line: line-through;text-decoration-color: #fff;"

	  }
	  return{
		  helpButton,importantButton,setHelp,setImportant,doneButton,setDone,taskText
	  };
  },
  props: ['taskName'],
};
</script>

<style lang="scss" scoped>
.taskWrapper__tasks__task {
  
  display: flex;
  height: 70px;
  padding: 0 1rem;
  margin-top: 1rem;

  

  &__name{
	  flex-basis: 50%;
	  border: 3px solid var(--theme-button-border);
	  text-align: left;
	  padding-left: 1rem;
	  display: flex;
	  align-items: center;
	  font-size: 1.6rem;
	  color: var(--theme-font-color);
  }

  &__buttons{
	  flex: 1;
	  display: flex;
	  justify-content: space-evenly;
	  height: 100%;
	  
	  

	  &__button{
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
		

		  .icon{
			  font-size: 1.6rem;
			//   color: var(--theme-font-color);
		  }

		  &.done:hover{
			  background-color: var(--theme-hover-button-color);
			  color: green;
		  }
		  &.cancel:hover{
			  background-color: var(--theme-hover-button-color);
			  color: red;
		  }
		  &.help:hover{
			  background-color: var(--theme-hover-button-color);
			  color: yellow;
		  }
		  &.important:hover{
			  background-color: var(--theme-hover-button-color);
			  color: rgb(212, 141, 9);
		  }

		  
	  }
  }

  &.marked{

	 
		  
		  & > *{
			  text-decoration-line: line-through;
			  text-decoration-color: #fff;
		  }
	  
  }
}
</style>
