import axios from "axios"

const sendEmail = async (body) => {
  let postmark = require("postmark")
  const serverToken = process.env.POSTMARK_SERVER_API_KEY
  let client = new postmark.ServerClient(serverToken);
  
  //console.log('body:', body);

  // info@accesssolutions.co.nz
  let recipients = 'info@accesssolutions.co.nz';
  let emailOptions = {
    "From": "noreply@accesssolutions.co.nz",
    "To": recipients,
    "ReplyTo": body.email,
    "Subject": "Website: Contact Form Submission",
    "HtmlBody": `
    <p><strong>Name:</strong><br/>
    ${body.full_name ?? ''}</p>
    <p><strong>Email:</strong><br/>
    ${body.email ?? ''}</p>
    <p><strong>Phone:</strong><br/>
    ${body.phone ?? ''}</p>
    <p><strong>Location:</strong><br/>
    ${body.location ?? ''}</p>
    <p><strong>Message:</strong><br/>
    ${body.message ?? ''}</p>
    `,
    "TextBody": `
    Name: 
    ${body.full_name ?? ''}    
    Email: 
    ${body.email ?? ''}
    Phone: 
    ${body.phone ?? ''}
    Location: 
    ${body.location ?? ''}
    Message: 
    ${body.message ?? ''}
    `,
    "MessageStream": "outbound",
  }
  return client.sendEmail(emailOptions);
}

export default async function handler (req, res) {
  //console.log('✅ req.method:', req.method);
  //console.log('✅ req.body:', req.body);
  if (req.method == 'POST') {
    try {
      const verify_recaptcha = await axios(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.recaptcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      if (verify_recaptcha.data.success)
      {
        //console.log('✅ recaptcha verified');
        await sendEmail(req.body);
        return res.status(200).end();
      }
      return res.status(422).json({
        message: "Invalid captcha token, please refresh and try again.",
      });
    } catch (error) {
      return res.status(422).json({ 
        message: "Something went wrong, please refresh and try again." 
      });
    }
  }
  return res.status(404).json({
    message: "The requested endpoint was not found or doesn't support this method."
  });
}
