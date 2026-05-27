const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const User = require('../src/models/user.js');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('deve registrar um novo usuário', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Aluno Teste',
      email: 'aluno@teste.com',
      password: '123456',
      role: 'student'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.role).toBe('student');
  });

  it('deve fazer login com credenciais válidas', async () => {
    await User.create({
      name: 'Professor',
      email: 'prof@teste.com',
      password: await bcrypt.hash('senha123', 10),
      role: 'teacher'
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'prof@teste.com',
      password: 'senha123'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.role).toBe('teacher');
  });

  it('deve retornar 401 para credenciais inválidas', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'inexistente@teste.com',
      password: 'errada'
    });

    expect(response.statusCode).toBe(401);
  });

  it('deve retornar 403 para aluno tentando criar post', async () => {
    const register = await request(app).post('/api/auth/register').send({
      name: 'Aluno',
      email: 'aluno2@teste.com',
      password: '123456',
      role: 'student'
    });

    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${register.body.token}`)
      .send({
        title: 'Tentativa',
        content: 'Conteúdo',
        author: 'Aluno'
      });

    expect(response.statusCode).toBe(403);
  });
});
