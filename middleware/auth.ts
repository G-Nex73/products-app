import { useProfileStore } from "store/profile";

export default defineNuxtRouteMiddleware((to) => {
  const user = useUser();
  const profileStore = useProfileStore();
  if (user.value) {
    if (!profileStore.profile && to.path !== "/me") {
      return navigateTo("/me");
    }
    if (to.path === "/login" || to.path === "/register") {
      return navigateTo("/");
    }
  } else if (to.path !== "/login" && to.path !== "/register") {
    return navigateTo("/login");
  }
});
