import express from "express";
import controller from "../controllers/series";

const router = express.Router();

router 
    .get('/series', controller.getAll)
    .get('/series/:id', controller.get)
    .post('/series', controller.create)
    .patch('/series/:id', controller.update)
    .delete('/series/:id', controller.remove);


export = router;