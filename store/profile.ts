import { selectProfileSchema } from "db/schema";
import { defineStore } from "pinia";
import { z } from "zod";

export const useProfileStore = defineStore("profile", () => {
  const profile = ref<z.infer<typeof selectProfileSchema> | null>(null);
  const user = useUser();

  async function useProfile() {
    if (!profile.value && user.value) await fetchProfile();
    return profile.value;
  }

  async function fetchProfile() {
    const { data } = await useFetch("/api/me", {
      method: "get",
      headers: useRequestHeaders(["cookie"]),
    });
    profile.value = data.value;
    if (!data.value) navigateTo("/me");
  }

  async function setProfile({
    name,
    user_name,
  }: {
    name?: string;
    user_name: string;
  }) {
    const { status, error } = await useFetch("/api/me", {
      method: "put",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({ name, user_name }),
    });
    if (status.value === "error" && error.value) {
      throw createError({
        message: "Failed to create profile",
        statusCode: 400,
      });
    }
    await fetchProfile();
  }

  return { profile, useProfile, fetchProfile, setProfile };
});
