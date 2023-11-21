import { defineStore } from "pinia";

interface State {
  tid: string;
  token: string;
  longitude: string;
  latitude: string;
}
export const useMyAuthDataStore = defineStore({
  id: "myAuthDataStore",
  state: (): State => ({
    tid: "",
    token: "",
    longitude: "",
    latitude: "",
  }),
  actions: {
    setDataState(state: State) {
      console.log(state);

      let newState = {
        ...state,
      };

      this.$state = newState;
    },
  },
});
