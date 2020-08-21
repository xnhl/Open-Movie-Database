
export default {
  mode: 'universal',
	generate: {
		routes: []
	},
	env: {
		kee: process.env.kee
	},
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/dotenv'],
  modules: [
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    sass: ['./assets/*.sass'],
  },
  build: {
    extend (config, ctx) {
    },
    build: {
      postcss: {
        plugins: {
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: {
          autoprefixer: {
            grid: true
          }
        }
      }
		},
		babel: {
			presets({isServer}) {
				return [
					[
						require.resolve('@nuxt/babel-preset-app'),
						{
							buildTarget: isServer ? 'server' : 'client',
							corejs: {
								version: 3
							}
						}
					]
				]
			}
		}
  }
}
