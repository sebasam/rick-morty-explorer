<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Rick and Morty Characters</h1>

    <LoadingSpinner v-if="loading" />
    <p v-if="error" class="text-red-500">Error: {{ error }}</p>

    <div
      v-if="!loading && !error"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <CharacterCard v-for="char in characters" :key="char.id" :character="char" />
    </div>

    <div class="flex justify-center mt-6" v-if="totalPages > 1">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 rounded-l bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>
      <span class="px-4 py-2 bg-white border-t border-b">Page {{ page }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-4 py-2 rounded-r bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useCharactersStore } from '../stores/characters'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import CharacterCard from '../components/CharacterCard.vue'

const store = useCharactersStore()

onMounted(() => {
  store.loadList()
})

const characters = computed(() => store.list)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const page = computed(() => store.page)
const totalPages = computed(() => store.totalPages)

function prevPage() {
  if (page.value > 1) store.loadList(page.value - 1)
}
function nextPage() {
  if (page.value < totalPages.value) store.loadList(page.value + 1)
}
</script>
