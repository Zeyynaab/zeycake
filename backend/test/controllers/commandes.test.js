const request = require('supertest');
const app = require('../../src/app');
let token;
let createdId;

describe('🚚 Commandes – Tests CRUD', () => {
  // jeu de données pour tester la création d'une commande
  const commandeTest = {
    produits: ['prodId1', 'prodId2'],
    quantites: [1, 2],
    total: 42.50,
    adresse: '123 Rue de Test, Montréal'
  };

  beforeAll(async () => {
    // on enregistre un utilisateur de test pour obtenir un token JWT
    await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Cmd', nom: 'Tester', email: 'cmd.tester@test.com', password: 'Cmd1234' });

    // on se connecte avec cet utilisateur pour récupérer le token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'cmd.tester@test.com', password: 'Cmd1234' });
    token = res.body.token;
  });

  // Test de création réussie : renvoie 201 et contient l'identifiant _id
  it('POST /api/commandes → crée une commande (201)', async () => {
    const res = await request(app)
      .post('/api/commandes')
      .set('Authorization', `Bearer ${token}`)
      .send(commandeTest);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id; // on stocke l'id pour les tests suivants
  });

  // Test de récupération de toutes les commandes : renvoie 200 et liste un tableau
  it('GET /api/commandes → récupère toutes les commandes (200)', async () => {
    const res = await request(app)
      .get('/api/commandes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // on vérifie que le tableau contient bien la commande créée
    expect(res.body.some(c => c._id === createdId)).toBe(true);
  });

  // Test de récupération d'une commande par son ID : renvoie 200 et le bon objet
  it('GET /api/commandes/:id → récupère une commande par ID (200)', async () => {
    const res = await request(app)
      .get(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  // Test de mise à jour réussie : modifie l'adresse et renvoie 200
  it('PUT /api/commandes/:id → met à jour l\'adresse (200)', async () => {
    const newAdresse = '456 Rue Modifiée';
    const res = await request(app)
      .put(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ adresse: newAdresse });

    expect(res.status).toBe(200);
    expect(res.body.adresse).toBe(newAdresse);
  });

  // Test de suppression réussie : renvoie 204 et n'a pas de contenu
  it('DELETE /api/commandes/:id → supprime la commande (204)', async () => {
    const res = await request(app)
      .delete(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  // Test après suppression : tentative de récupérer doit renvoyer 404
  it('GET /api/commandes/:id après suppression → 404', async () => {
    const res = await request(app)
      .get(`/api/commandes/${createdId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
  });

  // ==== Tests d'erreurs pour augmenter la couverture de branches ====

  // ID mal formé (CastError) → 400 Bad Request
  it('GET commande avec ID invalide → 400', async () => {
    const res = await request(app)
      .get('/api/commandes/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  // ID bien formé mais inexistant → 404 Not Found
  it('GET commande avec ID inexistant → 404', async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app)
      .get(`/api/commandes/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  // PUT avec ID invalide → 400 Bad Request
  it('PUT commande avec ID invalide → 400', async () => {
    const res = await request(app)
      .put('/api/commandes/xyz')
      .set('Authorization', `Bearer ${token}`)
      .send({ adresse: 'Test' });
    expect(res.status).toBe(400);
  });
});
