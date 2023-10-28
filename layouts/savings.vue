<template>
  <div
    class="min-h-screen h-full lg:max-h-[40rem] lg:max-w-[50rem] lg:my-12 mx-auto bg-[#F2F2F2]"
  >
    <slot />
  </div>
</template>
<script setup>
import { useMyAuthDataStore } from "../stores/authData.ts";
const route = useRoute();
const dataStore = useMyAuthDataStore();

watchEffect(() => {
  if (route.query.data) {
    console.log(route.query);

    // // console.log(
    // //   JSON.stringify({
    // //     tid: "2057Q3G3",
    // //     token:
    // //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImVjYTNjNjgyMjA2N2RmYzI1MTg5ZmI4MTY0MTUwOTMyNmZjMjcxNzJkZTJhZjBiMjlkNWZhNGIxODcwZjk4MzE4MTViYzdiYjU1YjJjMjMyIiwiaWF0IjoxNjk4NDMxNTc4Ljc1ODQwNCwibmJmIjoxNjk4NDMxNTc4Ljc1ODQwNywiZXhwIjoxNzMwMDUzOTc4Ljc1NzE5MSwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.jpcnyi56TON9_rQpyn65vEdgPtepjYgiClgULc17nN709DugnB-KwzYxHbp6SGamNipDm2msYEzArh2rqdUTzzf1TediWI8GfeKOS-8IXEw_7Ey62uSoP3lpCZfjePuyTWDeAPNHGP1S7CQ8ZGAsq9lPAMO9Hqv6SdsXrIXH0ZqC7oOfvXSULFaI6l5qnPFqsd18W9KmgoGYeMzFvNEnH3XdyxQODrl1y0xoyn1wHq2rB8SbOtH6kBPOT6qDgmO499xXDUdGD8dIzeHmXxpt9mJdtKXZhw283ltGZrJg1NLpdRJ6m2G21H2c9SrKZgKRL2DRJGdmE-WY7Qq3DTcPY47JviqXEHKyKZio88D28xvUzcoyE8St-orK1Lwl_AJbPqwKfr_8a9oGIQUEupAIdiu1YjnVsCjPGfEkyDV6ONmFkwcOaqCwNy4hztAK2ylDT5F4-QDuiHsFoYHqoIyYeJZOIWyI-Oz25ay-ryUExnNYXuBIPHUpeYx60l64dLvELesxPuzQIIiA0taNpLyYNuywYw9JypjaznuxGg03TWcigX0lz6F3E8kgn8OLugSKygSid3VonUPVBlHkawsuwG88V_HhMxGHlBH1oGo5XTtcjMxe2OlnogmHKuEYppw4Sz2FG_o0rOC1CxYM3VWBqbp1zzoKsJSeXHdOG9xLVHA",
    // //     longitude: "237464.13",
    // //     latitude: "10928.26",
    // //   })
    // // );
    // console.log(JSON.parse(route.query.data));

    // data = {
    //   tid: "2057Q3G3",
    //   token:
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImNiNzljNzhkMWZhMWRlM2U3Y2Y5MDZkNWJmYzNkYWU1NDdiMTEyMjRiYWQ0ZGRlNzUwNjM2YmM5M2QwODg4NWFkMjQwZjQ0YTJjYWYzYzc4IiwiaWF0IjoxNjk4NDQ1MTg5LjgxMjY3MiwibmJmIjoxNjk4NDQ1MTg5LjgxMjY3NCwiZXhwIjoxNzMwMDY3NTg5LjgxMTQwOCwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.XR-UloGCuNE419zpsvz9EPjAZ19MmD3Onf3cEd2DhNcTCZAVPRSISugNSYaKXHAMelZkcxDAndcOdNVAnICEgWn8iAgK5LpPXShKEpFK-4jr-Qos2phUCJ1xBiRAGNolb1m8if-pC4pTlQDmasq2wHiQ1x9gZBoVFtGI-gEqT7PQ0lPGTZNy9FyenJlYlnrj4_Xy0S2-wGIrzQrNrpNyXIqeHsTcOJfEYNplwzlOpjZlSwG--dE5d8WwFazZNUC5vOIlrX_pxVCq2CFfucieZkxyf2bFytI27sltFpf6wP4nJHDXUEKpKZms1KBs3xSSHaG1j5yEkpcGNQNzwgzNQVg6BN32Tdy9Q960VPQP1ZQV2Ip2u9V6Kix_8HaRpCLZjnzlHgclBJXw_0Gj9QfkvgUZyVNCw9P8Flrib6gmhsgJc3HtK1fgMiyR_0SX8HpKOyIATU_61jknKBgWjM2z9LeXllnsfYlTkho2WSo5IMb37CczCPu_RWUS8Q5YLq9PWsSqTbDlDPgs3o0Xl54E9GWLuGGHGCn7ltBQb5LNP5NZE7Xd5oACLqt63ATp6a6lbYNB6LA6ztrnpWxauE-ThK2qAXgkXwLV66NsOe2zxMyhIgOeQ7y5wfXKBNm9IlQjoElNq0cC368nxY20TZAhju5FCxlGwtVrxhULKVSAWkc",
    //   longitude: "237464.13",
    //   latitude: "10928.26",
    // };

    dataStore.setDataState(
      JSON.parse(
        // '{ "tid": "2057Q3G3",  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6ImNiNzljNzhkMWZhMWRlM2U3Y2Y5MDZkNWJmYzNkYWU1NDdiMTEyMjRiYWQ0ZGRlNzUwNjM2YmM5M2QwODg4NWFkMjQwZjQ0YTJjYWYzYzc4IiwiaWF0IjoxNjk4NDQ1MTg5LjgxMjY3MiwibmJmIjoxNjk4NDQ1MTg5LjgxMjY3NCwiZXhwIjoxNzMwMDY3NTg5LjgxMTQwOCwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.XR-UloGCuNE419zpsvz9EPjAZ19MmD3Onf3cEd2DhNcTCZAVPRSISugNSYaKXHAMelZkcxDAndcOdNVAnICEgWn8iAgK5LpPXShKEpFK-4jr-Qos2phUCJ1xBiRAGNolb1m8if-pC4pTlQDmasq2wHiQ1x9gZBoVFtGI-gEqT7PQ0lPGTZNy9FyenJlYlnrj4_Xy0S2-wGIrzQrNrpNyXIqeHsTcOJfEYNplwzlOpjZlSwG--dE5d8WwFazZNUC5vOIlrX_pxVCq2CFfucieZkxyf2bFytI27sltFpf6wP4nJHDXUEKpKZms1KBs3xSSHaG1j5yEkpcGNQNzwgzNQVg6BN32Tdy9Q960VPQP1ZQV2Ip2u9V6Kix_8HaRpCLZjnzlHgclBJXw_0Gj9QfkvgUZyVNCw9P8Flrib6gmhsgJc3HtK1fgMiyR_0SX8HpKOyIATU_61jknKBgWjM2z9LeXllnsfYlTkho2WSo5IMb37CczCPu_RWUS8Q5YLq9PWsSqTbDlDPgs3o0Xl54E9GWLuGGHGCn7ltBQb5LNP5NZE7Xd5oACLqt63ATp6a6lbYNB6LA6ztrnpWxauE-ThK2qAXgkXwLV66NsOe2zxMyhIgOeQ7y5wfXKBNm9IlQjoElNq0cC368nxY20TZAhju5FCxlGwtVrxhULKVSAWkc","longitude": "237464.13","latitude": "10928.26"}'
        route.query.data
      )
    );
  }
});
</script>
