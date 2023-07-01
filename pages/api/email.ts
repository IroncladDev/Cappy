// import { NextApiRequest, NextApiResponse } from "next";
// import nc from "next-connect";
// import sgMail from "@sendgrid/mail";

// const app = nc();

// const msg = {
//   to: 'connerow@repl.it', // Change to your recipient
//   from: 'conner@connerow.dev', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// app.get(async (req: NextApiRequest, res: NextApiResponse) => {
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//       res.json("ASDF")
//     })
//     .catch((error) => {
//       console.log(error)
//       res.send(error)
//     })
// });

// export default app;
