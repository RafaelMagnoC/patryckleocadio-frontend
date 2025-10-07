import type { GroupReadDTO } from "@/views/group/dtos/GroupReadDTO";

export class CategoryReadDTO {
  id!: string;
  name!: string;
  description?: string;
}

export class CategoryReadWithGroupsDTO extends CategoryReadDTO {

  groups?: GroupReadDTO[];
}
