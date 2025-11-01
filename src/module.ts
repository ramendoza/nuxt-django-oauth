import { defineNuxtModule, createResolver, addPlugin, addImportsDir } from 'nuxt/kit'
import type { DjangoOAuthOptions } from './runtime/types'

export default defineNuxtModule<DjangoOAuthOptions>({
  meta: { name: '@ramendoza/nuxt-django-oauth', configKey: 'djangoOAuth' },
  defaults: {
    apiBase: '/api',
    clientId: '',
    endpoints: {
      token: '/o/token/',
      refresh: '/o/token/',
      revoke: '/o/revoke_token/',
      user: '/v1/user/session/'
    },
    userType: 'default',
    loginPath: '/login'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.djangoOAuth = options

    addPlugin(resolver.resolve('./runtime/plugins/fetch-auth'))
    addPlugin(resolver.resolve('./runtime/plugins/auth'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  }
})
