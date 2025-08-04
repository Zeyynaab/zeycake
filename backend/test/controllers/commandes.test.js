const request = require('supertest');
const app = require('../../src/app');
let token;
let createdId;

describe('Commandes – Tests CRUD', () => {
  
  const commandeTest = {
    produits: [
      { nom: 'Cheesecake pistache', qte: 1, prix: 25 },
      { nom: 'Tarte citron', qte: 1, prix: 17.5 }
    ],
    adresse: '123 Rue de Test, Montréal',
    commentaires: 'Livrer entre 14h et 15h'
  };

  beforeAll(async () => {
    // enregistrer un utilisateur de test pour obtenir un token JWT
    const email = `cmd.tester+${Date.now()}@test.com`; 
    await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Cmd', nom: 'Tester', email, password: 'Cmd1234' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'Cmd1234' });
    token = res.body.token;
  });

  it('POST /api/commandes crée une commande (201)', async () => {
    const res = await request(app)
      .post('/api/commandes')
      .set('Authorization', `Bearer ${token}`)
      .send(commandeTest);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    // total attendu = 25 + 17.5 = 42.5
    expect(res.body).toHaveProperty('total', 42.5);
    createdId = res.body._id;
  });

  it('GET /api/commandes récupère toutes les commandes (200)', async () => {
    const res = await request(app)
      .get('/api/commandes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(c => c._id === createdId)).toBe(true);
  });

  it('GET /api/commandes/:id récupère une commande par ID (200)', async () => {
    const res = await request(app)
      .get(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it("PUT /api/commandes/:id met à jour l'adresse (200)", async () => {
    const newAdresse = '456 Rue Modifiée';
    const res = await request(app)
      .put(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ adresse: newAdresse });

    expect(res.status).toBe(200);
    expect(res.body.adresse).toBe(newAdresse);
  });

  it('DELETE /api/commandes/:id supprime la commande (204)', async () => {
    const res = await request(app)
      .delete(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it("GET /api/commandes/:id après suppression  404", async () => {
    const res = await request(app)
      .get(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  // erreurs

  it('GET commande avec ID invalide 400', async () => {
    const res = await request(app)
      .get('/api/commandes/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  it('GET commande avec ID inexistant 404', async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app)
      .get(`/api/commandes/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  it('PUT commande avec ID invalide  400', async () => {
    const res = await request(app)
      .put('/api/commandes/xyz')
      .set('Authorization', `Bearer ${token}`)
      .send({ adresse: 'Test' });
    expect(res.status).toBe(400);
  });
});
