<template>
  <div class="h-screen max-w-full">
    <h1 class="text-2xl font-bold">Workflow Apps</h1>
    <div
    class="w-full h-full md:h-auto grid grid-cols-4 md:grid-cols-4 gap-4 px-2 py-8"
  >

    <AppCard
      v-for="(card, index) in cards"
      :key="index"
      :logo-source="card.logoSource"
      :name="card.name"
      :button-name="card.buttonName"
      :custom-method="card.customMethod"
    />
    </div>

    <div v-if="userData">
      <h2>User Data</h2>
      <p>Name: {{ userData.activeLocation }}</p>
      <p>Email: {{ userData.userId }}</p>
    </div>
  </div>
</template>

<script>
import AppCard from "./AppCard.vue";
export default {
  name: "HelloWorld",
  components: {
    AppCard,
  },
  data() {
    return {
      userData: null,
      cards: [
        {
          logoSource: require("@/assets/razorpay.png"),
          name: "Razorpay",
          buttonName: "CONNECT",
          isdisabled: false,
          customMethod: this.redirectToRazorpay
        },
        {
          logoSource: require("@/assets/instamojo.png"),
          name: "Instamojo",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/cashfree.png"),
          name: "Cashfree",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/zoom.png"),
          name: "Zoom",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/whatsapp.png"),
          name: "Whatsapp Cloud",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/obligr.png"),
          name: "Obligr",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/phonepe_pg.png"),
          name: "Phonepe PG",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
        {
          logoSource: require("@/assets/wati.png"),
          name: "Wati",
          buttonName: "COMMING SOON",
          isdisabled: true,
        },
      ],
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
