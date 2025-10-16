import type { TagCreateDTO } from '../dtos/TagCreateDTO'
import type { TagReadDTO } from '../dtos/TagReadDTO'
import type { TagUpdateDTO } from '../dtos/TagUpdateDTO'

export interface ITagServices {
  tags(): Promise<TagReadDTO[]>

  tagById(id: string): Promise<TagReadDTO>

  tagByName(name: string): Promise<TagReadDTO>

  create(dto: TagCreateDTO): Promise<void>

  update(id: string, dto: TagUpdateDTO): Promise<void>

  delete(id: string): Promise<void>
}
