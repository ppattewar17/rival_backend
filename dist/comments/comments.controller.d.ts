import { CommentsService } from './comments.service';
import { CreateCommentDto, CommentQueryDto } from '../dto/comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(blogId: string, createCommentDto: CreateCommentDto, userId: string): Promise<{
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
