<template>
  <div class="p-4 max-w-6xl mx-auto">
    <button
      @click="goBack"
      class="flex items-center mb-4 text-blue-600 hover:text-blue-800 transition"
    >
      <span class="material-icons mr-1">arrow_back</span> Volver
    </button>

    <div v-if="character" class="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row gap-6">
      <img
        :src="character.image"
        :alt="character.name"
        class="w-full lg:w-1/3 h-auto object-cover rounded-md shadow-md transition transform hover:scale-105"
      />

      <div class="flex-1 space-y-4">
        <h2 class="text-3xl font-bold">{{ character.name }}</h2>
        <p><strong>Especie:</strong> {{ character.species }}</p>
        <p><strong>Estado:</strong> {{ character.status }}</p>
        <p><strong>Género:</strong> {{ character.gender }}</p>
        <p><strong>Origen:</strong> {{ character.origin.name }}</p>
        <p><strong>Ubicación:</strong> {{ character.location.name }}</p>
      </div>
    </div>

    <p v-else class="text-gray-500">No se encontró información del personaje.</p>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCharactersStore } from '../stores/characters'

  const store = useCharactersStore()
  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    const id = parseInt(route.params.id as string, 10)
    store.loadCharacter(id)
  })

  const character = computed(() => store.selected)

  function goBack() {
    if (route.query.page) {
      router.push({ path: '/', query: { page: route.query.page.toString() } })
    } else {
      router.push({ path: '/' })
    }
  }
</script>

<style scoped>
  .material-icons {
    font-family: 'Material Icons';
    font-size: 20px;
    line-height: 1;
  }
</style>
