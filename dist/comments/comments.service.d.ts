import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, CommentQueryDto } from '../dto/comment.dto';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createComment(blogId: string, userId: string, createCommentDto: CreateCommentDto): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        userId: string;
        blogId: string;
    }>;
    getBlogComments(blogId: string, query: CommentQueryDto): Promise<{
        comments: ({
            user: {
                email: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            userId: string;
            blogId: string;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    deleteComment(commentId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        userId: string;
        blogId: string;
    }>;
}
