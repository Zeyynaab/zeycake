const request = require('supertest');
const app = require('../../src/app');                  
const Utilisateur = require('../../src/models/user');  

describe('Authentification - Scénarios Utilisateur', () => {
  // Données de test standard
  const utilisateurTest = {
    prenom: 'Jean',
    nom: 'Dupont',
    email: 'jean.dupont@test.com',
    password: 'MonMdp123'
  };

  it('Inscription (POST /api/auth/register) crée un utilisateur et renvoie 201', async () => {
    const reponse = await request(app)
      .post('/api/auth/register')
      .send(utilisateurTest);

    expect(reponse.status).toBe(201);
    expect(reponse.body).toHaveProperty('message', 'Utilisateur créé avec succès');
    expect(reponse.body).toHaveProperty('user');
    expect(reponse.body.user).toHaveProperty('_id');
    expect(reponse.body.user.email).toBe(utilisateurTest.email);
  });

  it(' Connexion réussie (POST /api/auth/login) renvoie un token', async () => {
    
    await request(app)
      .post('/api/auth/register')
      .send(utilisateurTest);

    const reponse = await request(app)
      .post('/api/auth/login')
      .send({ email: utilisateurTest.email, password: utilisateurTest.password });

    expect(reponse.status).toBe(200);
    expect(reponse.body).toHaveProperty('token');
  });

  it(' Connexion échouée (POST /api/auth/login) avec mot de passe incorrect', async () => {
    const reponse = await request(app)
      .post('/api/auth/login')
      .send({ email: utilisateurTest.email, password: 'MauvaisMdp' });

    expect(reponse.status).toBe(401);
    expect(reponse.body.message).toMatch(/mot de passe/i);
  });

  //  Tests d’erreur supplémentaires 

  it('Inscription existante (POST /api/auth/register) renvoie 400', async () => {
    // 1er enregistrement OK
    await request(app)
      .post('/api/auth/register')
      .send(utilisateurTest);

    // 2e inscription avec le même email : erreur
    const reponse = await request(app)
      .post('/api/auth/register')
      .send(utilisateurTest);

    expect(reponse.status).toBe(400);
    expect(reponse.body.message).toMatch(/déjà existant/i);
  });

  it('Connexion avec email inexistant (POST /api/auth/login) 401', async () => {
    const reponse = await request(app)
      .post('/api/auth/login')
      .send({ email: 'inconnu@test.com', password: 'SomePass123' });

    expect(reponse.status).toBe(401);
    expect(reponse.body.message).toMatch(/invalide/i);
  });

  it('Accès protégé sans token renvoie 401', async () => {
    // Accéder à une route protégée sans header Authorization
    const reponse = await request(app).get('/api/users');
    expect(reponse.status).toBe(401);
  });
});
