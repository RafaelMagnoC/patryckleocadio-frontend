import { request } from "@/api/request";
import type { CategoryCreateDTO } from "../dtos/CategoryCreateDTO";
import type { CategoryReadDTO } from "../dtos/CategoryReadDTO";
import type { CategoryUpdateDTO } from "../dtos/CategoryUpdateDTO";
import type { ICategoryServices } from "./ICategory.services";

export class CategoryService implements ICategoryServices {

  async categories(): Promise<CategoryReadDTO[]> {

    return await request("category", { method: 'GET' })
  }

  async categoryById(id: string): Promise<CategoryReadDTO> {

    return await request(`category/${id}`, { method: 'GET' })
  }

  async categoryByName(name: string): Promise<CategoryReadDTO> {

    return await request(`category/${name}`, { method: 'GET' })
  }

  async create(dto: CategoryCreateDTO): Promise<void> {

    await request(`category`, { method: 'POST', body: dto })
  }

  async update(id: string, dto: CategoryUpdateDTO): Promise<void> {

    await request(`category/${id}`, { method: 'PATCH', body: dto, })
  }

  async delete(id: string): Promise<void> {

    await request(`category/${id}`, { method: 'DELETE' })
  }

}
