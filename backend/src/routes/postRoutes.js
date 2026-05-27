const express = require('express');
const router = express.Router();

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts
} = require('../controllers/postController');
const { authMiddleware, teacherOnly } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts
 */

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo para buscar no título ou conteúdo
 *     responses:
 *       200:
 *         description: Lista de posts encontrados
 *       400:
 *         description: Parâmetro de busca não informado
 */
router.get('/posts/search', searchPosts);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get('/posts', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Post não encontrado
 */
router.get('/posts/:id', getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: Meu primeiro post
 *               content:
 *                 type: string
 *                 example: Este é o conteúdo do post
 *               author:
 *                 type: string
 *                 example: Matheus
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados obrigatórios não informados
 */
router.post('/posts', authMiddleware, teacherOnly, createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 example: Post atualizado
 *               content:
 *                 type: string
 *                 example: Conteúdo atualizado do post
 *               author:
 *                 type: string
 *                 example: Matheus
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou ID inválido
 *       404:
 *         description: Post não encontrado
 */
router.put('/posts/:id', authMiddleware, teacherOnly, updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Post não encontrado
 */
router.delete('/posts/:id', authMiddleware, teacherOnly, deletePost);

module.exports = router;