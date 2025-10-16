import { request } from "@/api/request";
import type { TagReadDTO } from "../dtos/TagReadDTO";
import type { TagCreateDTO } from "../dtos/TagCreateDTO";
import type { TagUpdateDTO } from "../dtos/TagUpdateDTO";
import type { ITagServices } from "./ITagServices";

export class TagServices implements ITagServices {

  async tags(): Promise<TagReadDTO[]> {

    return await request("tag", { method: 'GET' })
  }

  async tagById(id: string): Promise<TagReadDTO> {

    console.log(id)
    return await request(`tag/${id}`, { method: 'GET' })
  }

  async tagByName(name: string): Promise<TagReadDTO> {

    return await request(`tag/${name}`, { method: 'GET' })
  }

  async create(dto: TagCreateDTO): Promise<void> {

    await request(`tag`, { method: 'POST', body: dto })
  }

  async update(id: string, dto: TagUpdateDTO): Promise<void> {

    await request(`tag/${id}`, { method: 'PATCH', body: dto, })
  }

  async delete(id: string): Promise<void> {

    await request(`tag/${id}`, { method: 'DELETE' })
  }

}
