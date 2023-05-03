import express, { Request, Response } from "express";
import {
    adminLoginAuth,
    loginAuth,
    tabletMasterLoginAuth,
} from "../middleware/auth";
import { APIError, HttpErrorCode } from "../utils/errors";
import { handleLogin } from "../login/login.service";
import { body, validationResult } from "express-validator";

import * as CategoryService from "./category.service"

// Create a new router instance
export const categoryRouter = express.Router();

// Define the CRUD endpoints

// GET: List of all categories
categoryRouter.get("/categories/", loginAuth, async (request: Request, response: Response) => {
    const categories = await CategoryService.getAllCategories();
    return response.status(200).json(categories);
  });
  
  // GET: A single category by name
  categoryRouter.get("/category/:name", loginAuth, async (request: Request, response: Response) => {
    const name: string = request.params.name;
    const category = await CategoryService.getCategoryByName(name);
    if (category) {
        return response.status(200).json(category);
    }
    throw new APIError(
        "Category not found",
        HttpErrorCode.NOT_FOUND,
        null,
    ); 
  });
  
  // POST: Create a Category
  // Params: name
  categoryRouter.post(
    "/",
    adminLoginAuth,
    body("name").isString(),
    async (request: Request, response: Response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new APIError(
          "Verify the data and try again",
          HttpErrorCode.BAD_REQUEST,
          null
        );
      }
  
      const { name } = request.body;
      const newCategory = { name };
      const savedCategory = await CategoryService.createCategory(newCategory);
      return response.status(201).json(savedCategory);
    }
  );
  
  // PUT: Updating an Category
  // Params: name, description, image, price, categoryId
  categoryRouter.put(
    "/:id",
    adminLoginAuth,
    body("name").isString(),
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
      const { name } = request.body;
      const newCategory = { name };
      const savedCategory = await CategoryService.updateCategoryById(newCategory, id);
      return response.status(201).json(savedCategory);
    }
  );
  
  // DELETE: Delete an category based on the id
  categoryRouter.delete("/:id", adminLoginAuth, async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    const deletedCategory = await CategoryService.deleteCategory(id);
    return response.status(204).json(deletedCategory);
  });
