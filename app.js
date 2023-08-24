const express = require("express")
const app = express()
const mongoose = require('mongoose');
const Posts = require("./schema");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/PMS", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
connectToDatabase()

const postingToMongo = async (values) => {
    return await Posts.insertMany(values.map((item) => ({
        id: item.id,
        self: item.self,
        name: item.name,
        type: item.type,

        projectId: item?.location?.projectId,
        displayName: item?.location?.displayName,
        projectName: item?.location?.projectName,
        projectKey: item?.location?.projectKey,
        projectTypeKey: item?.location?.projectTypeKey,
        name: item?.location?.name
    })));
}


app.get('/testing', async (req, res) => {
    try {
        console.log("just checking")
        const auth = `Basic ${Buffer.from(
            "tempoautomation@cloudeq.com:ATATT3xFfGF0eUCcSh7zwteMJylMKuEFEVnn7udof101nTGujk9gFKtVctwGjtMyVdqlpZe4_rXloiwojYDNw2PFTrnjyhyIAm3fJGl-pyY4G4wP6HyCsUQqdeY0yOF4jz0zQUFkVcoVVHzOUJn9ErvP2_1xZC6b0f8yLlLegBbc_HygRbWa0Us=FEF6C8EA"
        ).toString("base64")}`;

        const response = await fetch("https://cloudeq.atlassian.net/rest/agile/1.0/board?startAt=0&maxResults=50", {
            headers: {
                Authorization: auth,
                Accept: 'application/json',
                "Content-Type": 'application/json'
            }
        });
        const data = await response.json();
        console.log("data =======", data.length);
        var dbData = postingToMongo(data.values)
        res.status(200).json({
            status: true,
            msg:"able to send the data",
            dbData
        })

    } catch (error) {
        console.error("Error fetching data:", error);
    }
})


app.get('*', (req, res) => {
    res.send("hi")
})


app.listen(8080, () => {
    console.log("connected the port---8080")
})