import React from "react";
import FacebookLogin from "react-facebook-login-lite";
import GoogleLogin from "react-google-login-lite";

export default function SocialLogin() {
    return (
        <>
            <div className="my-2">
                <GoogleLogin
                    client_id='1060142626291-b7t0hjccfsflhdordfb1fed2j32igvn8.apps.googleusercontent.com'
                    cookiepolicy='single_host_origin'
                // onSuccess={onSuccess}
                />
            </div>
            <div className="my-2">
                <FacebookLogin
                    appId="333953021722051"
                // onSuccess={onFBSuccess}
                />
            </div>
        </>
    )
}