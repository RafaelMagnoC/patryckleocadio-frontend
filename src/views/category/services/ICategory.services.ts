import type { CategoryCreateDTO } from "../dtos/CategoryCreateDTO";
import type { CategoryReadWithGroupsDTO } from "../dtos/CategoryReadDTO";
import type { CategoryUpdateDTO } from "../dtos/CategoryUpdateDTO";

export interface ICategoryServices {

  categories(): Promise<CategoryReadWithGroupsDTO[]>

  categoryById(id: string): Promise<CategoryReadWithGroupsDTO>

  categoryByName(name: string): Promise<CategoryReadWithGroupsDTO>

  create(dto: CategoryCreateDTO): Promise<void>

  update(id: string, dto: CategoryUpdateDTO): Promise<void>

  delete(id: string): Promise<void>

}

