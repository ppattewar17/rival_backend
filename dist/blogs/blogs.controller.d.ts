import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto, BlogQueryDto } from '../dto/blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        summary: string | null;
        content: string;
        title: string;
        isPublished: boolean;
        slug: string;
        userId: string;
    }>;
    findAll(userId: string, query: BlogQueryDto): Promise<{
        blogs: ({
            user: {
                email: string;
                id: string;
            };
            _count: {
                comments: number;
                likes: number;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            summary: string | null;
            content: string;
            title: string;
            isPublished: boolean;
            slug: string;
            userId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        summary: string | null;
        content: string;
        title: string;
        isPublished: boolean;
        slug: string;
        userId: string;
    }>;
    update(id: string, updateBlogDto: UpdateBlogDto, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        summary: string | null;
        content: string;
        title: string;
        isPublished: boolean;
        slug: string;
        userId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        summary: string | null;
        content: string;
        title: string;
        isPublished: boolean;
        slug: string;
        userId: string;
    }>;
}
