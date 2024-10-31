<template>
  <div id="app">
    <nav>
      <router-link to="/alunos">Alunos</router-link>
      <router-link to="/cavalos">Cavalos</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
}
</style>







<!-- <template>
  <div id="app">
    <AlunosList />
  </div>
</template>

<script>
import AlunosList from './components/AlunosList.vue';

export default {
  name: 'App',
  components: {
    AlunosList
  }
};
</script> -->





