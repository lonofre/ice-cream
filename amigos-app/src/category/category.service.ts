import { db } from "../utils/db.server"
import { APIError, HttpErrorCode } from "../utils/errors";

type CategoryData = {
  id: number;
  name: string;
};


// Get all categorys from the database 
export const getAllCategories = async (): Promise<CategoryData[]> => {
    try{
        return db.category.findMany({
            select: {
                id: true, 
                name: true, 
            },
        });
    }catch(errror){
        throw new APIError(
            "Failed to get categories",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};

// Get a category by id 
export const getCategoryById = async (id: number): Promise<CategoryData | null> => {
    try{
        return db.category.findUnique({
            where: {
            id,
            },
        });
    }catch(errror){
        throw new APIError(
            "Failed to get category by id",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
}

// Get a category by name 
export const getCategoryByName = async (name: string): Promise<CategoryData | null> => {
    try{
        return db.category.findUnique({
            where: {
            name,
            },
        });
    }catch(errror){
        throw new APIError(
            "Failed to get category by name",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
}

// Create a new category and save it to the database
export const createCategory = async (
    category: Omit<CategoryData, "id">
  ): Promise<CategoryData> => {
    try{
        const { name } = category;
        return db.category.create({
        data: {
            name,
        },
        select: {
            id: true,
            name: true,
        },
        });
    }catch(errror){
        throw new APIError(
            "Failed to create and save category on database",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
  
// Update an existing category in the database
export const updateCategoryById = async (
    category: Omit<CategoryData, "id">,
    id: number
  ): Promise<CategoryData> => {
    try{
        const { name } = category;
        return db.category.update({
        where: {
            id,
        },
        data: {
            name,
        },
        select: {
            id: true,
            name: true,
        },
        });
    }catch(errror){
        throw new APIError(
            "Failed to update category",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};
  
// Delete a category from the database
export const deleteCategory = async (id: number): Promise<string> => {
    try{
        await db.category.delete({
        where: {
            id,
        },
        });
        return "Category deleted succesfully";
    }catch(errror){
        throw new APIError(
            "Failed to delete category",
            HttpErrorCode.INTERNAL_SERVER_ERROR,
            null
        )
    }
};


