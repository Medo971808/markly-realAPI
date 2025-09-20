import { useAuth } from "./useAuth";
import { useAuthStore } from "../store/auth";

export const useProfile = () => {
  const { refresh } = useAuth();
  const user = useState<any | null>("profile", () => null);
  const loading = useState<boolean>("profileLoading", () => false);
  const error = useState<string | null>("profileError", () => null);
  const authStore = useAuthStore();

  const getUser = async () => {
    loading.value = true;
    error.value = null;
    try {
      user.value = await $fetch(
        "https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile",
        { headers: { Authorization: `Bearer ${authStore.accessToken}` } }
      );
    } catch (err: any) {
      if (err?.status === 401) {
        const newAccessToken = await refresh();
        if (newAccessToken) {
          user.value = await $fetch(
            "https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/profile",
            { headers: { Authorization: `Bearer ${newAccessToken}` } }
          );
        } else {
          error.value = "Unauthorized - session expired";
        }
      } else {
        error.value = err?.data?.message || "Failed to load profile";
      }
    } finally {
      loading.value = false;
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/update-image",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        }
      );
      user.value = await res.json();
      return user.value;
    } catch (err) {
      console.error(err);
    }
  };
  const editProfile = async (
    fName: string | null,
    lName: string | null,
    uName: string | null
  ) => {
    const body = { firstName: fName, lastName: lName, username: uName };
    try {
      await fetch(
        "https://ecoommerce-api-bxbhfsgua6bmbxh6.canadacentral-01.azurewebsites.net/api/Account/edit",
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err: any) {
      error.value = err?.message ?? "Unknown error";
      console.error("Edit profile failed:", err);
    }
  };

  return { user, loading, error, getUser, uploadImage, editProfile };
};
