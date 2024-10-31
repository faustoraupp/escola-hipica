const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurar a conexão com PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'escola_hipica',
    password: 'Martelo0!@',
    port: 5432,
});

app.use(cors());
app.use(express.json());

// GET /alunos - Listar todos os alunos
app.get('/alunos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alunos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
});

// GET /alunos - Listar todos os alunos
app.get('/alunos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alunos');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
});

// GET /alunos/:id - Obter um aluno específico por ID
app.get('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM alunos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar aluno' });
    }
});



// POST /alunos - Criar um novo aluno
app.post('/alunos', async (req, res) => {
    console.log(req.body); // Log do corpo da requisição para verificar os dados recebidos

    const { nome, data_nascimento, sexo, documento, telefone, email, endereco, cidade, estado, observacoes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO alunos (nome, data_nascimento, sexo, documento, telefone, email, endereco, cidade, estado, observacoes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [nome, data_nascimento, sexo, documento, telefone, email, endereco, cidade, estado, observacoes]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
});


// PUT /alunos/:id - Atualizar dados de um aluno
app.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, sexo, documento, telefone, email, endereco, cidade, estado, observacoes } = req.body;
    try {
        const result = await pool.query(
            'UPDATE alunos SET nome = $1, data_nascimento = $2, sexo = $3, documento = $4, telefone = $5, email = $6, endereco = $7, cidade = $8, estado = $9, observacoes = $10 WHERE id = $11 RETURNING *',
            [nome, data_nascimento, sexo, documento, telefone, email, endereco, cidade, estado, observacoes, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
});

// DELETE /alunos/:id - Excluir um aluno
app.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM alunos WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir aluno' });
    }
});

// GET /cavalos - Listar todos os cavalos
app.get('/cavalos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM cavalos');
      res.json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar cavalos:', error);
      res.status(500).json({ error: 'Erro ao buscar cavalos' });
    }
  });
  
// GET /cavalos/:id - Obter um cavalo específico por ID
app.get('/cavalos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM cavalos WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Cavalo não encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao buscar cavalo:', error);
      res.status(500).json({ error: 'Erro ao buscar cavalo' });
    }
  });

  // POST /cavalos - Criar um novo cavalo
  app.post('/cavalos', async (req, res) => {
    const { nome, idade, raça, sexo, observacoes } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO cavalos (nome, idade, raça, sexo, observacoes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, idade, raça, sexo, observacoes]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao criar cavalo:', error);
      res.status(500).json({ error: 'Erro ao criar cavalo' });
    }
  });
  
  // PUT /cavalos/:id - Atualizar dados de um cavalo
  app.put('/cavalos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade, raça, sexo, observacoes } = req.body;
    try {
      const result = await pool.query(
        'UPDATE cavalos SET nome = $1, idade = $2, raça = $3, sexo = $4, observacoes = $5 WHERE id = $6 RETURNING *',
        [nome, idade, raça, sexo, observacoes, id]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao atualizar cavalo:', error);
      res.status(500).json({ error: 'Erro ao atualizar cavalo' });
    }
  });
  
  // DELETE /cavalos/:id - Excluir um cavalo
  app.delete('/cavalos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM cavalos WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir cavalo:', error);
      res.status(500).json({ error: 'Erro ao excluir cavalo' });
    }
  });
  



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
