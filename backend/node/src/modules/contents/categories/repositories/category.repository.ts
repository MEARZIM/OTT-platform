import { prisma } from "../../../../libs/prisma";

class CategoryRepository {

    // Add a new category
    async addCategories(names: string[]) {
        return await prisma.category.createMany({
            data: names.map(name => ({
                name
            })),
        });
    }


    // Delete a category
    async deleteCategory(id: string) {
        return await prisma.category.delete({
            where: { id }
        });
    }

    // Update a category
    async updateCategory(id: string, name: string) {
        return await prisma.category.update({
            where: { id },
            data: {
                name: name
            }
        });
    }

    // Gett all categories
    async getAllCategories() {
        return await prisma.category.findMany({
            include: { videos: true }
        });
    }

    // Get a single category by id
    async getCategoryById(id: string) {
        return await prisma.category.findUnique({
            where: { id },
            include: { videos: true }
        });
    }

    // Get multiple categories by id
    async getCategoriesByIds(ids: string[]) {
        return await prisma.category.findMany({
            where: { id: { in: ids } },
            include: { videos: true }
        });
    }

    // Get a single category by name
    async getCategoryByName(name: string) {
        return await prisma.category.findUnique({
            where: { name },
            include: { videos: true }
        });
    }
}

export default new CategoryRepository();