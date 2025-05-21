# Rick & Morty Explorer

## Resumen del proyecto

Rick & Morty Explorer es una aplicación SPA desarrollada con Vue 3 que consume la API pública de Rick & Morty para mostrar información detallada de personajes de la serie. La aplicación está diseñada con un enfoque modular, utilizando la Composition API y Pinia para el manejo eficiente del estado global, con un sistema avanzado para el manejo de estados de carga, errores y notificaciones al usuario.

---

## Tecnologías y herramientas usadas

| Tecnología         | Versión           | Propósito                                       |
|--------------------|-------------------|------------------------------------------------|
| Vue 3              | ^3.5.13           | Framework frontend reactivo y modular           |
| Pinia              | ^3.0.1            | Estado global reactivo, reemplazo de Vuex       |
| Vue Router         | ^4.5.0            | Manejo de rutas SPA                              |
| Tailwind CSS       | ^4.1.7            | Framework CSS para estilos utilitarios rápidos  |
| Vue Toastification | ^2.0.0-rc.5       | Sistema de notificaciones                        |
| Vite               | ^6.3.5            | Bundler y dev server rápido                       |
| Vitest             | ^3.1.4            | Framework de testing unitario e integración     |
| TypeScript         | ~5.8.0            | Tipado estático para mayor robustez              |

---

## Instalación, ejecución y pruebas

Clona el repositorio, instala dependencias, ejecuta la aplicación y corre las pruebas con estos comandos:

```bash
git clone <URL-DE-TU-REPO>
cd rick-and-morty-explorer
npm install
npm run dev           # Levanta el servidor de desarrollo
npm run test          # Ejecuta tests unitarios e integración

