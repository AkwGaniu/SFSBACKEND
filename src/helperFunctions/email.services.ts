import fs from 'fs'
"use strict";
const nodemailer = require('nodemailer')
import handlebars from 'handlebars'
import config  from '../config.keys';
import path from 'path'

const smtpTransport = nodemailer.createTransport({
  host: config.HOST,
  port: 465,
  secure: true,
  auth: {
    user: config.USERNAME,
    pass: config.PASS
  }
})

// verify connection configuration
smtpTransport.verify(function(error, success) {
  if (error) { 
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const sendAccountValidationMail = (data) => {
  const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../../template/mail/accountActivation.hbs"), "utf8")
  const template = handlebars.compile(emailTemplateSource)
  const htmlToSend = template({
    username: data.name,
    validationUrl: data.activationUrl
  })
  const mailOptions = {
    from: config.USERNAME,
    to: data.email,
    subject: "Account Activation",
    html: htmlToSend
  }
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error)
      return false
    } else {
      return true
    }
  })
}

export const sendPasswordResetMail = (data) => {
  const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../../template/mail/passwordReset.hbs"), "utf8")
  const template = handlebars.compile(emailTemplateSource)
  const end = data.email.indexOf('@')
  const username = data.email.substring(0, end)
  const htmlToSend = template({
    email: data.email,
    username: username,
    resetLink: data.resetUrl
  })
  const mailOptions = {
    from: process.env.USER,
    to: data.email,
    subject: "Password Reset",
    html: htmlToSend
  }
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error)
      return false
    } else {
      return true
    }
  })
}

// module.exports = { sendAccountValidationMail, sendPasswordResetMail }