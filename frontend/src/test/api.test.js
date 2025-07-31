// frontend/src/test/api.test.js

// 1) Mock du module axios pour qu’il expose un default ESModule
jest.mock('axios', () => {
  // instance factice retournée par axios.create()
  const mInstance = {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: { request: { use: jest.fn() } },
  };
  return {
    __esModule: true,             // indique un module ES
    default: {                    // simule l’export default d’axios
      create: jest.fn(() => mInstance),
    },
  };
});

// 2) Import de tes fonctions API (après le mock)
import API, {
  login,
  register,
  fetchProduits,
  fetchProduitById,
  fetchCommandesClient,
  fetchCommandesAdmin,
  passerCommande,
} from '../api/api';

// 3) Récupération de l’instance mockée
import axios from 'axios';
const mInstance = axios.create();

describe('API service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('login appelle POST "/auth/login"', async () => {
    mInstance.post.mockResolvedValue({ data: { token: 'abc' } });
    await login({ email:'a@b.com', password:'pwd' });
    expect(mInstance.post).toHaveBeenCalledWith('/auth/login', { email:'a@b.com', password:'pwd' });
  });

  it('register appelle POST "/auth/register"', async () => {
    const payload = { nom: 'Foo', prenom: 'Bar', email: 'a@b.com', password: 'pwd' };
    mInstance.post.mockResolvedValueOnce({ status: 201, data: { message: 'OK' } });
    await register(payload);
    expect(mInstance.post).toHaveBeenCalledWith('/auth/register', payload);
  });

  it('fetchProduits appelle GET "/produits"', async () => {
    mInstance.get.mockResolvedValueOnce({ data: [1, 2, 3] });
    await fetchProduits();
    expect(mInstance.get).toHaveBeenCalledWith('/produits');
  });

  it('fetchProduitById appelle GET `/produits/${id}`', async () => {
    const id = 'xyz';
    mInstance.get.mockResolvedValueOnce({ data: { _id: id } });
    await fetchProduitById(id);
    expect(mInstance.get).toHaveBeenCalledWith(`/produits/${id}`);
  });
  it('fetchCommandesClient appelle GET "/commandes/mes-commandes"', async () => {
    mInstance.get.mockResolvedValueOnce({ data: [] });
    await fetchCommandesClient();
    expect(mInstance.get).toHaveBeenCalledWith('/commandes/mes-commandes');
  });
  it('fetchCommandesAdmin appelle GET "/commandes"', async () => {
    mInstance.get.mockResolvedValueOnce({ data: [] });
    await fetchCommandesAdmin();
    expect(mInstance.get).toHaveBeenCalledWith('/commandes');
  });
  it('passerCommande appelle POST "/commandes"', async () => {
    const order = { total: 42 };
    mInstance.post.mockResolvedValueOnce({ data: { id: 'ord1' } });
    await passerCommande(order);
    expect(mInstance.post).toHaveBeenCalledWith('/commandes', order);
  });
  });

