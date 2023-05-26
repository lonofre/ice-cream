import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

type ProductData = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  categoryId: number;
};

// Get all products from the database
export const getAllProducts = async (): Promise<ProductData[]> => {
  try {
    const products = await db.product.findMany({
      where: { active: true },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        price: true,
        categoryId: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    throw new APIError(
      "Failed to get products",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Get a product by id
export const getProductById = async (
  receivedId: number
): Promise<ProductData | null> => {
  try {
    const product = await db.product.findFirst({
      where: {
        id : receivedId,
        active: true,
      },
      include: {
        category: true,
      },
    });
    return product;
  } catch (error) {
    throw new APIError(
      "Failed to get products by id",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Get a product by category
export const getProductsByCategory = async (
  categoryName: string
): Promise<ProductData[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        category: {
          name: categoryName,
        },
        active: true,
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
      null
    );
  }
};

// Create a new product and save it to the database
export const createProduct = async (
  product: Omit<ProductData, "id">
): Promise<ProductData> => {
  try {
    const { name, description, image, price, categoryId } = product;
    const savedProduct = await db.product.create({
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
    return savedProduct;
  } catch (error) {
    throw new APIError(
      "Failed to create and save product on database",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Update an existing product in the database
export const updateProductById = async (
  product: Omit<ProductData, "id">,
  id: number
): Promise<ProductData> => {
  try {
    const { name, description, image, price, categoryId } = product;
    const updatedProduct = await db.product.update({
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
    return updatedProduct;
  } catch (error) {
    throw new APIError(
      "Failed to update product",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

// Deletes a product in the database by setting active field to FALSE
export const deleteProduct = async (id: number): Promise<ProductData> => {
  try {
    const deletedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return deletedProduct;
  } catch (error) {
    throw new APIError(
      "Failed to delete product",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};
