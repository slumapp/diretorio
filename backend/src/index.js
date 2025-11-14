const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do PostgreSQL - SUA STRING CONEXÃO
const pool = new Pool({
  connectionString: 'postgresql://slumapp_db_user:AVFXnhlRh5y78pKaqEUeRema0GBMnO3Q@dpg-d4bnh063jp1c73bs9jj0-a.oregon-postgres.render.com/slumapp_db',
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Criar tabela se não existir
const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        user_location VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
    console.log('✅ Tabela posts criada/verificada');
  } catch (error) {
    console.error('❌ Erro ao criar tabela:', error);
  }
};

// Inicializar tabela
createTable();

// Rotas
app.get('/api/health', async (req, res) => {
  try {
    // Testar conexão com o banco
    await pool.query('SELECT 1');
    res.json({ 
      status: 'Slum API rodando! 🚀', 
      database: 'PostgreSQL Conectado',
      url: 'https://slum-backend.onrender.com'
    });
  } catch (error) {
    res.json({ 
      status: 'Slum API rodando! 🚀', 
      database: 'Erro na conexão PostgreSQL',
      error: error.message 
    });
  }
});

// Buscar todos os posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    const posts = result.rows.map(post => ({
      id: post.id.toString(),
      user: { 
        name: post.user_name, 
        location: post.user_location 
      },
      content: post.content,
      category: post.category,
      timestamp: formatTimestamp(post.created_at)
    }));
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar novo post
app.post('/api/posts', async (req, res) => {
  try {
    const { content, category, user } = req.body;
    
    if (!content || !category) {
      return res.status(400).json({ error: 'Conteúdo e categoria são obrigatórios' });
    }
    
    const result = await pool.query(
      'INSERT INTO posts (user_name, user_location, content, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [user?.name || 'Usuário Slum', user?.location || 'Sua Comunidade', content, category]
    );

    const newPost = result.rows[0];
    const formattedPost = {
      id: newPost.id.toString(),
      user: { 
        name: newPost.user_name, 
        location: newPost.user_location 
      },
      content: newPost.content,
      category: newPost.category,
      timestamp: formatTimestamp(newPost.created_at)
    };

    res.json(formattedPost);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar posts por categoria
app.get('/api/posts/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const result = await pool.query(
      'SELECT * FROM posts WHERE category = $1 ORDER BY created_at DESC',
      [category]
    );
    
    const posts = result.rows.map(post => ({
      id: post.id.toString(),
      user: { 
        name: post.user_name, 
        location: post.user_location 
      },
      content: post.content,
      category: post.category,
      timestamp: formatTimestamp(post.created_at)
    }));
    
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts por categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Função para formatar timestamp
function formatTimestamp(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diffMs = now - postDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${Math.floor(diffHours / 24)}d`;
}

// Adicionar alguns posts iniciais
const addSamplePosts = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM posts');
    const count = parseInt(result.rows[0].count);
    
    if (count === 0) {
      console.log('📝 Adicionando posts de exemplo...');
      
      const samplePosts = [
        ['Zé da Elétrica', 'Beco 5', 'Galera, tô fazendo bico de elétrica R$50. Chama no WhatsApp!', 'Serviços'],
        ['Lanches da Tia', 'Rua Principal', 'X-Tudo hoje por R$15! Delivery grátis na comunidade 🍔', 'Comércio'],
        ['Seu João', 'Vila Nova', 'Encontrei um cachorro caramelo na rua principal. É de alguém? 🐕', 'Avisos'],
        ['MC Túlio', 'Quebrada do Samba', 'Rolê na laje sábado! Leva o refri que a gente leva o som 🎵', 'Eventos'],
        ['Dona Maria', 'Beco 3', 'Vendo roupas infantis em ótimo estado. Preço bom! 👕', 'Comércio']
      ];
      
      for (const post of samplePosts) {
        await pool.query(
          'INSERT INTO posts (user_name, user_location, content, category) VALUES ($1, $2, $3, $4)',
          post
        );
      }
      console.log('✅ Posts de exemplo adicionados com sucesso!');
    } else {
      console.log(`✅ Banco já possui ${count} posts`);
    }
  } catch (error) {
    console.error('❌ Erro ao adicionar posts de exemplo:', error);
  }
};

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 ========================================');
  console.log('🚀 SLUM BACKEND INICIADO COM SUCESSO!');
  console.log('🚀 ========================================');
  console.log(`📡 URL: https://slum-backend.onrender.com`);
  console.log(`🔧 Porta: ${PORT}`);
  console.log(`📊 Banco: PostgreSQL conectado`);
  console.log('🚀 ========================================');
  
  // Adicionar posts de exemplo após iniciar o servidor
  setTimeout(addSamplePosts, 2000);
});