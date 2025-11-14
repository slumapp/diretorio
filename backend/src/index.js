const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock (substituir por banco depois)
let posts = [
  {
    id: '1',
    user: { name: 'Zé da Elétrica', location: 'Beco 5' },
    content: 'Galera, tô fazendo bico de elétrica R$50',
    category: 'Serviços',
    timestamp: '3h',
  },
  {
    id: '2', 
    user: { name: 'Lanches da Tia', location: 'Rua Principal' },
    content: 'X-Tudo hoje por R$15! Delivery grátis na comunidade',
    category: 'Comércio',
    timestamp: '5h',
  }
];

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'Slum API rodando! 🚀' });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { content, category, user } = req.body;
  const newPost = {
    id: (posts.length + 1).toString(),
    user: user || { name: 'Usuário', location: 'Local' },
    content,
    category,
    timestamp: 'Agora',
  };
  posts.unshift(newPost);
  res.json(newPost);
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Slum Backend rodando na porta ${PORT}`);
});