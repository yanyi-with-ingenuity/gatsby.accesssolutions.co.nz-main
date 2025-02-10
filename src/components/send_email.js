const sendEmail = async (query) => 
{
    let postmark = require("postmark")
    const serverToken = process.env.POSTMARK_SERVER_API_KEY
    let client = new postmark.ServerClient(serverToken);
    
    const emailOptions = {
        "From": "noreply@accesssolutions.co.nz",
        "To": "info@accesssolutions.co.nz",
        "Subject": "Mobile App Enquiry",
        "HtmlBody": `
            <h2>Mobile App Enquiry</h2>
            <p><strong>Name:</strong><br/>${query.name}</p>
            <p><strong>Email:</strong><br/>${query.email}</p>
            <p><strong>Phone:</strong><br/>${query.phone}</p>
            <p><strong>Location:</strong><br/>${query.location}</p>
            <p><strong>Enquiry:</strong><br/>${query.message}</p>
            ${query.product ? `<p><strong>Product:</strong><br/>${query.product}</p>` : ``}
        `,
        "TextBody": `
            Mobile App Enquiry
            Name: ${query.name}
            Email: ${query.email}
            Phone: ${query.phone}
            Location: ${query.location}
            Enquiry: ${query.message}
            ${query.product ? `Product: ${query.product}` : ``}
        `,
        "MessageStream": "outbound"
    }

    return client.sendEmail(emailOptions);
}

export { sendEmail };