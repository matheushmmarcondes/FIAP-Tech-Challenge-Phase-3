const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const Post = require('../src/models/post.js');
const User = require('../src/models/user.js');

const getTeacherToken = async () => {
  await User.deleteMany({});

  const user = await User.create({
    name: 'Professor Teste',
    email: 'professor@teste.com',
    password: await bcrypt.hash('123456', 10),
    role: 'teacher'
  });

  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'professor@teste.com', password: '123456' });

  return { token: response.body.token, user };
};

describe('Posts API', () => {
  let teacherToken;

  beforeEach(async () => {
    await Post.deleteMany({});
    const auth = await getTeacherToken();
    teacherToken = auth.token;
  });

  it('deve responder a rota raiz com status 200', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('API do Tech Challenge rodando com sucesso');
  });

  it('deve criar um novo post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({
        title: 'Meu post teste',
        content: 'Conteúdo de teste',
        author: 'Matheus'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Meu post teste');
    expect(response.body.content).toBe('Conteúdo de teste');
    expect(response.body.author).toBe('Matheus');
  });

  it('deve retornar 401 ao criar post sem token', async () => {
    const response = await request(app)
      .post('/api/posts')
      .send({
        title: 'Post sem auth',
        content: 'Conteúdo',
        author: 'Autor'
      });

    expect(response.statusCode).toBe(401);
  });

  it('deve listar todos os posts', async () => {
    await Post.create({
      title: 'Post 1',
      content: 'Conteúdo 1',
      author: 'Autor 1'
    });

    const response = await request(app).get('/api/posts');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it('deve buscar um post por ID', async () => {
    const post = await Post.create({
      title: 'Post por ID',
      content: 'Conteúdo',
      author: 'Autor'
    });

    const response = await request(app).get(`/api/posts/${post._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Post por ID');
  });

  it('deve retornar 404 ao buscar post inexistente', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/posts/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('Post não encontrado');
  });

  it('deve atualizar um post existente', async () => {
    const post = await Post.create({
      title: 'Título antigo',
      content: 'Conteúdo antigo',
      author: 'Autor antigo'
    });

    const response = await request(app)
      .put(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({
        title: 'Título novo',
        content: 'Conteúdo novo',
        author: 'Autor novo'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Título novo');
  });

  it('deve deletar um post existente', async () => {
    const post = await Post.create({
      title: 'Post deletável',
      content: 'Conteúdo',
      author: 'Autor'
    });

    const response = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Authorization', `Bearer ${teacherToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Post deletado com sucesso');
  });

  it('deve buscar posts por palavra-chave', async () => {
    await Post.create({
      title: 'Node.js com MongoDB',
      content: 'Aprendendo backend',
      author: 'Matheus'
    });

    const response = await request(app).get('/api/posts/search?q=node');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toContain('Node.js');
  });

  it('deve retornar 400 se a busca não tiver query', async () => {
    const response = await request(app).get('/api/posts/search');

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('O parâmetro de busca "q" é obrigatório');
  });
});
