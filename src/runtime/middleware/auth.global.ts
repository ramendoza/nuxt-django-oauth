export default defineNuxtRouteMiddleware(() => {
  const { $auth } = useNuxtApp()
  const config = useRuntimeConfig().public.djangoOAuth
  if (!$auth.state.user) return navigateTo(config.loginPath)
})
