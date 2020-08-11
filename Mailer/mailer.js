const nodemailer = require("nodemailer");
const config = require("../config/config.json")


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.Mail.Gmail_USER, // generated ethereal user
        pass: config.Mail.Gmail_PASS, // generated ethereal password
    },
});

var mailOptions = {
    from: 'phamquangthien.it@gmail.com',
    to: 'phamquangthien.1@gmail.com',
    subject: 'Node JS Test Mail',
    text: 'This is Test'
}

// Mat Khau : pbwzanxeyonhugbc

module.exports = {
    sendMail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transporter.sendMail({ from, to, subject, html }, (err, info) => {
                if (err)
                    reject(err);
                resolve(info);
            });
        });
    }
}