import { describe, it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import CharacterDetail from '../CharacterDetail.vue'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
    useRoute: vi.fn(),
    useRouter: vi.fn(),
}))

import { useRoute, useRouter } from 'vue-router'

describe('CharacterDetail.vue', () => {
    it('muestra los datos del personaje si existen', () => {
        const pinia = createTestingPinia({
        createSpy: vi.fn,
        initialState: {
            characters: {
            selected: {
                id: 1,
                name: 'Rick Sanchez',
                species: 'Human',
                status: 'Alive',
                gender: 'Male',
                origin: { name: 'Earth' },
                location: { name: 'Citadel of Ricks' },
                image: 'rick.png',
            },
            error: null,
            },
        },
        })

        ;(useRoute as any).mockReturnValue({
        params: { id: '1' },
        query: {},
        })

        ;(useRouter as any).mockReturnValue({
        push: vi.fn(),
        })

        const wrapper = shallowMount(CharacterDetail, {
        global: {
            plugins: [pinia],
        },
        })

        expect(wrapper.text()).toContain('Rick Sanchez')
    })

    it('muestra mensaje si no hay personaje', () => {
        const pinia = createTestingPinia({
        createSpy: vi.fn,
        initialState: {
            characters: {
            selected: null,
            error: null,
            },
        },
        })

        ;(useRoute as any).mockReturnValue({
        params: { id: '1' },
        query: {},
        })

        ;(useRouter as any).mockReturnValue({
        push: vi.fn(),
        })

        const wrapper = shallowMount(CharacterDetail, {
        global: {
            plugins: [pinia],
        },
        })

        expect(wrapper.text()).toContain('No se encontró información del personaje.')
    })

    it('navega a la página principal cuando se hace click en Volver (sin query)', async () => {
        const pushMock = vi.fn()

        ;(useRoute as any).mockReturnValue({
        params: { id: '1' },
        query: {},
        })

        ;(useRouter as any).mockReturnValue({
        push: pushMock,
        })

        const pinia = createTestingPinia({
        createSpy: vi.fn,
        initialState: {
            characters: {
            selected: null,
            error: null,
            },
        },
        })

        const wrapper = shallowMount(CharacterDetail, {
        global: {
            plugins: [pinia],
        },
        })

        const button = wrapper.find('button')
        await button.trigger('click')

        expect(pushMock).toHaveBeenCalledWith({ path: '/' })
    })

    it('go to main page with query.page when user touch click', async () => {
        const pushMock = vi.fn()

        ;(useRoute as any).mockReturnValue({
        params: { id: '1' },
        query: { page: '2' },
        })

        ;(useRouter as any).mockReturnValue({
        push: pushMock,
        })

        const pinia = createTestingPinia({
        createSpy: vi.fn,
        initialState: {
            characters: {
            selected: null,
            error: null,
            },
        },
        })

        const wrapper = shallowMount(CharacterDetail, {
        global: {
            plugins: [pinia],
        },
        })

        const button = wrapper.find('button')
        await button.trigger('click')

        expect(pushMock).toHaveBeenCalledWith({ path: '/', query: { page: '2' } })
    })
})
