import { Request, Response } from "express";

import categoryService from "../services/category.service";

class CategoryController {
    async addCategories(req: Request, res: Response) {
        try {
            const { names }: { names: string[] } = req.body;
            const categories = await categoryService.addCategories(names);
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCategoriesByIds(req: Request, res: Response) {
        try {
            const { ids }: { ids: string[] } = req.body;
            if (!ids || ids.length === 0) {
                return res.status(400).json({ error: "Please provide an array of ids." });
                
            }
            const category = await categoryService.getCategoriesByIds(ids);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getCategoryByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const category = await categoryService.getCategoryByName(name);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await categoryService.deleteCategory(id);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id, name }: { id: string, name: string } = req.body;
            const category = await categoryService.updateCategory(id, name);
            return res.status(200).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }


}

export default new CategoryController();