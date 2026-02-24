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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blogs_service_1 = require("./blogs.service");
const blog_dto_1 = require("../dto/blog.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    create(createBlogDto, userId) {
        return this.blogsService.create(userId, createBlogDto);
    }
    findAll(userId, query) {
        return this.blogsService.findAll(userId, query.page, query.limit);
    }
    findOne(id, userId) {
        return this.blogsService.findOne(id, userId);
    }
    update(id, updateBlogDto, userId) {
        return this.blogsService.update(id, userId, updateBlogDto);
    }
    remove(id, userId) {
        return this.blogsService.remove(id, userId);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new blog' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Blog successfully created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.CreateBlogDto, String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user blogs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blogs retrieved successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.BlogQueryDto]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific blog' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a blog' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Blog updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, blog_dto_1.UpdateBlogDto, String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a blog' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Blog deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Blog not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "remove", null);
exports.BlogsController = BlogsController = __decorate([
    (0, swagger_1.ApiTags)('blogs'),
    (0, common_1.Controller)('blogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map