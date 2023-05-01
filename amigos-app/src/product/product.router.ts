import express, { Request, Response } from "express";
import {
    adminLoginAuth,
    loginAuth,
    tabletMasterLoginAuth,
} from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { handleLogin } from "../login/login.service";
import { body, validationResult } from "express-validator";

import * as ProductService from "./product.service"

// Create a new router instance
export const productRouter = express.Router();

// Define the CRUD endpoints

// GET: List of all Products
productRouter.get("/", loginAuth, async (request: Request, response: Response) => {
    try {
      const products = await ProductService.getAllProducts();
      return response.status(200).json(products);
    } catch (error: any) {
        throw new APIError(
            error.message,
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null,
        );    
    }
  });
  
  // GET: A single product by ID
  productRouter.get("/:id", loginAuth, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      const product = await ProductService.getProductById(id);
      if (product) {
        return response.status(200).json(product);
      }
      throw new APIError(
        "Product not found",
        HttpErrorCode.NOT_FOUND,
        null,
    ); 
    } catch (error: any) {
        throw new APIError(
            error.message,
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null,
        ); 
    }
  });

  // GET: Products by category
  productRouter.get("/category/:categoryName", loginAuth, async (request: Request, response: Response) => {
    const { categoryName } = request.params;
  
    if (!categoryName) {
      throw new APIError(
        "Category name is required",
        HttpErrorCode.BAD_REQUEST,
        null,
      );
    }
  
    try {
      const products = await ProductService.getProductsByCategory(categoryName);
      response.send(products);
    } catch (error: any) {
      throw new APIError(
        error.message,
        HttpErrorCode.INTERNAL_SERVER_ERROR,
        null,
      );
    }
  });
  
  // POST: Create a Product
  // Params: name, description, image, price, categoryId
  productRouter.post(
    "/", adminLoginAuth,
    body("name").isString(),
    body("description").isString(),
    body("image").isString(),
    body("price").isNumeric(),
    body("categoryId").isNumeric(),
    async (request: Request, response: Response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new APIError(
            "Verify the data and try again",
            HttpErrorCode.BAD_REQUEST,
            null,
        ); 
      }
      try {
        const { name, description, image, price, categoryId } = request.body;
        const isValidCategoryId = validateCategoryId(categoryId);
        if(!isValidCategoryId){
            throw new APIError(
                "The category id field is not valid",
                HttpErrorCode.BAD_REQUEST,
                null,
            );
        }
        const newProduct = { name, description, image, price, categoryId };
        const savedProduct = await ProductService.createProduct(newProduct);
        return response.status(201).json(savedProduct);
      } catch (error: any) {
        throw new APIError(
            error.message,
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null,
        )
      }
    }
  );
  
  // PUT: Updating an Product
  // Params: firstName, lastName
  productRouter.put(
    "/:id", adminLoginAuth,
    body("name").isString(),
    body("description").isString(),
    body("image").isString(),
    body("price").isNumeric(),
    body("categoryId").isNumeric(),
    async (request: Request, response: Response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new APIError(
            "Verify the data and try again",
            HttpErrorCode.BAD_REQUEST,
            null,
        ); 
      }
      const id: number = parseInt(request.params.id, 10);
      try {
        const { name, description, image, price, categoryId } = request.body;
        const isValidCategoryId = validateCategoryId(categoryId);
        if(!isValidCategoryId){
            throw new APIError(
                "The category id field is not valid",
                HttpErrorCode.BAD_REQUEST,
                null,
            );
        }
        const newProduct = { name, description, image, price, categoryId };
        const savedProduct = await ProductService.updateProductById(newProduct, id);
        return response.status(201).json(savedProduct);
      } catch (error: any) {
        throw new APIError(
            error.message,
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null,
        )
      }
    }
  );
  
  // DELETE: Delete an product based on the id
  productRouter.delete("/:id", adminLoginAuth, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
      await ProductService.deleteProduct(id);
      return response.status(204).json("Product has been successfully deleted");
    } catch (error: any) {
      throw new APIError(
        error.message,
        HttpErrorCode.INTERNAL_SERVER_ERROR,
        null
      )
    }
  });



  // TODO: Verifies if a given categoryId is valid
function validateCategoryId(categoryId: string): boolean {
    return true;
}
