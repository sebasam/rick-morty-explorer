import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterCard from './../../components/CharacterCard.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import type { Character } from '@/types/character'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
        path: '/character/:id',
        name: 'CharacterDetail',
        component: { template: '<div />' },
        },
    ],
})

beforeAll(async () => {
    router.push('/')
    await router.isReady()
})

const characterMock: Character = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    type: '',
    gender: 'Male',
    origin: {
        name: 'Earth (C-137)',
        url: '',
    },
    location: {
        name: 'Citadel of Ricks',
        url: '',
    },
    episode: [],
    url: '',
    created: '',
}

describe('CharacterCard.vue', () => {
    it('show data from character', () => {
        const wrapper = mount(CharacterCard, {
        global: {
            plugins: [router],
        },
        props: {
            character: characterMock,
            currentPage: 2,
        },
        })

        expect(wrapper.text()).toContain('Rick Sanchez')
        expect(wrapper.text()).toContain('Human')
        expect(wrapper.text()).toContain('Alive')
    })

    it('the router-link generates the right route with currentPage', () => {
        const wrapper = mount(CharacterCard, {
        global: {
            plugins: [router],
        },
        props: {
            character: characterMock,
            currentPage: 2,
        },
        })

        const link = wrapper.get('a')
        expect(link.attributes('href')).toBe('/character/1?page=2')
    })

    it('the router-link generates the right route without currentPage', () => {
        const wrapper = mount(CharacterCard, {
        global: {
            plugins: [router],
        },
        props: {
            character: characterMock,
        },
        })

        const link = wrapper.get('a')
        expect(link.attributes('href')).toBe('/character/1')
    })
})
