import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    // Transform data untuk menyesuaikan dengan format aplikasi kita
    return response.data.map((product: any) => ({
      id: product.id,
      title: product.title,
      price: product.price, // Kita anggap ini sebagai coins
      image: product.image
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductDetail = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return {
      id: response.data.id,
      title: response.data.title,
      price: response.data.price,
      image: response.data.image,
      description: response.data.description
    };
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return null;
  }
};