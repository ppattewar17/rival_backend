import { PrismaService } from '../prisma/prisma.service';
export declare class LikesService {
    private prisma;
    constructor(prisma: PrismaService);
    likeBlog(blogId: string, userId: string): Promise<{
        like: {
            user: {
                email: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            blogId: string;
        };
        likeCount: number;
    }>;
    unlikeBlog(blogId: string, userId: string): Promise<{
        message: string;
        likeCount: number;
    }>;
    getBlogLikes(blogId: string): Promise<{
        likes: ({
            user: {
                email: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            blogId: string;
        })[];
        count: number;
    }>;
}
