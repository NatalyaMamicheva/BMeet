import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios'

const GoogleLoginButton = () => {

  const signIn = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const userInfo = await axios
        .post(`http://${process.env.REACT_APP_BACKEND_HOST}/api/users/social/google/`,
          {
            'access_token': tokenResponse.access_token
          })
      localStorage.setItem('token', userInfo.data.token)
      localStorage.setItem('email', userInfo.data.email)
      localStorage.setItem('username', userInfo.data.username)
    },
  });


  return (
    // <GoogleOAuthProvider clientId="859537304153-2gdvdmq2coqo6bvr5v9s5p7ed56ligi7.apps.googleusercontent.com">
    <div>
      <button className='auth_button_form' onClick={signIn}> <p> Войти с Google </p> </button>
    </div>
    // </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;