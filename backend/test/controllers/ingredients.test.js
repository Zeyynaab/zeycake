const request = require('supertest');
const app = require('../../src/app');
let token;
let createdId;

describe('Ingrédients – Tests CRUD', () => {
  // Données de base pour tester la création d'un ingrédient
  const ingredientTest = { nom: 'Farine', quantite: 1000, unite: 'g' };

  beforeAll(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ prenom: 'Ing', nom: 'Tester', email: 'ing.tester@test.com', password: 'Ing1234' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'ing.tester@test.com', password: 'Ing1234' });
    token = res.body.token;
  });

  // Création réussie 
  it('POST /api/ingredients crée un ingrédient (201)', async () => {
    const res = await request(app)
      .post('/api/ingredients')
      .set('Authorization', `Bearer ${token}`)
      .send(ingredientTest);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  
  it('GET /api/ingredients récupère tous les ingrédients (200)', async () => {
    const res = await request(app)
      .get('/api/ingredients')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(i => i._id === createdId)).toBe(true);
  });

  
  it('GET /api/ingredients/:id récupère un ingrédient par ID (200)', async () => {
    const res = await request(app)
      .get(`/api/ingredients/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  
  it('PUT /api/ingredients/:id  met à jour la quantité (200)', async () => {
    const newQuantite = 500;
    const res = await request(app)
      .put(`/api/ingredients/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantite: newQuantite });
    expect(res.status).toBe(200);
    expect(res.body.quantite).toBe(newQuantite);
  });

  // Suppression réussie 
  it('DELETE /api/ingredients/:id supprime l’ingrédient (204)', async () => {
    const res = await request(app)
      .delete(`/api/ingredients/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  // Après suppression : 404 Not Found
  it('GET /api/ingredients/:id après suppression 404', async () => {
    const res = await request(app)
      .get(`/api/ingredients/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  // Tests d'erreurs 
  // ID mal formé 
  it('GET ingredient avec ID invalide  400', async () => {
    const res = await request(app)
      .get('/api/ingredients/12345')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
  });

  // ID bien formé mais inexistant 
  it('GET ingredient avec ID inexistant 404', async () => {
    const fakeId = '000000000000000000000000';
    const res = await request(app)
      .get(`/api/ingredients/${fakeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  // PUT avec ID invalide 
  it('PUT ingredient avec ID invalide 400', async () => {
    const res = await request(app)
      .put('/api/ingredients/xyz')
      .set('Authorization', `Bearer ${token}`)
      .send({ quantite: 123 });
    expect(res.status).toBe(400);
  });
});
