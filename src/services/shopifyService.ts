import axios from 'axios';

interface CartInput {
  lines: Array<{
    quantity: number;
    merchandiseId: string;
  }>;
}

interface ProductInput {
  title: string;
  productOptions: Array<{
    name: string;
    values: Array<{ name: string }>;
  }>;
}

class ShopifyService {
  private readonly storefrontApiUrl: string;
  private readonly storefrontApiToken: string;

  constructor() {
    this.storefrontApiUrl = process.env.PUBLIC_STORE_DOMAIN!;
    this.storefrontApiToken = process.env.PRIVATE_STOREFRONT_API_TOKEN!;
  }

  private getShopifyHeaders() {
    return {
      'X-Shopify-Storefront-Access-Token': this.storefrontApiToken,
      'Content-Type': 'application/json',
    };
  }

  // Product Create Mutation
  async createProduct(productInput: ProductInput) {
    const query = `
      mutation {
        productCreate(input: { title: "${productInput.title}", options: ${JSON.stringify(productInput.productOptions)} }) {
          product {
            id
            title
            options {
              id
              name
              position
              optionValues {
                id
                name
                hasVariants
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Log the request going to Shopify
    console.log('Sending request to Shopify:', query);

    try {
      const response = await axios.post(
        `https://${this.storefrontApiUrl}/admin/api/2023-01/graphql.json`,
        { query },
        { headers: this.getShopifyHeaders() }
      );

      // Log the response from Shopify
      console.log('Shopify response:', response.data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Log the error response from Shopify
        console.error('Shopify error response:', error.response?.data);
        throw new Error(error.response?.data?.errors?.[0]?.message || 'Error creating product');
      } else {
        // Log any non-Axios errors
        console.error('Error occurred without Shopify response:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }

  // Cart Create Mutation
  async createCart(cartInput: CartInput) {
    const query = `
      mutation {
        cartCreate(input: { lines: ${JSON.stringify(cartInput.lines)} }) {
          cart {
            id
            lines(first: 5) {
              edges {
                node {
                  quantity
                  merchandiseId
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    // Log the request going to Shopify
    console.log('Sending request to Shopify:', query);

    try {
      const response = await axios.post(
        `https://${this.storefrontApiUrl}/admin/api/2023-01/graphql.json`,
        { query },
        { headers: this.getShopifyHeaders() }
      );

      // Log the response from Shopify
      console.log('Shopify response:', response.data);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Log the error response from Shopify
        console.error('Shopify error response:', error.response?.data);
        throw new Error(error.response?.data?.errors?.[0]?.message || 'Error creating cart');
      } else {
        // Log any non-Axios errors
        console.error('Error occurred without Shopify response:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
}

export default new ShopifyService();
