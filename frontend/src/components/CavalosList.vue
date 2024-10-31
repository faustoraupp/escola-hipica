<template>
    <div>
      <h1>Lista de Cavalos</h1>
      <button @click="cavaloParaEditar = {}">Cadastrar Novo Cavalo</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cavalo in cavalos" :key="cavalo.id">
            <td>{{ cavalo.id }}</td>
            <td>{{ cavalo.nome }}</td>
            <td>{{ cavalo.idade }}</td>
            <td>{{ cavalo.raça }}</td>
            <td>{{ cavalo.sexo }}</td>
            <td>{{ cavalo.observacoes }}</td>
            <td>
              <button @click="editarCavalo(cavalo)">Editar</button>
              <button @click="excluirCavalo(cavalo.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <CavaloForm v-if="cavaloParaEditar" :cavaloInicial="cavaloParaEditar" @cavaloSalvo="atualizarLista" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CavaloForm from './CavaloForm.vue';
  
  export default {
    name: 'CavalosList',
    components: { CavaloForm },
    data() {
      return {
        cavalos: [],
        cavaloParaEditar: null
      };
    },
    methods: {
      async fetchCavalos() {
        try {
          const response = await axios.get('http://localhost:3000/cavalos');
          this.cavalos = response.data;
        } catch (error) {
          console.error('Erro ao buscar cavalos:', error);
        }
      },
      editarCavalo(cavalo) {
        this.cavaloParaEditar = { ...cavalo };
      },
      async excluirCavalo(id) {
        try {
          await axios.delete(`http://localhost:3000/cavalos/${id}`);
          this.cavalos = this.cavalos.filter(cavalo => cavalo.id !== id);
        } catch (error) {
          console.error('Erro ao excluir cavalo:', error);
        }
      },
      atualizarLista() {
        this.cavaloParaEditar = null;
        this.fetchCavalos();
      }
    },
    mounted() {
      this.fetchCavalos();
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  