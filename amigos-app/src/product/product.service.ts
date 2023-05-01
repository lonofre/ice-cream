import { db } from "../utils/db.server"
import { APIError, HttpErrorCode } from "../utils/errors";

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
    try{
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
    }catch(errror){
        throw new APIError(
            "Failed to get products",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};

// Get a product by id 
export const getProductById = async (id: number): Promise<Product | null> => {
    try{
        return db.product.findUnique({
            where: {
            id,
            },
        });
    }catch(errror){
        throw new APIError(
            "Failed to get products by id",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
}

// Get a product by category
export const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
    try {
      const products = await db.product.findMany({
        where: {
          category: {
            name: categoryName,
          },
        },
        include: {
          category: true,
        },
      });
      return products;
    } catch (error) {
      throw new APIError(
        "Failed to fetch products by category",
        HttpErrorCode.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  };

// Create a new product and save it to the database
export const createProduct = async (
    product: Omit<Product, "id">
  ): Promise<Product> => {
    try{
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
    }catch(errror){
        throw new APIError(
            "Failed to create and save product on database",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
  
// Update an existing product in the database
export const updateProductById = async (
    product: Omit<Product, "id">,
    id: number
  ): Promise<Product> => {
    try{
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
    }catch(errror){
        throw new APIError(
            "Failed to update product",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
  
// Delete a product from the database
export const deleteProduct = async (id: number): Promise<string> => {
    try{
        await db.product.delete({
        where: {
            id,
        },
        });
        return "Product deleted succesfully";
    }catch(errror){
        throw new APIError(
            "Failed to delete product",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};


