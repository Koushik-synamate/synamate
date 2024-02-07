<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 v-if="success" class="text-4xl font-bold mb-4">Success!</h1>
        <p v-if="success" class="text-lg mb-6">
          You are successfully authorized with Razorpay. You may now close this window
        </p>
        <p v-else class="text-lg mb-6">Processing...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SuccessPage",
    data() {
      return {
        success: false
      };
    },
    async mounted() {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      const state = searchParams.get("state");
  
      if (code && state) {
        const tokenRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        };
  
        try {
          const tokenResponse = await fetch("/api/getRazorpayToken", tokenRequestOptions);
          const tokenData = await tokenResponse.json();
          const rzp_user_update_webhook = process.env.NEXT_PUBLIC_XANO_USER_UPDATE_WEBHOOK;
          if (!tokenData.error) {
            const userRazorpayRequestOptions = {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...tokenData,
                state: state,
              }),
            };
  
            const userRazorpayResponse = await fetch(rzp_user_update_webhook, userRazorpayRequestOptions);
            const userData = await userRazorpayResponse.json();
            console.log(userData);
            if (userRazorpayResponse.status === 200) {
              this.success = true;
            } else {
              console.log("hello");
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component scoped styles here */
  </style>
  