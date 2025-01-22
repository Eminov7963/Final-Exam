const express = require("express")

const {getAllData, getDataById, deleteData, postData} = require("../controllers/productControllers")

const router = express.Router()

router.get("/",getAllData)
router.get("/:id",getDataById)
router.delete("/:id",deleteData)
router.post("/",postData)

module.exports = router