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
		<span>Dane dla Prezesa:</span> login: prezes hasło: prezes <br/>
		<span>Dane dla Pracownika:</span> login: pracownik hasło: pracownik
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">

  .wrapper {
    background-color: transparent;
    margin: 0 auto;
    width: 70%;
    max-width: 1200px;
    padding: 40px;
    
    border: 3px solid var(--theme-button-border);

    h1 {
      color: var(--theme-font-color);
    }

    ul {
      li {
        margin-top: 20px;
        font-size: 20px;
        text-align: justify;
        color: var(--theme-font-color);
        font-weight: 600;

		span{
		   font-size: 22px;
		   color: var(--pure-red);
		   margin-right: 10px;
		}
		
      }
    }
  }

</style>
