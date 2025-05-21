// src/views/__tests__/App.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './../../App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from './../../router/routes'
import { createPinia } from 'pinia'

describe('App.vue', () => {
    it('it mounts the component correctly and shows the route', async () => {
        const router = createRouter({
        history: createMemoryHistory(),
        routes,
        })

        const pinia = createPinia()

        router.push('/')
        await router.isReady()

        const wrapper = mount(App, {
        global: {
            plugins: [router, pinia],
        },
        })

        expect(wrapper.html()).toContain('Rick and Morty')
    })
})
