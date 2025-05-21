import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from './../../router/routes'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'

interface StoreOverrides {
    page?: number
    list?: any[]
    loading?: boolean
    error?: any
    totalPages?: number
    [key: string]: any
}

vi.mock('../../components/LoadingSpinner.vue', () => ({
    default: {
        template: '<div class="loading-spinner">Loading...</div>',
    },
}))

vi.mock('../../components/CharacterCard.vue', () => ({
    default: {
        props: ['character', 'currentPage'],
        template: '<div class="character-card">{{ character.name }}</div>',
    },
}))

vi.mock('vue-toastification', () => ({
    useToast: () => ({
        error: vi.fn(),
    }),
}))

describe('HomeView.vue', () => {
    const createWrapper = async (storeOverrides: StoreOverrides = {}) => {
        const router = createRouter({
        history: createMemoryHistory(),
        routes,
        })

        router.push({ path: '/', query: { page: (storeOverrides.page ?? 1).toString() } })
        await router.isReady()

        const loadList = vi.fn()

        const wrapper = mount(HomeView, {
        global: {
            plugins: [
            router,
            createTestingPinia({
                stubActions: false,
                initialState: {
                characters: {
                    list: storeOverrides.list ?? [],
                    loading: storeOverrides.loading ?? false,
                    error: storeOverrides.error ?? null,
                    totalPages: storeOverrides.totalPages ?? 1,
                    page: storeOverrides.page ?? 1,
                },
                },
                createSpy: () => loadList,
            }),
            ],
        },
        })

        return { wrapper, loadList }
    }

    it('show the title', async () => {
        const { wrapper } = await createWrapper()
        expect(wrapper.text()).toContain('Rick and Morty Characters')
    })

    it('show the spinner if loading = true', async () => {
        const { wrapper } = await createWrapper({ loading: true })
        expect(wrapper.find('.loading-spinner').exists()).toBe(true)
    })

    it('render characters if loading = false and without errors', async () => {
        const { wrapper } = await createWrapper({
        list: [
            { id: 1, name: 'Rick' },
            { id: 2, name: 'Morty' },
        ],
        })
        await nextTick()
        expect(wrapper.findAll('.character-card')).toHaveLength(2)
    })

    it('disable th e"Prev" button in the first page', async () => {
        const { wrapper } = await createWrapper({ page: 1, totalPages: 5 })
        const buttons = wrapper.findAll('button')
        expect(buttons[0].attributes('disabled')).toBeDefined()
    })

    it('calls to loadList when component is mounted', async () => {
        const { loadList } = await createWrapper()
        expect(loadList).toHaveBeenCalled()
    })
})
