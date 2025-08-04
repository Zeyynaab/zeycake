const request = require('supertest');
const app = require('../../src/app');
let token;
let createdId;

describe(' Produits – Tests CRUD', () => {
  // Données de base pour tester la création d'un produit
  const produitTest = {
    nom: 'Éclair au chocolat',
    description: 'Délicieux éclair garni de crème au chocolat',
    prix: 4.5,
    image: '/uploads/Fraisier.jpg',
    categorie: 'Choux',
    ingredients: ['chocolat', 'farine', 'oeufs'],
    tempsPreparation: 30,
    difficulte: 'Moyenne'
  };

  beforeAll(async () => {
    // Création  d'un admin de test 
    await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Admin', nom: 'Test', email: 'admin@test.com', password: 'Admin1234' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@test.com', password: 'Admin1234' });
    token = res.body.token;
  });


  it('POST /api/produits crée un produit (201)', async () => {
    const res = await request(app)
      .post('/api/produits')
      .set('Authorization', `Bearer ${token}`)
      .send(produitTest);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Produit créé avec succès');
    expect(res.body).toHaveProperty('produit');
    expect(res.body.produit).toHaveProperty('_id');
    expect(res.body.produit.nom).toBe(produitTest.nom);
    createdId = res.body.produit._id;
  });

  // Lecture de la liste : doit renvoyer un tableau contenant notre produit
  it('GET /api/produits → récupère tous les produits (200)', async () => {
    const res = await request(app)
      .get('/api/produits')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(p => p._id === createdId)).toBe(true);
  });

  // Mise à jour 
  it('PUT /api/produits/:id  met à jour le prix (200)', async () => {
    const newPrix = 5.0;
    const res = await request(app)
      .put(`/api/produits/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ prix: newPrix });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Produit mis à jour');
    expect(res.body.produit.prix).toBe(newPrix);
  });

  // Suppression : doit renvoyer 200 et un message de succès
  it('DELETE /api/produits/:id supprime le produit (200)', async () => {
    const res = await request(app)
      .delete(`/api/produits/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Produit supprimé avec succès');
  });

  // Après suppression : récupération → 404 Not Found
  it('GET /api/produits/:id après suppression 404', async () => {
    const res = await request(app)
      .get(`/api/produits/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'Produit non trouvé');
  });

  //Tests d'erreurs

  // GET avec ID mal formé 
  it('GET produit avec ID invalide 400', async () => {
    const res = await request(app)
      .get('/api/produits/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  // GET avec ID inexistant 
  it('GET produit avec ID inexistant 404', async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app)
      .get(`/api/produits/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  // PUT avec ID invalide
  it('PUT produit avec ID invalide 400', async () => {
    const res = await request(app)
      .put('/api/produits/xyz')
      .set('Authorization', `Bearer ${token}`)
      .send({ prix: 1.0 });
    expect(res.status).toBe(400);
  });
});
