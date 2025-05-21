import HomeView from '../HomeView.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './../../router/routes'
import { createTestingPinia } from '@pinia/testing'
import { useCharactersStore } from '../../stores/characters'
import { nextTick } from 'vue'

const toastMock = {
    error: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
}

vi.mock('vue-toastification', () => ({
    useToast: () => toastMock,
}))

describe('HomeView.vue - integration', () => {
    let wrapper: any
    let store: any

    beforeEach(async () => {
        const router = createRouter({
        history: createWebHistory(),
        routes,
        })

        wrapper = mount(HomeView, {
        global: {
            plugins: [
            createTestingPinia({
                createSpy: vi.fn,
                stubActions: false,
            }),
            router,
            ],
        },
        })

        store = useCharactersStore()
        await router.isReady()

        toastMock.error.mockClear()
    })

    it('render characters when store have data', async () => {
        store.list = [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
        ]
        store.loading = false
        store.error = null
        await nextTick()

        const cards = wrapper.findAll('[data-test="character-card"]')
        expect(cards.length).toBe(2)
    })

    it('show the spinner when loading is true', async () => {
        store.loading = true
        store.error = null
        await nextTick()

        const spinner = wrapper.find('[data-test="spinner"]')
        expect(spinner.exists()).toBe(true)
    })

    it('show the toast with error message when there are errors', async () => {
        store.loading = false
        store.error = 'API Failed'
        await nextTick()
        await nextTick()

        expect(toastMock.error).toHaveBeenCalledWith(
        expect.stringContaining('API Failed'),
        expect.any(Object)
        )
    })
})
