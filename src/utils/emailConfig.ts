
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initializeEmailJS = () => {
  const USER_ID = 'lcoIppQEnR3Y1wMdM'; // Your EmailJS User ID
  
  try {
    emailjs.init(USER_ID);
    console.log('EmailJS initialized with user ID:', USER_ID);
    return true;
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
    return false;
  }
};

// Helper function to verify if EmailJS can send emails
export const testEmailJSConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing EmailJS connection...');
    // Small test to verify connection
    await emailjs.send(
      'service_edupath',
      'template_chatrequest',
      {
        to_email: 'ananyama09@gmail.com',
        subject: 'EmailJS Connection Test',
        message: 'This is a connection test message.',
      },
      'lcoIppQEnR3Y1wMdM'
    );
    console.log('EmailJS connection test successful');
    return true;
  } catch (error) {
    console.error('EmailJS connection test failed:', error);
    return false;
  }
};

// Helper function to send emails with retry capability
export const sendEmail = async (templateParams: any, retries = 2): Promise<boolean> => {
  let attempts = 0;
  
  const attemptSend = async (): Promise<boolean> => {
    try {
      await emailjs.send(
        'service_edupath',
        'template_chatrequest',
        templateParams,
        'lcoIppQEnR3Y1wMdM'
      );
      console.log('Email sent successfully');
      return true;
    } catch (error) {
      attempts++;
      console.error(`Email sending failed (attempt ${attempts}/${retries + 1}):`, error);
      
      if (attempts <= retries) {
        console.log(`Retrying in ${attempts * 1000}ms...`);
        await new Promise(resolve => setTimeout(resolve, attempts * 1000));
        return attemptSend();
      }
      
      return false;
    }
  };
  
  return attemptSend();
};
