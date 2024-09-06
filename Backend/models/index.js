const mongoose = require("mongoose");
const uri = "mongodb+srv://sahilmegascale01:Asdf1234@cluster0.unu1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };