const request = require('supertest');
const app = require('../../src/app');
let token;
let createdUserId;

describe('👥 Utilisateurs – Tests GET', () => {
  // Données de base pour créer et connecter un utilisateur
  const userTest = { prenom: 'User', nom: 'Tester', email: 'user.tester@test.com', password: 'User1234' };

  beforeAll(async () => {
    // Inscription
    await request(app).post('/api/auth/register').send(userTest);
    // Connexion
    const res = await request(app).post('/api/auth/login').send({ email: userTest.email, password: userTest.password });
    token = res.body.token;
    createdUserId = res.body.id || res.body._id;
  });

  // Lecture de la liste 
  it('GET /api/users → liste les utilisateurs (200)', async () => {
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(u => u._id === createdUserId)).toBe(true);
  });

  // Lecture par ID 
  it('GET /api/users/:id → récupère un utilisateur par ID (200)', async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdUserId);
  });

  // Tests d'erreurs 

  // ID mal formé 
  it('GET utilisateur avec ID invalide 400', async () => {
    const res = await request(app).get('/api/users/12345').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  // ID inexistant 
  it('GET utilisateur avec ID inexistant 404', async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app).get(`/api/users/${fakeId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

    // Accès sans token 
  it('GET /api/users sans token 401', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });

  // Accès avec token invalide 
  it('GET /api/users avec token invalide 401', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer token_invalide');
    expect(res.status).toBe(401);
  });


});


