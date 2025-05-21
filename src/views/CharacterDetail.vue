<template>
    <div class="p-4 max-w-xl mx-auto">
        <button @click="goBack" class="mb-4 text-blue-500 hover:underline">&larr; Back</button>

        <LoadingSpinner v-if="loading" />
        <p v-if="error" class="text-red-500">Error: {{ error }}</p>

        <div v-if="character" class="bg-white rounded-lg shadow p-6">
            <img
                :src="character.image"
                :alt="character.name"
                class="w-full h-64 object-cover rounded-md mb-4"
            />
            <h1 class="text-2xl font-bold mb-2">{{ character.name }}</h1>
            <p><strong>Status:</strong> {{ character.status }}</p>
            <p><strong>Species:</strong> {{ character.species }}</p>
            <p><strong>Gender:</strong> {{ character.gender }}</p>
            <p><strong>Origin:</strong> {{ character.origin.name }}</p>
            <p><strong>Location:</strong> {{ character.location.name }}</p>
            <p><strong>Episodes:</strong> {{ character.episode.length }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCharactersStore } from '../store/characters'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const store = useCharactersStore()

const id = Number(route.params.id)

function goBack() {
  router.back()
}

onMounted(() => {
  store.loadCharacter(id)
})

const character = store.selected
const loading = store.loading
const error = store.error
</script>
