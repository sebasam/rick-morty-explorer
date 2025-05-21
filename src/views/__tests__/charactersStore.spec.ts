// src/stores/__tests__/charactersStore.spec.ts

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCharactersStore } from './../../stores/characters'
import * as api from './../../services/api'

const characterMock = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive' as const,
    species: 'Human',
    type: '',
    gender: 'Male' as const,
    origin: { name: 'Earth', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
}

beforeEach(() => {
    setActivePinia(createPinia())
})

describe('characters store', () => {
    it('loadList updates the list, page and totalPages', async () => {
        const store = useCharactersStore()

        const mockResults = [characterMock]
        const mockInfo = {
            count: 1,
            pages: 42,
        }

        vi.spyOn(api, 'fetchCharacters').mockResolvedValueOnce({
        results: mockResults,
        info: mockInfo,
        })

        await store.loadList(2)

        expect(store.loading).toBe(false)
        expect(store.error).toBeNull()
        expect(store.list).toEqual(mockResults)
        expect(store.page).toBe(2)
        expect(store.totalPages).toBe(42)
    })

    it('loadList handle errors correctly', async () => {
        const store = useCharactersStore()

        vi.spyOn(api, 'fetchCharacters').mockRejectedValueOnce(new Error('Failed to load'))

        await store.loadList(1)

        expect(store.loading).toBe(false)
        expect(store.list).toEqual([])
        expect(store.error).toBe('Failed to load')
    })

    it('loadCharacter updates selected correctly', async () => {
        const store = useCharactersStore()

        vi.spyOn(api, 'fetchCharacterById').mockResolvedValueOnce(characterMock)

        await store.loadCharacter(1)

        expect(store.loading).toBe(false)
        expect(store.selected).toEqual(characterMock)
        expect(store.error).toBeNull()
    })

    it('loadCharacter handle errors correctly', async () => {
        const store = useCharactersStore()

        vi.spyOn(api, 'fetchCharacterById').mockRejectedValueOnce(new Error('Character not found'))

        await store.loadCharacter(999)

        expect(store.loading).toBe(false)
        expect(store.selected).toBeNull()
        expect(store.error).toBe('Character not found')
    })
})
