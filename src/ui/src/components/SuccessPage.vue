<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 v-if="success" class="text-4xl font-bold mb-4">Success!</h1>
      <p v-if="success" class="text-lg mb-6">
        You are successfully authorized with Razorpay. You may now close this
        window
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
      success: false,
    };
  },
  async mounted() {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    
    console.log(code);
    if (code && state) {
      // const tokenRequestOptions = {
      //   method: "POST",
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Headers": "Content-Type",
      //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     client_id: clientId,
      //     client_secret: clientSecret,
      //     grant_type: "authorization_code",
      //     redirect_uri: redirect_uri,
      //     code: code,
      //   }),
      // };

      try {
        // const tokenResponse = await fetch(
        //   "https://auth.razorpay.com/token",
        //   tokenRequestOptions
        // );
        const tokenData = await window.ghl.getRazorpayToken(code);
        const rzp_user_update_webhook =
          "https://x8ki-letl-twmt.n7.xano.io/api:T7Cv6cHs/users_oauth_razorpay";
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

          const userRazorpayResponse = await fetch(
            rzp_user_update_webhook,
            userRazorpayRequestOptions
          );
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
  },
};
</script>

<style scoped>
/* Add your component scoped styles here */
</style>
