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
    // tid: "2057Q3G3",
    // token:
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6IjkwZTRjMDQ4Y2Q0YjMzYTcyMjM3NjA5OTQ0NTdlY2Q3MzBiN2IxNzE0MWY0YTRjZWFlOTBmNTRiOGYxZDFjYjcxOTJiMzUwZmVlNDkzMzhlIiwiaWF0IjoxNjk3NTUwMzg2LjkzMzk3LCJuYmYiOjE2OTc1NTAzODYuOTMzOTczLCJleHAiOjE3MjkxNzI3ODYuOTMyNTIsInN1YiI6IjQ4NzEwIiwic2NvcGVzIjpbIioiXX0.UzQDyPnwrzS4iYtWkXENyUJ6NpLMyPu-tbTCZMSI06Nk0aw0MUlbQtGjWfMpxvC4gW5F9UGZtyMsEcyfBZFO8KnkvoNADv1UakeIR9M_RfvWpIy_7EPh-_L2wr1y3MP5igSpgzeH-g_Ye1OyMHgGM5wGv-XJ6AWKNgcMsW-V57e__4OOhdORdUdm7_U7hMgDQOCThEUzPe1N__Ac4ymSsVNy4pbd-475fH3LmZ5rPSmDsVq4Fs0iH-nuy6a4TPM9CeJgMOWFSX26F4Uza1Xast_1EiIINOx-3wixOEGrM2PDBosnZKwaUmIrrQdAzra1RIUkSaUQdMPLFNrojkk4HemVw4F5kUZJgQv8k49REuXRQ14bT7rNF6tRDO7l4PmoAGoK3OpUjgJQycJCDV2vQ9Ffn7MmsRuCaiCKTHHta_UIa6PPVYudWW4awVsSNS_duYhsCDV_Uzoo-dywpCIIIZkfVtzLtxy_Jerjr6Bub3owoSHgXug7-35CaBHdtQvJlKbvliQIlsXpLOZkCyA_4_idqpecBGqEF4NO_-XH0tWh0TGceB8z77yfjrnc81CksEXpAuM3iefQ5Q7KMS-TtI29gqJsuMgf2kdjCsgA_QcIyKSh_og3OS1dk9S7cyyvoUR-zIfPTtkZaDuHCvec3witIpQ-t_91Kfe2uSaNf-M",
    // longitude: "237464.13",
    // latitude: "10928.26",

    tid: "",
    token: "",
    longitude: "",
    latitude: "",
  }),
  actions: {
    setDataState(state: State) {
      // console.log(state);

      let newState = { ...state, token: atob(state.token) };

      console.log(newState);

      this.$state = newState;
    },
  },
});
