import 'dotenv/config';
import sGmail from '@sendgrid/mail';

const url = process.env.FRONTEND_URL || `https://vubarwanda.herokuapp.com`;
const senderEmail = process.env.EMAIL_SENDER;

export const projectSubmitionUrl = async (email, fullName, telephone, projectName) => {
  const projectSubmition = {
    to: email,
    from: `noreply@vubarwanda.com` || { senderEmail },
    Subject: 'Project Idea Received',
    text: `We have received your project`,
    html: `<div 
    style="background-color:rgb(21, 75, 7);
    background-image: linear-gradient(to bottom, #3f5c3b, rgb(21, 75, 7)); 
        padding: 30px;
        width: 70%; 
        margin-left: 10%;"
    >
    <img src="https://res.cloudinary.com/haapa-store/image/upload/v1586676582/BookCover/logo_rs4pey.png" 
    height="50px" width="auto" alt="logo"
    />
    <div style="background-color: white; border-radius: 10px;">
        <p style="font-size: 18px; padding: 30px;"> 
            Hi <b>${fullName} ,</b><br /> <br />
            
            vubaRwanda have received your project # <b>${projectName}</b> # idea.
            <br /> <br />
            We will be glad to help you to implement that by respecting our key points <br />
            We will contact you on this ${email} or on <b> ${telephone} </b> very soon, inorder to collect the project requirements. <br /> 
            And after we analyse your idea to make it a world class applications (<b>Web, android and IOs</b>).
            <br />
            <br /><br />
            Need help? 
            
            <a
            href=${url}/#contactVuba
            style="color:#0099ff; text-decoration:none"
            target='_blank'
            > 
            Contact us
            </a>
    
            <br /><br /><br />
            Best regards, 
            <br /><br />
            Team Vuba Rwanda
            <br />
            <a
                href=${url}
                style="color:#1093eb; text-decoration:none"
                target='_blank'
            > 
            vubarwanda.com
            </a>
        </p>
    </div>
    </div>`
  };
  sGmail.setApiKey(process.env.SENDGRID_API_KEY);
  await sGmail.send(projectSubmition);
};
