

exports.otpVerification = (otp) =>{
return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StudyPlus OTP Verification Email</title>
</head>

<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

    <div style="height: 100vh; display: flex; flex-wrap:wrap; flex-direction: column; justify-content: center; align-items: center;  box-sizing: border-box;">

        <h1 style="background-color: yellow;  border-radius: 8px;">StudyPlus</h1>

        <h2 style="color: #333; ">OTP Verification Email</h2>

        <p style="color: #555; font-size: 16px;">Thank you for registering on our StudyPlus platform.</p>

        <h1 style="color: #007bff; font-size: 20px; margin: 20px 0;">${otp}</h1>

        <p style="color: #555; font-size: 16px;">The OTP is valid for the next 5 minutes.</p>

        <p style="color: #555; font-size: 16px;">Thank you for choosing StudyPlus!</p>

    </div>

</body>
</html>

`
}