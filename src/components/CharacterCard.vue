<template>
  <router-link
    :to="`/character/${character.id}`"
    class="block bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
  >
    <img
      :src="character.image"
      :alt="character.name"
      class="w-full h-48 object-cover rounded-md mb-2"
    />
    <h3 class="text-lg font-semibold">{{ character.name }}</h3>
    <p class="text-sm text-gray-500">{{ character.species }} - {{ character.status }}</p>
  </router-link>
</template>

<script lang="ts" setup>
import type { Character } from '../types/character'

interface Props {
  character: Character
}
const props = defineProps<Props>()
</script>
