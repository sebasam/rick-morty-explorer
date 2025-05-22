# Rick & Morty Explorer

Rick & Morty Explorer es una aplicación frontend construida con **Vue 3**, **TypeScript**, **Pinia** y **Tailwind CSS**, que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/) para visualizar personajes y detalles de la serie. La app está diseñada con enfoque en buenas prácticas de arquitectura, mantenibilidad y experiencia de usuario.

---

## 🎯 Objetivo

Explorar personajes del universo de Rick & Morty con una experiencia fluida, responsive y moderna:

- Visualizar lista de personajes
- Ver información detallada de cada personaje
- Notificaciones en tiempo real para errores o acciones
- Código limpio, tipado y con separación de responsabilidades

---

## 🚀 Tecnologías usadas

| Herramienta        | Uso principal                          |
|--------------------|----------------------------------------|
| Vue 3              | Framework SPA con Composition API      |
| TypeScript         | Tipado estático                        |
| Pinia              | Manejo de estado global reactivo       |
| Vue Router         | Enrutamiento SPA                       |
| Tailwind CSS       | Estilización rápida y responsiva       |
| Vue Toastification | Notificaciones y alertas al usuario    |
| Vite               | Bundler rápido y moderno               |
| ESLint + Prettier  | Calidad de código y formateo           |

---

## 🧠 Arquitectura y decisiones técnicas

### 🔄 Flujo y arquitectura

- **Carga inicial:** En `HomeView.vue`, al montar el componente, se realiza la llamada a la API de Rick & Morty para obtener la lista de personajes.
- **Estado global:** La lista de personajes, el estado de carga y los errores se manejan desde la store de Pinia (`characterStore.ts`), lo que nos facilita su acceso y gestión desde cualquier componente.
- **Interacción usuario:** Al hacer clic en uno de los personajes, podemos navegar a `CharacterDetail.vue` mostrando información detallada sin recargar la página.
- **Manejo de errores:** Si falla la llamada a la API, se muestra una notificación con Vue Toastification para alertar al usuario.
- **Rutas SPA:** La navegación entre vistas está gestionada con Vue Router, asegurandonos una experiencia fluida sin recargas.

### ⚙️ Decisiones técnicas clave

- **Pinia como estado global:** Se eligió por su integración nativa con Vue 3, API simple y modular frente a Vuex.
- **Composition API:** Favorece la reutilización y organización del código con funciones reactivas, mejorando legibilidad y mantenibilidad del mismo.
- **Vue Toastification:** Se utiliza para mostrar notificacionesa, mejorando la experiencia del usuario.
- **Tailwind CSS:** Permite construir una UI responsiva y rápida sin necesidad de mucho CSS personalizado.
- **Vitest para testing:** Compatibilidad con Vite, tiene soporte moderno para tests unitarios e integración, veloz y simple.
- **TypeScript:** Tipado estricto, autocompletado y detección temprana de errores.

### 🚧 Mejoras futuras y roadmap

- Añadir filtros avanzados (nombre, especie, estado).
- Implementar paginación infinita o scroll infinito.
- Agregar modo oscuro para mejor UX.
- Cachear resultados para reducir llamadas a la API.
- Internacionalización (i18n) para soporte multilenguaje.
- Animaciones/transiciones suaves para mejorar la interacción.
- Tests E2E con Cypress o Playwright.
- Mejoras en accesibilidad (cumplimiento WCAG).

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/sebasam/rick-morty-explorer.git
cd rick-morty-explorer
npm install
npm run dev
```

## Este proyecto usa Vitest + @vue/test-utils para pruebas unitarias.

```bash
npm run test
```
