import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchCharacters, fetchCharacterById } from './../../services/api'
import type { Character } from './../../types/character'

global.fetch = vi.fn()

const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
}

describe('api.ts', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetchCharacters returns a character list', async () => {
        ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            results: [mockCharacter],
            info: { count: 1, pages: 1 },
        }),
        })

        const data = await fetchCharacters(1)

        expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('character?page=1')
        )
        expect(data.results).toHaveLength(1)
        expect(data.results[0].name).toBe('Rick Sanchez')
    })

    it('fetchCharacterById returns a character by ID', async () => {
        ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCharacter,
        })

        const data = await fetchCharacterById(1)

        expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('character/1')
        )
        expect(data.name).toBe('Rick Sanchez')
    })

    it('thros error if api response fail', async () => {
        ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        })

        await expect(fetchCharacters()).rejects.toThrow('API error: 500 Internal Server Error')
    })
})
