import { db } from "../utils/db.server"

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  categoryId: number;
};


// Get all products from the database 
export const getAllProducts = async (): Promise<Product[]> => {
    return db.product.findMany({
        select: {
            id: true, 
            name: true, 
            description: true, 
            image: true,
            price: true,
            categoryId: true,
        },
    });
};

// Get a product by id 
export const getProductById = async (id: number): Promise<Product | null> => {
    return db.product.findUnique({
        where: {
          id,
        },
      });
}

// Get a product by category
export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
    return db.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
      },
      include: {
        category: true,
      },
    });

  }

// Create a new product and save it to the database
export const createProduct = async (
    product: Omit<Product, "id">
  ): Promise<Product> => {
    const { name, description, image, price, categoryId } = product;
    return db.product.create({
      data: {
        name,
        description,
        image, 
        price, 
        categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true, 
        price: true, 
        categoryId: true,
      },
    });
};
  
// Update an existing product in the database
export const updateProductById = async (
    product: Omit<Product, "id">,
    id: number
  ): Promise<Product> => {
    const { name, description, image, price, categoryId } = product;
    return db.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image, 
        price, 
        categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true, 
        price: true, 
        categoryId: true,
      },
    });
};
  
// Delete a product from the database
export const deleteProduct = async (id: number): Promise<void> => {
    await db.product.delete({
      where: {
        id,
      },
    });
};


