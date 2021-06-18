const sgMail= require('@sendgrid/mail')
const sendgridAPIKEY='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'

sgMail.setApiKey(sendgridAPIKEY)

const sendWelcomeEmail=(email,name) =>{
    sgMail.send({
        to:email,
        from:'joshi.adinath.18et1057@gmail.com',
        subject:'Welcome to app!',
        text:`Welcome to the app, ${name}.Let me know how you get along with the app`
    })

}

const sendCancelEmail=(email,name) =>{
    sgMail.send({
        to:email,
        from:'joshi.adinath.18et1057@gmail.com',
        subject:'GOODBYE!',
        text:`GOODBYE ${name}.Let us what we did wrong`
    })

}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail

}