import { BlogsService } from './blogs.service';
import { PublicFeedQueryDto } from '../dto/public.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PublicController {
    private readonly blogsService;
    private readonly prisma;
    constructor(blogsService: BlogsService, prisma: PrismaService);
    getFeed(query: PublicFeedQueryDto): Promise<{
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
    getBlogBySlug(slug: string): Promise<{
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
}
