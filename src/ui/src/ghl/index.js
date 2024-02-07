/* The above class is a JavaScript GHL helper class that retrieves user data by sending a request to a server and
decrypting the response using a key. */
export class GHL {
  appId;

  constructor() { }

  async getUserData() {
    const key = await new Promise((resolve) => {
      window.parent.postMessage({ message: "REQUEST_USER_DATA" }, "*");
      window.addEventListener("message", ({ data }) => {
        if (data.message === "REQUEST_USER_DATA_RESPONSE") {
          resolve(data.payload)
        }
      });
    });
    const res = await fetch('/decrypt-sso', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key })
    });
    const data = await res.json()
    console.log(data);
    return data
  }

  async getRazorpayToken(code){
    const clientId = "NVC8JJWQBxQ0Mr";
    const clientSecret = "aRdoKNQyeFMeIagh7Obomn9v";
    const redirect_uri = "https://synamate-apps.onrender.com/success";
    if (code) {
      const tokenRequestOptions = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "authorization_code",
          redirect_uri: redirect_uri,
          code: code,
        }),
      };
      const tokenResponse = await fetch(
        "https://auth.razorpay.com/token",
        tokenRequestOptions
      );
      const tokenData = await tokenResponse.json();
      return tokenData;
    }
  }
}
