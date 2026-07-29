import js from '@eslint/js'
import boundaries from 'eslint-plugin-boundaries'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * Слои FSD, от верхнего к нижнему. Индекс в массиве задаёт направление импортов:
 * слой может зависеть только от слоёв правее себя.
 */
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']

const layerElements = LAYERS.map((layer) => ({
  type: layer,
  pattern: `src/${layer}/*`,
  capture: ['slice'],
}))

const layerRules = LAYERS.map((layer, index) => ({
  from: layer,
  allow: LAYERS.slice(index + 1),
}))

export default tseslint.config(
  {ignores: ['dist', 'node_modules', 'build']},

  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        ...layerElements,
        // Псевдо-API из задания. Обращаться к нему разрешено только через shared/api.
        {type: 'services', pattern: 'src/services/*', mode: 'file'},
      ],
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      ...reactRefresh.configs.vite.rules,

      // Импорт только вниз по слоям. Слайсы одного слоя друг друга не видят.
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            ...layerRules,
            {from: 'shared', allow: ['shared', 'services']},
          ],
        },
      ],

      // Внутренности слайса наружу не торчат — только публичный API.
      'boundaries/entry-point': [
        'error',
        {
          default: 'disallow',
          rules: [
            {target: ['app', 'shared'], allow: '**'},
            {target: ['pages', 'widgets', 'features', 'entities'], allow: 'index.{ts,tsx}'},
            {target: ['services'], allow: '*.js'},
          ],
        },
      ],
    },
  },

  // Конфигурационные файлы живут вне слоёв и вне браузерного окружения.
  {
    files: ['*.{ts,mjs}'],
    languageOptions: {globals: globals.node},
  },
)
