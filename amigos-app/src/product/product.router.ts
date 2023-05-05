import express, { Request, Response, NextFunction } from "express";
import { adminLoginAuth, loginAuth } from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { body, validationResult } from "express-validator";

import * as ProductService from "./product.service";
import * as CategoryService from "../category/category.service";

// Create a new router instance
export const productRouter = express.Router();

// Define the CRUD endpoints

// GET: List of all products
productRouter.get(
  "",
  loginAuth,
  async (request: Request, response: Response, next: NextFunction) => {
    if (request.query.category) {
      return next(); // Move to the get products by category endpoint
    }
    const products = await ProductService.getAllProducts();
    return response.status(200).json(products);
  }
);

// GET: Products by category
productRouter.get(
  "",
  loginAuth,
  async (request: Request, response: Response) => {
    const categoryName = request.query.category as string;
    if (!categoryName || categoryName.trim() === "") {
      throw new APIError(
        "Category name is required",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }
    const products = await ProductService.getProductsByCategory(categoryName);
    response.send(products);
  }
);

// GET: A single product by ID
productRouter.get(
  "/:id",
  loginAuth,
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const product = await ProductService.getProductById(id);
    if (product) {
      return response.status(200).json(product);
    }
    throw new APIError("Product not found", HttpErrorCode.NOT_FOUND, null);
  }
);

// POST: Create a Product
// Params: name, description, image, price, categoryId
productRouter.post(
  "/",
  adminLoginAuth,
  body("name").isString(),
  body("description").isString(),
  body("image").isString(),
  body("price").isNumeric(),
  body("categoryName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new APIError(
        "Verify the data and try again",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const { name, description, image, price, categoryName } = request.body;

    const category = await CategoryService.getCategoryByName(categoryName);

    if (!category) {
      throw new APIError(
        "The category name field is not valid",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const newProduct = {
      name,
      description,
      image,
      price,
      categoryId: category.id,
    };
    const savedProduct = await ProductService.createProduct(newProduct);
    return response.status(201).json(savedProduct);
  }
);

// PUT: Updating an Product
// Params: name, description, image, price, categoryId
productRouter.put(
  "/:id",
  adminLoginAuth,
  body("name").isString(),
  body("description").isString(),
  body("image").isString(),
  body("price").isNumeric(),
  body("categoryName").isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new APIError(
        "Verify the data and try again",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const id: number = parseInt(request.params.id, 10);
    const { name, description, image, price, categoryName } = request.body;

    const category = await CategoryService.getCategoryByName(categoryName);

    if (!category) {
      throw new APIError(
        "The category name field is not valid",
        HttpErrorCode.BAD_REQUEST,
        null
      );
    }

    const newProduct = {
      name,
      description,
      image,
      price,
      categoryId: category.id,
    };
    const savedProduct = await ProductService.updateProductById(newProduct, id);
    return response.status(201).json(savedProduct);
  }
);

// DELETE: Delete an product based on the id
productRouter.delete(
  "/:id",
  adminLoginAuth,
  async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const deletedProduct = await ProductService.deleteProduct(id);
    const productName = deletedProduct.name;
    const message = `The product ${productName} was deleted successfully`;
    return response.status(200).json({ message });
  }
);
