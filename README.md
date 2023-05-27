This a stand alone user authentication API made using express. [Includes Json web tokens and password hashing]

This app contains two options. 
1. Demo registration
2. secure registration (verification through otp). [To use this feature, you need a gmail account with two step verification completed.]

Follow along the steps to use this app

git clone https://github.com/giftyaustin/Secure-UserAuthentication-API-Expressjs.git

1. Open the cloned folder with code editor or powershell
2. Run the command { node server } on the terminal.
3. Open any API client tool and use the urls listed below

# FOR DEMO REGISTRATION


* To signup [method = POST]
1. http://localhost:5000/demo/signup 
 The request body must contain these fields {email , fullName, password}. [case sensitive]
 
 * Responses:
 * upon successfull registration (json) {
                message: "Account created successfully",
                accessToken:accessToken,
                refreshToken: refreshToken,
                authorized: true
                }
 * upon registering with existing email (json) {
                message:"user exists",
                authorized:false
                }

 * To login [method = POST]
 2. http://localhost:5000/demo/login
    The request body must contain these fields {email , password}. [case sensitive]

    * Responses:
    * upon successfull login (json) {
                accessToken:accessToken,
                refreshToken: refreshToken,
                authorized: true
                }
    * upon failure (json) {message: "user not found"}

* To view dashboard [method = GET]
3. http://localhost:5000/demouser 
    The request body must contain these fields {accessToken, refreshToken}

    * Upon successfull access token verification (json) {message: "you can view your dashboard", authorized:true}
    * Upon access token expiry (json) {message: "new access token issued, session continues",accessToken:newAccessToken,authorized:true }
    * Upon refresh token expiry (json) {message: "session expired. Login into your account", authorized:false}
    * Other cases (json) {JWT ERROR} [contains name and message fields]

will update secure login soon.

1. To signup [POST] http://localhost:5000/auth/signup .  request body fields {email, username, password}
    * upon success {message:"Email sent successfully"}
2. To verify otp [POST] http://localhost:5000/auth/signup/:otp . url params = OTP
    * upon success ({
              message: "Account created successfully",
              created: true,
            })



3. to login [POST]  http://localhost:5000/auth/login . req.body = {email, password}
4. to view dashboard [GET]  http://localhost:5000/user . req.body = {accessToken, refreshToken}
