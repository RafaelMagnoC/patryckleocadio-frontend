import { request } from "@/api/request";
import type { GroupCreateDTO } from "../dtos/GroupCreateDTO";
import type { GroupReadWithCategoriesDTO } from "../dtos/GroupReadDTO";
import type { IGroupServices } from "./IGroupServices";

export class GroupServices implements IGroupServices {

  async groups(): Promise<GroupReadWithCategoriesDTO[]> {

    return await request("group", { method: 'GET' })
  }
  async groupById(id: string): Promise<GroupReadWithCategoriesDTO> {

    return await request(`group/${id}`, { method: 'GET' })
  }
  async groupByName(name: string): Promise<GroupReadWithCategoriesDTO> {

    return await request(`group/${name}`, { method: 'GET' })
  }
  async create(dto: GroupCreateDTO): Promise<void> {

    await request(`group`, { method: 'POST', body: dto })
  }
  async update(id: string, dto: GroupCreateDTO): Promise<void> {

    await request(`group/${id}`, { method: 'PATCH', body: dto, })
  }
  async delete(id: string): Promise<void> {

    await request(`group/${id}`, { method: 'DELETE' })
  }

}
