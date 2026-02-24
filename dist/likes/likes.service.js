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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LikesService = class LikesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async likeBlog(blogId, userId) {
        const blog = await this.prisma.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        try {
            const like = await this.prisma.like.create({
                data: {
                    userId,
                    blogId,
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
            const likeCount = await this.prisma.like.count({
                where: { blogId },
            });
            return {
                like,
                likeCount,
            };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('You have already liked this blog');
            }
            throw error;
        }
    }
    async unlikeBlog(blogId, userId) {
        const blog = await this.prisma.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        const like = await this.prisma.like.findUnique({
            where: {
                userId_blogId: {
                    userId,
                    blogId,
                },
            },
        });
        if (!like) {
            throw new common_1.ConflictException('You have not liked this blog');
        }
        await this.prisma.like.delete({
            where: {
                userId_blogId: {
                    userId,
                    blogId,
                },
            },
        });
        const likeCount = await this.prisma.like.count({
            where: { blogId },
        });
        return {
            message: 'Blog unliked successfully',
            likeCount,
        };
    }
    async getBlogLikes(blogId) {
        const likes = await this.prisma.like.findMany({
            where: { blogId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return {
            likes,
            count: likes.length,
        };
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikesService);
//# sourceMappingURL=likes.service.js.map