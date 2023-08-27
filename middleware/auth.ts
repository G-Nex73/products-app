export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  if (user.value && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/");
  }
  if (!user.value && to.path !== "/login" && to.path !== "/register") {
    return navigateTo("/login");
  }
});
