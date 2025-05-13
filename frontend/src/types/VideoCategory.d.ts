import { Category } from "./Category";

export type VideoCategory = {
    id: string;
    videoId: string;
    categoryId: string;
    category: Category;
};