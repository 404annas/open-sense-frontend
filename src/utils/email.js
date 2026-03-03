// Email service utility using EmailJS
import emailjs from '@emailjs/browser';

export const sendEmail = async (emailData) => {
  try {
    // Initialize EmailJS with your user ID (replace with your actual EmailJS user ID)
    const serviceID = "service_ok0sa16" || 'your_service_id';
    const templateID = "template_vdh111s" || 'your_template_id';
    const publicKey = "m7ptxRS2OhBsavZvw" || 'your_user_id';

    // Prepare template parameters
    const templateParams = {
      from_email: emailData.email,
      to_email: "info@opensenseproductions.com",
      subject: emailData.topic,
      message: `Contact form submission\nEmail: ${emailData.email}\nTopic: ${emailData.topic}`
    };

    // Send email via EmailJS
    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

    if (response.status === 200) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error(error.text || error.message || 'Failed to send email. Please try again.');
  }
};