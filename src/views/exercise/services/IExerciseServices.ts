

export interface IExerciseServices {

  exercises(): Promise<ExerciseReadDTO[]>

  exerciseById(id: string): Promise<CategoryReadWithGroupsDTO>

  exerciseByName(name: string): Promise<CategoryReadWithGroupsDTO>

  create(dto: CategoryCreateDTO): Promise<void>

  update(id: string, dto: CategoryUpdateDTO): Promise<void>

  delete(id: string): Promise<void>

}

