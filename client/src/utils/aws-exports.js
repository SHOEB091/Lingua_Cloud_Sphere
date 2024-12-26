// src/aws-exports.js
const awsmobile = {
  Auth: {
    region: "us-east-1", // Your AWS region
    userPoolId: "us-east-1_0cBBpALSK", // Your User Pool ID
    userPoolWebClientId: "4ag3iovbfrdsrfetcktf64n6nl", // Your Client ID
    oauth: {
      domain: "linguacloudsphere.auth.us-east-1.amazoncognito.com",
      scope: ["email", "profile", "openid"],
      redirectSignIn: "http://localhost:3000/", // Redirect URL after login
      redirectSignOut: "http://localhost:3000/", // Redirect URL after logout
      responseType: "code", // OAuth 2.0 code grant flow
    },
  },
};

export default awsmobile;
