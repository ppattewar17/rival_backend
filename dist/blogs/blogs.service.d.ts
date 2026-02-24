import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';
export declare class BlogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createBlogDto: CreateBlogDto): Promise<{
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
    findAll(userId: string, page?: number, limit?: number): Promise<{
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
    findOne(id: string, userId?: string): Promise<{
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
    update(id: string, userId: string, updateBlogDto: UpdateBlogDto): Promise<{
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
