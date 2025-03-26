import categoryRepository from "../repositories/category.repository";

class CategoryService {
    async addCategories(names: string[]) {
        for (const name of names) {
            const categoryExists = await categoryRepository.getCategoryByName(name);
            if (categoryExists) throw new Error("Category already exists.");
        }

        const res = await categoryRepository.addCategories(names);

        return res;
    }
    
    async getAllCategories() {
        const categories = await categoryRepository.getAllCategories();
        return categories;
    }

    async getCategoryById(id: string) {
        const category = await categoryRepository.getCategoryById(id);
        if (!category) throw new Error("Category not found.");
        return category;
    }

    async getCategoryByName(name: string) {
        const category = await categoryRepository.getCategoryByName(name);
        if (!category) throw new Error("Category not found.");
        return category;
    }

    async deleteCategory(id: string) {
        const category = await categoryRepository.getCategoryById(id);
        if (!category) throw new Error("Category not found.");

        const res = await categoryRepository.deleteCategory(id);
        return res;
    }

    async updateCategory(id: string, name: string) {
        const category = await categoryRepository.getCategoryById(id);
        if (!category) throw new Error("Category not found.");

        const res = await categoryRepository.updateCategory(id, name);
        return res;
    }

    async getCategoriesByIds(ids: string[]) {
        const categories = await categoryRepository.getCategoriesByIds(ids);
        return categories;
    }
}

export default new CategoryService();