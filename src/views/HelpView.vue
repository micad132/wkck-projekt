<template>
  <div class="wrapper">
    <h1>Jak korzystać z aplikacji</h1>
    <ul>
      <li>
        Aplikacja polega na zarządzaniu taskami w przykładowej firmie. Zadania-taski można dodawać, usuwać, oznaczać jako ważne lub te w których potrzebna jest pomoc.
		Sama aplikacja posiada jasny i ciemny motyw, który zmienia się po nacisnięciu przycisku ,,MOTYW". Jednakże, aby prawidłowo korzystać z aplikacji należy się zalogować.
      </li>
      <li>
        Aplikacja rozróżnia dwa rodzaje użytkowników: prezesa i pracownika. Prezes może dodawać zadania, usuwać je, oznaczać jako ważne lub jednocześnie wszystkie usunąć lub oznaczyć jako wykonane.
		Pracownik natomiast może oznaczać zadania jako wykonane lub jako zadania z którymi potrzebuje pomocy. Zarówno pracownik jak i prezes mogą wyświetlać z listy wszystkie zadania lub te wyłącznie ważne.
		<br/>
		<span>Dane dla Prezesa:</span> email: prezes@prezes.com hasło: prezes <br/>
		<span>Dane dla Pracownika:</span> email: pracownik@pracownik.com hasło: pracownik
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";

const auth = getAuth();
const loggedUser = auth.currentUser;
</script>

<style scoped lang="scss">

  .wrapper {
	
    background-color: transparent;
    margin: 0 auto;
    width: 70%;
    max-width: 120rem;
    padding: 4rem;
	margin-top: 17rem;
    
    border: 3px solid var(--theme-button-border);

    h1 {
      color: var(--theme-font-color);
    }

    ul {
      li {
        margin-top: 2rem;
        font-size: 2rem;
        text-align: justify;
        color: var(--theme-font-color);
        font-weight: 600;

		span{
		   font-size: 2.2rem;
		   color: var(--pure-red);
		   margin-right: 1rem;
		}
		
      }
    }
  }

</style>
