const nodemailer = require("nodemailer");
const { google } = require("googleapis");


const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


const auth =  {
  type: "OAuth2",
  user: "hdaicenter@gmail.com",
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
  accessToken: ""
}

const sendVerificationMail = async (to, veriLink) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();   
    auth.accessToken = accessToken.token;

    console.log(auth);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth,
    });

    const mailOptions = {
      from: "UDEMY CLONE <hdaicenter@gmail.com>",
      to: to,
    //   to: "hodaitribm224@gmail.com",
      subject: "Email verification step",
      text: "Email verification step",
      html: `<h1>Use this link to verify your account <a>${veriLink}</a></h1>`,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};



module.exports = {
  sendVerificationMail,  
};
