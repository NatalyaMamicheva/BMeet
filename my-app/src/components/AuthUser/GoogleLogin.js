import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'


const GoogleLoginButton = () => {

    const signIn = useGoogleLogin({
    conSuccess: tokenResponse => {
        console.log(tokenResponse);
        axios
            .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/social/google-oauth2/`, {
                'access_token': tokenResponse.access_token,
            })
            .then(response => {
                console.log(response);
            })
        onError: errorResponse => console.log(errorResponse),
        flow: 'implicit',
    });

    return (
        <button onClick={signIn}>Login with Google</button>
    );
};


const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: 'Bearer <tokenResponse.access_token>' } },
    );

    console.log(userInfo);
  },
  onError: errorResponse => console.log(errorResponse),
});

export default GoogleLoginButton;