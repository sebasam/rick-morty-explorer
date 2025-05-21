import { defineStore } from 'pinia'
import type { Character } from '../types/character'
import { fetchCharacters, fetchCharacterById } from '../services/api'

interface State {
    list: Character[]
    selected: Character | null
    loading: boolean
    error: string | null
    page: number
    totalPages: number
}

export const useCharactersStore = defineStore('characters', {
    state: (): State => ({
      list: [],
      selected: null,
      loading: false,
      error: null,
      page: 1,
      totalPages: 0,
    }),
    actions: {
      async loadList(page = 1) {
        this.loading = true
        this.error = null
  
        try {
          const { results, info } = await fetchCharacters(page)
          this.list = results
          this.page = page
          this.totalPages = info.pages
        } catch (err: any) {
          this.error = err.message
        } finally {
          this.loading = false
        }
      },
  
      async loadCharacter(id: number) {
        this.selected = null
        this.loading = true
        this.error = null
  
        try {
          const char = await fetchCharacterById(id)
          this.selected = char
        } catch (err: any) {
          this.error = err.message
        } finally {
          this.loading = false
        }
      },
    },
})