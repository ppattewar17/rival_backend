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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BlogsService = class BlogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createBlogDto) {
        const { title, content, summary, isPublished } = createBlogDto;
        const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        let slug = baseSlug;
        let counter = 1;
        while (await this.prisma.blog.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        return this.prisma.blog.create({
            data: {
                userId,
                title,
                slug,
                content,
                summary,
                isPublished: isPublished || false,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
    }
    async findAll(userId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        try {
            const [blogs, total] = await Promise.all([
                this.prisma.blog.findMany({
                    where: { userId },
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
                        _count: {
                            select: {
                                likes: true,
                                comments: true,
                            },
                        },
                    },
                }),
                this.prisma.blog.count({ where: { userId } }),
            ]);
            return {
                blogs,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw error;
        }
    }
    async findOne(id, userId) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        if (userId && blog.userId !== userId) {
            throw new common_1.ForbiddenException('You can only access your own blogs');
        }
        return blog;
    }
    async update(id, userId, updateBlogDto) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        if (blog.userId !== userId) {
            throw new common_1.ForbiddenException('You can only edit your own blogs');
        }
        const { title, content, summary, isPublished } = updateBlogDto;
        let slug = blog.slug;
        if (title && title !== blog.title) {
            const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            slug = baseSlug;
            let counter = 1;
            while (await this.prisma.blog.findUnique({ where: { slug } })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        }
        return this.prisma.blog.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(slug && { slug }),
                ...(content && { content }),
                ...(summary !== undefined && { summary }),
                ...(isPublished !== undefined && { isPublished }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        if (blog.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own blogs');
        }
        return this.prisma.blog.delete({
            where: { id },
        });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map