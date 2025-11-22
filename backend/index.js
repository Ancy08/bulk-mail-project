const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
// middleware
app.use(express.json())
// mongo db connection
mongoose.connect("mongodb://127.0.0.1:27017/passkey").then(function () { console.log("connected to db") }).catch(function () { console.log("Cannot connect to db") })
const emailSchema = new mongoose.Schema({
    subject: String,
    body: String,
    recipients: [String],
    status: String,
    date: { type: Date, default: Date.now }
})
const Email = mongoose.model("Email", emailSchema, "emails")


// node mailer
const nodemailer = require("nodemailer");
// history
app.get("/history",async function(req,res){
try{
    const data = await Email.find().sort({date:-1})
    res.json(data)
}
catch(error){
    res.status(500).json({error:"Could not fetch data"})
}
})

app.post("/sendmail", async function (req, res) {

    var msg = req.body.msg
    var sub = req.body.sub
    var emailList = req.body.emailList

    // to access collection from db
    const credential = mongoose.model("credential", {}, "bulkmail")
    const data = await credential.find()
    if(!data.length){
        console.log("No credentials found")
        return res.send(false)
    }

    

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass
        },
    });
    try {
        for (var i = 0; i < emailList.length; i++) {
            await transporter.sendMail({
                from:  data[0].toJSON().user,
                to: emailList[i],
                subject: sub,
                text: msg
            },
            )
            console.log("email sent to:" + emailList[i])
        }
        await Email.create({
    subject: sub,
    body: msg,
    recipients: emailList,
    status: "sent"
})

        res.send(true)
    }
    catch (error) {
        console.log(error)
        res.send(false)
    }
}
)

app.listen(3000, function () {
    console.log("Server Started")
})
