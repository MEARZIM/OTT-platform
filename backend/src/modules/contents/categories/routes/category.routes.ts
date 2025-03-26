import express from "express";
import categoryController from "../controllers/category.controller";


const categoryRouter = express.Router();

categoryRouter.post("/create-categories", categoryController.addCategories as any); //TODO: Only accessible by Admins
categoryRouter.delete("/category-delete/:id", categoryController.deleteCategory as any); //TODO: Only accessible by Admins
categoryRouter.post("/category-update", categoryController.updateCategory as any); //TODO: Only accessible by Admins

categoryRouter.get("/all-categories", categoryController.getAllCategories as any); //TODO: Only accessible by LogedIn Users
categoryRouter.get("/get-category/id/:id", categoryController.getCategoryById as any); //TODO: Only accessible by LogedIn Users
categoryRouter.post("/get-categories", categoryController.getCategoriesByIds as any); //TODO: Only accessible by LogedIn Users
categoryRouter.get("/get-category/name/:name", categoryController.getCategoryByName as any); //TODO: Only accessible by LogedIn Users


export default categoryRouter;