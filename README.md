This a stand alone user authentication API made using express.

This app contains two options. 
1. Demo registration
2. secure registration (verification through otp). [To use this feature, you need a gmail account with two step verification completed.]

Follow along the steps to use this app

git clone https://github.com/giftyaustin/Secure-UserAuthentication-API-Expressjs.git

1. Open the cloned folder with code editor or powershell
2. Run the command { node server } on the terminal.
3. Open any API client tool and use the urls listed below

FOR DEMO REGISTRATION


To signup [method = post]
1. http://localhost:5000/demo/signup 
 The request body must contain these fields {email , fullName, password}. [case sensitive]
 
 # responses 
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


 
