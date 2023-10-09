// import axiosinstance from "../libs/axiosinstance";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      fetchToken: () =>
        (window.token =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxNyIsImp0aSI6IjRkYjM0NjExNDgwZjhjN2VkNmQwNGQ0ZTc5M2ViZjU5ODk2ZGY5MTMwM2MxODQyZjg4Y2JmOGE1Y2UzMDA1ZjFjOWM1Zjc3YWIyNGRhYzNkIiwiaWF0IjoxNjk2ODM2MjI5LjAyODE2OCwibmJmIjoxNjk2ODM2MjI5LjAyODE3MSwiZXhwIjoxNzI4NDU4NjI5LjAyNjc0OSwic3ViIjoiNzE0MjEiLCJzY29wZXMiOlsiKiJdfQ.psf7IAo-vp0USh-KezgOnGyauUkzlsX3rdUkYWl9-nKm2_9HYFf0LwXdVHg3r5o4M1kyoZSy1NZbZemZEcTN7BerPCOr-PvXw6qEGd88pwbKhhUeePygdCb8Oy6CuSm4Ymby63bFPdnk1wr8Pt_7FSHdOKwZqdccl5jGcsHx1upIeTH7dw_MuE_1xEsJ5hmokT3zSAvDeXkDs7FovvkBbRkwziG-SBvpy5QNh2HG2ed1dbzNX3_TMgUN5xN-vVCFgHc07Vl2SKAoGcBKM-EsuM151PFZwsrqyaCAJd0zmOvy2LOVGYxUWqq5vgoe4Tn1t2kLR1eIyTjx9pf6VltNEfYcaNFWaJBfQccqtOS9808DZW7B5FW_7OS443FRiQ-EOkUak59iOY_Z8ZIEqJVj0iRJnlJROvn0vCgYhgCvPDxhrUdDDkB1nb9G3ecVsUE7D-fbI7n_P7t7YV1UvC06nLmdx2DUqTtTYZv1Z1PH9kC1g3kVFN3F8Tw7y2qpIQOB-TugOW8ig2wx7EgqRtrHmUtx05Fkva-UZ2KTxQYotBjLZ4mJklCvBqlFiZ6qeyyjx2LbMHCMfOvxHzJEhGr5VUkE5kzHrqxSOgCDLah91GLXg0L3vg9Zi64B0F9CeY7N1S_wvklgB4zkbeSqJWTveUwWXPPtX5HuVBRUW4DbfHI"),
      getToken: () => {
        return window.token;
      },
    },
  };
});
