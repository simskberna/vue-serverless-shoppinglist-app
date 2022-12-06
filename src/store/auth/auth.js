/* eslint-disable prettier/prettier */
import { Auth } from "aws-amplify";
export const auth = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user: (state) => state.user,
  },
  actions: {
    async logout({commit}){
        commit("setUser",null);
        await Auth.signOut();
    },
    async login({commit}, { username, password}){
        try{ 
            await Auth.signIn({username,password});
            const userInfo = await Auth.currentAuthenticatedUser();
            commit("setUser",userInfo)
        }catch(error){
            console.log(error);
        }
    },
    async signUp(_,{username,password,email}){
        try{
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            })
            Promise.resolve("success");
        }catch(error){
            console.log(error);
            Promise.reject("error");
        }
    },
    async confirmSignUp(_,{username,code}){
        try{
            await Auth.confirmSignUp(username,code);
            Promise.resolve("success");
        }catch(error){
            Promise.reject("error");
        }
        
    },
    async authAction({commit}){
    const userInfo = await Auth.currentUserInfo();
    commit('setUser',userInfo);
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
};
