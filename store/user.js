import Cookie from "js-cookie";
import { auth } from "~/services/firebase";

export const state = () => {
  return {
    user: null,
    isNewUserRegistered: false,
  };
};

export const mutations = {
  setUser(state, account) {
    state.user = account;
  },
  removeUser(state) {
    state.user = null;
  },
  newUserRegistered(state, hideMessage=false) {
    if (hideMessage) {
      state.isNewUserRegistered = false;
    } else {
      state.isNewUserRegistered = true;
    }
  }
};

export const actions = {
  async signIn({ commit }, account) {
    try {
      await auth.signInWithEmailAndPassword(account.email, account.password);

      const token = await auth.currentUser.getIdToken();
      const { email, uid } = auth.currentUser;
      Cookie.set("access_token", token);

      commit("setUser", { email, uid });
    } catch (error) {
      throw error;
    }
  },

  async signUp ({commit}, account) {
    try {
      await auth.createUserWithEmailAndPassword(account.email, account.password);
      commit("newUserRegistered");
    } catch (error) {
      throw error;
    }
  },

  newUserRegistered ({commit}, hideMessage) {
    commit("newUserRegistered", hideMessage);
  },

  async logout({ commit }) {
    await auth.signOut();
    await Cookie.remove("access_token");
    commit("removeUser");
  }
};

export const getters = {
  user: state => state.user,
  isNewUserRegistered: state => state.isNewUserRegistered
};
