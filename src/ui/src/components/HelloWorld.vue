<template>
  <div class="h-screen flex justify-center items-center flex-col mx-auto">
    <h1 class="text-3xl font-bold">{{ msg }}</h1>
    <br />
    <div
      class="w-full h-full md:h-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-2 py-4"
    >
      <!-- Razorpay Logo -->
      <div class="select-none mb-6 w-full">
        <div class="relative pb-64">
          <img
            :src="require('@/assets/razorpay.png')"
            alt="Razorpay"
            class="absolute w-full h-full rounded-lg aspect-auto object-contain"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            @click="onClick"
            class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        </div>
      </div>

      <!-- Instamojo Logo -->
      <div class="select-none mb-6 w-full">
        <div class="relative pb-64">
          <img
            :src="require('@/assets/instamojo.png')"
            alt="Instamojo"
            class="absolute w-full h-full rounded-lg aspect-auto object-contain"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        </div>
      </div>

      <!-- Cashfree Logo -->
      <div class="select-none mb-6 w-full">
        <div class="relative pb-64">
          <img
            :src="require('@/assets/cashfree.png')"
            alt="Cashfree"
            class="absolute w-full h-full rounded-lg aspect-auto object-contain"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect
          </button>
        </div>
      </div>

      <!-- Add more logos as needed -->
    </div>
  </div>
</template>

<script>
// import { ref, computed } from 'vue';
// import { useRouter } from 'vue-router';
// import cryptoRandomString from 'crypto-random-string';
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // setup(){
  //   const router = useRouter();

  //   const xano_user_webhook = process.env.VUE_APP_XANO_USER_WEBHOOK;
  //   const rzp_client_id = process.env.VUE_APP_RZP_CLIENT_ID;
  //   const redirect_uri = process.env.VUE_APP_RZP_REDIRECT_URI;
  //   const mkp_client_id = process.env.VUE_APP_MKP_CLIENT_ID;
  //   const mkp_client_secret = process.env.VUE_APP_MKP_CLIENT_SECRET;
  //   const state = cryptoRandomString({ length: 17 });

  //   const onClick = async () => {
  //     if (mkp_client_id && mkp_client_secret) {

  //       if ( xano_user_webhook) {

  //         const response = await fetch(xano_user_webhook, {
  //           method: 'POST',
  //           headers: {
  //             'Access-Control-Allow-Origin': '*',
  //             'Access-Control-Allow-Headers': 'Content-Type',
  //             'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ code: code.value, ...tokenData, state }),
  //         });
  //         // const data = await response.json();

  //         // toast.value?.show({
  //         //   severity: 'success',
  //         //   summary: 'Success',
  //         //   life: 3000,
  //         // });
  //         router.push(
  //           `https://auth.razorpay.com/authorize?response_type=code&client_id=${rzp_client_id}&redirect_uri=${redirect_uri}&scope=read_only&state=${state}`
  //         );
  //       } else {
  //         // toast.value?.show({
  //         //   severity: 'error',
  //         //   summary: 'Error',
  //         //   detail: 'Invalid Authorization Code',
  //         //   life: 3000,
  //         // });
  //       }
  //     } else {
  //       // toast.value?.show({
  //       //   severity: 'error',
  //       //   summary: 'Error',
  //       //   detail: 'No Authorization Code Found',
  //       //   life: 3000,
  //       // });
  //     }
  //   };

  //   return { onClick };
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> -->
