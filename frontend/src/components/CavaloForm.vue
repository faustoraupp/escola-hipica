<template>
    <div>
      <h2>{{ cavalo.id ? 'Editar Cavalo' : 'Cadastrar Novo Cavalo' }}</h2>
      <form @submit.prevent="salvarCavalo">
        <label for="nome">Nome:</label>
        <input type="text" v-model="cavalo.nome" id="nome" required />
  
        <label for="idade">Idade:</label>
        <input type="number" v-model="cavalo.idade" id="idade" />
  
        <label for="raça">Raça:</label>
        <input type="text" v-model="cavalo.raça" id="raça" />
  
        <label for="sexo">Sexo:</label>
        <select v-model="cavalo.sexo" id="sexo" required>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
  
        <label for="observacoes">Observações:</label>
        <textarea v-model="cavalo.observacoes" id="observacoes"></textarea>
  
        <button type="submit">{{ cavalo.id ? 'Atualizar' : 'Cadastrar' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CavaloForm',
    props: {
      cavaloInicial: {
        type: Object,
        default: () => ({
          nome: '',
          idade: null,
          raça: '',
          sexo: '',
          observacoes: ''
        })
      }
    },
    data() {
      return {
        cavalo: { ...this.cavaloInicial }
      };
    },
    methods: {
      async salvarCavalo() {
        try {
          if (this.cavalo.id) {
            await axios.put(`http://localhost:3000/cavalos/${this.cavalo.id}`, this.cavalo);
          } else {
            await axios.post('http://localhost:3000/cavalos', this.cavalo);
          }
          this.$emit('cavaloSalvo');
        } catch (error) {
          console.error('Erro ao salvar cavalo:', error);
        }
      }
    },
    watch: {
      cavaloInicial: {
        handler(newCavalo) {
          this.cavalo = { ...newCavalo };
        },
        deep: true,
        immediate: true
      }
    }
  };
  </script>
  