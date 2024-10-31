<template>
  <div>
    <h2>{{ aluno.id ? 'Editar Aluno' : 'Cadastrar Novo Aluno' }}</h2>
    <form @submit.prevent="salvarAluno">
      <label for="nome">Nome:</label>
      <input type="text" v-model="aluno.nome" id="nome" required />

      <label for="data_nascimento">Data de Nascimento:</label>
      <input type="date" v-model="aluno.data_nascimento" id="data_nascimento" required />

      <label for="sexo">Sexo:</label>
      <select v-model="aluno.sexo" id="sexo" required>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>

      <label for="documento">Documento:</label>
      <input type="text" v-model="aluno.documento" id="documento" required />

      <label for="telefone">Telefone:</label>
      <input type="text" v-model="aluno.telefone" id="telefone" />

      <label for="email">Email:</label>
      <input type="email" v-model="aluno.email" id="email" />

      <label for="endereco">Endereço:</label>
      <input type="text" v-model="aluno.endereco" id="endereco" />

      <label for="cidade">Cidade:</label>
      <input type="text" v-model="aluno.cidade" id="cidade" />

      <label for="estado">Estado:</label>
      <input type="text" v-model="aluno.estado" id="estado" />

      <label for="observacoes">Observações:</label>
      <textarea v-model="aluno.observacoes" id="observacoes"></textarea>

      <button type="submit">{{ aluno.id ? 'Atualizar' : 'Cadastrar' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlunoForm',
  props: {
    alunoInicial: {
      type: Object,
      default: () => ({
        nome: '',
        data_nascimento: '',
        sexo: '',
        documento: '',
        telefone: '',
        email: '',
        endereco: '',
        cidade: '',
        estado: '',
        observacoes: ''
      })
    }
  },
  data() {
  const aluno = { ...this.alunoInicial };

  // Converte `data_nascimento` para o formato YYYY-MM-DD se não estiver formatado corretamente
  if (aluno.data_nascimento) {
    const partesData = aluno.data_nascimento.split('/');
    if (partesData.length === 3) {
      // Formato DD/MM/YYYY -> YYYY-MM-DD
      aluno.data_nascimento = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    }
  }
  return { aluno };
  },
  methods: {
    async salvarAluno() {
      try {
        if (this.aluno.id) {
          // Atualizar aluno existente
          await axios.put(`http://localhost:3000/alunos/${this.aluno.id}`, this.aluno);
        } else {
          // Cadastrar novo aluno
          await axios.post('http://localhost:3000/alunos', this.aluno);
        }
        this.$emit('alunoSalvo'); // Emitir evento após salvar para atualizar a lista
      } catch (error) {
        console.error('Erro ao salvar aluno:', error);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
label, input, select, textarea, button {
  margin: 5px 0;
}
</style>

