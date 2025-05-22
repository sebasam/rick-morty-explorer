import type { Character } from '../types/character'

const BASE_URL = import.meta.env.VITE_API_URL

async function request<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`)
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Request failed', error)
    throw error
  }
}

export async function fetchCharacters(
  page = 1,
): Promise<{ results: Character[]; info: { count: number; pages: number } }> {
  return await request(`character?page=${page}`)
}

export async function fetchCharacterById(id: number): Promise<Character> {
  return await request(`character/${id}`)
}
