import express  from "express";
import { search, getMovie, getTV } from "../controllers/tmdbController.js";

const router = express.Router();

router.get('/search', search);
router.get('/movie/:id', getMovie);
router.get('/tv/:id', getTV);

export default router;