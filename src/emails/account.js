const sgMail= require('@sendgrid/mail')

sgMail.setApiKey(process.env.sendgridAPIKEY)

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
