"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(blogId, userId, createCommentDto) {
        const blog = await this.prisma.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        return this.prisma.comment.create({
            data: {
                blogId,
                userId,
                content: createCommentDto.content,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
    }
    async getBlogComments(blogId, query) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const blog = await this.prisma.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        const [comments, total] = await Promise.all([
            this.prisma.comment.findMany({
                where: { blogId },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.comment.count({ where: { blogId } }),
        ]);
        return {
            comments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async deleteComment(commentId, userId) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        if (comment.userId !== userId) {
            throw new Error('You can only delete your own comments');
        }
        return this.prisma.comment.delete({
            where: { id: commentId },
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map