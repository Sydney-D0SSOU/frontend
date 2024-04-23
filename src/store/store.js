import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    getUser() {
      return this.user;
    },
   
    clearUser() {
      this.user = null;
    },
  },
  persist: true,
});
