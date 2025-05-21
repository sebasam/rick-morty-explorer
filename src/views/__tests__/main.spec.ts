import { describe, it, expect, vi } from 'vitest'

vi.mock('vue', async () => {
    const actualVue = await vi.importActual<any>('vue')
    return {
        ...actualVue,
        createApp: vi.fn(() => ({
        use: vi.fn().mockReturnThis(),
        mount: vi.fn(),
        })),
    }
})

vi.mock('vue-toastification', () => ({
    default: vi.fn(),
    POSITION: { TOP_RIGHT: 'top-right' },
}))

vi.mock('vue-toastification/dist/index.css', () => ({}))
vi.mock('@/router', () => ({}))
vi.mock('pinia', async (importActual) => {
    const actual = await importActual<typeof import('pinia')>()
    return {
        ...actual,
        createPinia: vi.fn(() => 'mockPinia'),
    }
})

vi.mock('@/App.vue', () => ({
    default: {},
}))

import './../../main'

import { createApp } from 'vue'

describe('main.ts', () => {
    it('mounted app and plugins correctly', () => {
        expect(createApp).toHaveBeenCalled()
        const app = (createApp as any).mock.results[0].value

        expect(app.use).toHaveBeenCalledTimes(3)
        expect(app.mount).toHaveBeenCalledWith('#app')
    })
})
