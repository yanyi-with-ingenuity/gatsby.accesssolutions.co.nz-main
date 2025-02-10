import { sendEmail } from '../../components/send_email';

export default async function handler(req, res) {

    try {
        let success = await sendEmail(req.query);
        console.log('✅ success:', success);
    } catch (error) {
        console.log('❌ error:', error);
    }
    
    return res.status(200).json({
        status: true,
    });
}
