import { db } from "../utils/db.server";
import { APIError, HttpErrorCode } from "../utils/errors";

type IcecremData = {
  id: number;
  flavor: string;
  image: string;
}

export const getAllIcecreams = async (): Promise<IcecremData[]> => {
  try {
    const icrecreams = await db.iceCreamCatalog.findMany({
      where: { active: true },
      select: {
        id: true,
        flavor: true,
        image: true,
      },
    });
    return icrecreams;
  } catch (error) {
    throw new APIError(
      "Failed to get products",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
}

export const createIcecream =
  async (icecream: Omit<IcecremData, "id">): Promise<IcecremData> => {
    try {
      const { flavor, image } = icecream;
      const savedIcecream = await db.iceCreamCatalog.create({
        data: {
          flavor,
          image
        },
        select: {
          id: true,
          flavor: true,
          image: true
        },
      });
      return savedIcecream;
    } catch (error) {
      throw new APIError(
        "Failed to create and save product on database",
        HttpErrorCode.INTERNAL_SERVER_ERROR,
        null
      );
    }
  }


export const updateIcecream = async (
  icecream: IcecremData
): Promise<IcecremData> => {
  try {
    const { id, flavor, image } = icecream;
    const updatedIcecream = await db.iceCreamCatalog.update({
      where: {
        id,
      },
      data: {
        id,
        flavor,
        image
      },
      select: {
        id: true,
        flavor: true,
        image: true
      },
    });
    return updatedIcecream;
  } catch (error) {
    throw new APIError(
      "Failed to update product",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};

export const deleteIcecream = async (id: number): Promise<IcecremData> => {
  try {
    const deletedIcecream = await db.iceCreamCatalog.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return deletedIcecream;
  } catch (error) {
    throw new APIError(
      "Failed to delete product",
      HttpErrorCode.INTERNAL_SERVER_ERROR,
      null
    );
  }
};