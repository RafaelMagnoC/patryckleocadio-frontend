import type { GroupCreateDTO } from "../dtos/GroupCreateDTO"
import type { GroupReadWithCategoriesDTO } from "../dtos/GroupReadDTO"

export interface IGroupServices {

  groups(): Promise<GroupReadWithCategoriesDTO[]>

  groupById(id: string): Promise<GroupReadWithCategoriesDTO>

  groupByName(name: string): Promise<GroupReadWithCategoriesDTO>

  create(dto: GroupCreateDTO): Promise<void>

  update(id: string, dto: GroupCreateDTO): Promise<void>

  delete(id: string): Promise<void>
}
