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

const sendVerificationMail = async (to, veriLink, action) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();   
    auth.accessToken = accessToken.token;

    console.log(auth);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth,
    });

    let html;
    let subject;
    let text;

    if (action === "res") {
      html = `<h1>Use this <a href = "${veriLink}">link</a> to verify your action</h1>`;
      subject = "Email verification step";
      text = "Email verification step";
    }
    else if (action === "changemail") {
      html = `<h1>Use this <a href = "${veriLink}">link</a> to change your email</h1>`;
      subject = "Change email verification step";
      text = "Change email verification step";
    }
    const mailOptions = {
      from: "UDEMY CLONE <hdaicenter@gmail.com>",
      to: to,
    //   to: "hodaitribm224@gmail.com",
      subject,
      text,
      html
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
