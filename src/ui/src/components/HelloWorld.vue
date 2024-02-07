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
            @click="redirectToRazorpay"
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
    </div>
    <div v-if="userData">
      <h2>User Data</h2>
      <p>Name: {{ userData.activeLocation }}</p>
      <p>Email: {{ userData.userId }}</p>
      <!-- Add more data fields as needed -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      userData: null,
    };
  },
  async mounted() {
    const data = await window.ghl.getUserData();
    console.log("user-details", data);
    this.userData = data;
  },
  methods: {
    async redirectToRazorpay() {
      if (this.userData) {
        const rzpClientId = "NVC8JJWQBxQ0Mr";
        const redirectUri = "https://synamate-apps.onrender.com/success";
        const xano_user_update =
          "https://x8ki-letl-twmt.n7.xano.io/api:b4aEH6dM/insert_state";
        const state = Math.random().toString(36).slice(2);
        const location_id = this.userData.activeLocation;

        const response = await fetch(xano_user_update, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location_id, state }),
        });
        const data = await response.json();
        console.log(data);

        const url = `https://auth.razorpay.com/authorize?response_type=code&client_id=${rzpClientId}&redirect_uri=${redirectUri}&scope=read_only&state=${state}`;

        // Redirect the user to the specified URL
        if (data) {
          window.open(url, "_blank");
        }
      }
    },
  },
};
</script>
