import type { CategoryReadDTO } from "@/views/category/dtos/CategoryReadDTO";

export class GroupReadDTO {
  id!: string;
  name!: string;
  description?: string;
}

export class GroupReadWithCategoriesDTO extends GroupReadDTO {

  categories?: CategoryReadDTO[];
}
