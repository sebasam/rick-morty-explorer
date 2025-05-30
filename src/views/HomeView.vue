<template>
  <div class="p-4 max-h-screen flex flex-col">
    <h1 class="text-3xl font-bold mb-4 flex-shrink-0">Rick and Morty Characters</h1>

  <LoadingSpinner v-if="loading" data-test="spinner" />

    <p v-if="!loading && error" class="text-red-600 mb-4">{{ error }}</p>

    <div
      v-if="!loading && !error"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto flex-grow"
    >
    <CharacterCard
      v-for="char in characters"
      :key="char.id"
      :character="char"
      :currentPage="page"
      data-test="character-card"
    />
    </div>

    <div
      class="flex justify-center mt-6 flex-shrink-0 sticky bottom-0 py-2 px-4 border-t border-gray-300 bg-white rounded-t-lg shadow-lg"
      v-if="totalPages > 1"
    >
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-1 rounded-l-md bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
      >
        Prev
      </button>
      <span
        class="px-5 py-1 bg-gray-100 border-t border-b border-gray-300 text-gray-700 font-medium flex items-center select-none mx-2 rounded"
      >
        Page {{ page }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-4 py-1 rounded-r-md bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useCharactersStore } from '../stores/characters'
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import CharacterCard from '../components/CharacterCard.vue'
  import { useToast } from 'vue-toastification'

  const toast = useToast()
  const store = useCharactersStore()
  const route = useRoute()
  const router = useRouter()

  const page = ref(Number(route.query.page) || 1)

  watch(
    () => route.query.page,
    (newPage) => {
      const p = Number(newPage) || 1
      if (p !== page.value) {
        page.value = p
        store.loadList(p)
      }
    },
  )

  onMounted(() => {
    store.loadList(page.value)
  })

  const characters = computed(() => store.list)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const totalPages = computed(() => store.totalPages)

  watch(error, (err) => {
    if (err) {
      toast.error(`Error: ${err}`, {
        timeout: 4000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  })

  function changePage(newPage: number) {
    router.push({ path: '/', query: { page: newPage.toString() } })
  }

  function prevPage() {
    if (page.value > 1) changePage(page.value - 1)
  }

  function nextPage() {
    if (page.value < totalPages.value) changePage(page.value + 1)
  }
</script>
