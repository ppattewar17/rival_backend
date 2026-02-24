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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const public_dto_1 = require("../dto/public.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let PublicController = class PublicController {
    constructor(blogsService, prisma) {
        this.blogsService = blogsService;
        this.prisma = prisma;
    }
    async getFeed(query) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            this.prisma.blog.findMany({
                where: { isPublished: true },
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
            this.prisma.blog.count({ where: { isPublished: true } }),
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
    async getBlogBySlug(slug) {
        const blog = await this.prisma.blog.findUnique({
            where: { slug, isPublished: true },
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
        return blog;
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Get)('feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public feed of published blogs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feed retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [public_dto_1.PublicFeedQueryDto]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)('blogs/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a published blog by slug' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getBlogBySlug", null);
exports.PublicController = PublicController = __decorate([
    (0, swagger_1.ApiTags)('public'),
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        prisma_service_1.PrismaService])
], PublicController);
//# sourceMappingURL=public.controller.js.map