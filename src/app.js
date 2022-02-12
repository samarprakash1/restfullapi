const express = require("express")
require("./db/conn")
const Student = require("./models/students")
const app = express()

const port = process.env.POST || 5000
app.use(express.json())

app.post("/students", (req, res) => {
    // console.log("++++",req.body)
    const user = new Student(req.body)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })

    // res.send("hello jh")
})

app.get("/students", async (req, res) => {

    try {
        const studentData = await Student.find()
        res.send(studentData)
    } catch (error) {
        res.send(error)
    }
})


app.get("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id)
        //we can write also const studentData=await Student.findById({_id:_id})
        if (!studentData) {
            return res.status(404).send()
        } else {
            res.send(studentData)

        }
    } catch (error) {
        res.status(500).send(error)
    }
})


//put patch

app.patch("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        // new true show in postman in below sentense
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, { new: true })
        res.send(updateStudents)
    } catch (error) {
        res.status(400).send(error)
    }
})
// delete 
app.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;

        //after using  new true changes show in postman(used in below sentennse below sentense)
        const deleteStudents = await Student.findByIdAndDelete(_id)
        res.send(deleteStudents)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete

app.listen(port, () => {
    console.log("listingng", port)
})


