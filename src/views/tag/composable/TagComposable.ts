import { ref, onMounted } from 'vue'
import type { TagReadDTO } from '../dtos/TagReadDTO'
import { TagServices } from '../services/TagServices'

const tagServices = new TagServices()

export function tagComposable() {

  const tags = ref<TagReadDTO[]>([])

  onMounted(async () => {
    tags.value = await tagServices.tags()

    console.log(tags.value)
  })

  return { tags,  tagComposable}
}
