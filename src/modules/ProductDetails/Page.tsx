import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductDetails } from '../../types/product.types';
import { getProducts } from '../../api';
import { Spinner } from '../../components/Spinner';

export const ProductDetailsPage = () => {
  const itemId = useParams<{ itemId: string }>();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!itemId) {
      return;
    }

    const loadDetails = async () => {
      try {
        setLoading(true);

        const products = await getProducts();
        const product = products.find(prod => prod.itemId === String(itemId));

        if (!product) {
          throw new Error(`Product ${itemId} not found`);
        }

        const category = product.category;

        const response = await fetch(`/api/${category}/${itemId}.json`);

        if (!response.ok) {
          throw new Error(`Details not found for ${itemId}`);
        }

        const data: ProductDetails = await response.json();

        setDetails(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [itemId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!details) {
    return <h2>Not details found</h2>;
  }

  return (
    <div>
      <h1>{details.name}</h1>

      <img
        src={details.images[0]}
        alt={details.name}
        style={{ width: '300px' }}
      />

      <p>Price: ${details.priceDiscount}</p>

      <h3>Description</h3>
      {details.description.map(block => (
        <div key={block.title}>
          <h4>{block.title}</h4>
          {block.text.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
};
