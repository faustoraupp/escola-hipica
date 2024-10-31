<template>
    <div>
      <h1>Lista de Alunos</h1>
      <button @click="alunoParaEditar = {}">Cadastrar Novo Aluno</button>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Sexo</th>
            <th>Documento</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunos" :key="aluno.id">
            <td>{{ aluno.id }}</td>
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.data_nascimento }}</td> <!-- Data formatada -->
            <td>{{ aluno.sexo }}</td>
            <td>{{ aluno.documento }}</td>
            <td>{{ aluno.telefone }}</td>
            <td>{{ aluno.email }}</td>
            <td>
              <button @click="editarAluno(aluno)">Editar</button>
              <button @click="excluirAluno(aluno.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <AlunoForm v-if="alunoParaEditar !== null" :alunoInicial="alunoParaEditar" @alunoSalvo="atualizarLista" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AlunoForm from './AlunoForm.vue';
  
  export default {
    name: 'AlunosList',
    components: {
      AlunoForm
    },
    data() {
      return {
        alunos: [],
        alunoParaEditar: null
      };
    },
    methods: {
      async fetchAlunos() {
        try {
          const response = await axios.get('http://localhost:3000/alunos');
          this.alunos = response.data.map(aluno => {
            return {
              ...aluno,
              data_nascimento: this.formatarData(aluno.data_nascimento)
            };
          });
        } catch (error) {
          console.error('Erro ao buscar alunos:', error);
        }
      },
      formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
      },
      editarAluno(aluno) {
        this.alunoParaEditar = { ...aluno };
      },
      async excluirAluno(id) {
        try {
          await axios.delete(`http://localhost:3000/alunos/${id}`);
          this.alunos = this.alunos.filter(aluno => aluno.id !== id);
        } catch (error) {
          console.error('Erro ao excluir aluno:', error);
        }
      },
      atualizarLista() {
        this.alunoParaEditar = null;
        this.fetchAlunos();
      }
    },
    mounted() {
      this.fetchAlunos();
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para a tabela e o formulário */
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
  