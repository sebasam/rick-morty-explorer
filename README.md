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

## 📂 Estructura del proyecto

src/
├── components/
│ ├── CharacterCard.vue # Tarjeta individual de personaje
│ └── CharacterDetail.vue # Vista detallada del personaje
├── views/
│ └── HomeView.vue # Vista principal (lista personajes)
├── router/
│ └── index.ts # Rutas SPA
├── stores/
│ └── characters.ts # Pinia Store (API y estados)
├── App.vue # Componente raíz
└── main.ts # Configuración principal


---

## 🧠 Decisiones técnicas

- **Pinia** fue elegido por su simplicidad y compatibilidad nativa con Vue 3.
- **Composition API** para mayor organización y reutilización de lógica.
- **Tailwind CSS** permite escalar estilos sin conflictos.
- **Toastification** mejora la experiencia UX con mensajes claros.
- **Arquitectura modular** separa vistas, componentes, estado y rutas.

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/sebasam/rick-morty-explorer.git
cd rick-morty-explorer
npm install
npm run dev

## Este proyecto usa Vitest + @vue/test-utils para pruebas unitarias.

```bash
npm run test
