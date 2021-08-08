"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetMail = exports.sendAccountValidationMail = void 0;
const fs_1 = require("fs");
"use strict";
const nodemailer = require('nodemailer');
const handlebars_1 = require("handlebars");
const config_keys_1 = require("../config.keys");
const path_1 = require("path");
const smtpTransport = nodemailer.createTransport({
    host: config_keys_1.default.HOST,
    port: 465,
    secure: true,
    auth: {
        user: config_keys_1.default.USERNAME,
        pass: config_keys_1.default.PASS
    }
});
smtpTransport.verify(function (error, success) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Server is ready to take our messages");
    }
});
const sendAccountValidationMail = (data) => {
    const emailTemplateSource = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../template/mail/accountActivation.hbs"), "utf8");
    const template = handlebars_1.default.compile(emailTemplateSource);
    const htmlToSend = template({
        username: data.name,
        validationUrl: data.activationUrl
    });
    const mailOptions = {
        from: config_keys_1.default.USERNAME,
        to: data.email,
        subject: "Account Activation",
        html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            return false;
        }
        else {
            return true;
        }
    });
};
exports.sendAccountValidationMail = sendAccountValidationMail;
const sendPasswordResetMail = (data) => {
    const emailTemplateSource = fs_1.default.readFileSync(path_1.default.join(__dirname, "../../template/mail/passwordReset.hbs"), "utf8");
    const template = handlebars_1.default.compile(emailTemplateSource);
    const end = data.email.indexOf('@');
    const username = data.email.substring(0, end);
    const htmlToSend = template({
        email: data.email,
        username: username,
        resetLink: data.resetUrl
    });
    const mailOptions = {
        from: process.env.USER,
        to: data.email,
        subject: "Password Reset",
        html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            return false;
        }
        else {
            return true;
        }
    });
};
exports.sendPasswordResetMail = sendPasswordResetMail;
//# sourceMappingURL=email.services.js.map