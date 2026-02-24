import { 
  Controller, 
  Get, 
  Param, 
  Query, 
  NotFoundException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { PublicFeedQueryDto } from '../dto/public.dto';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get public feed of published blogs' })
  @ApiResponse({ status: 200, description: 'Feed retrieved successfully' })
  async getFeed(@Query() query: PublicFeedQueryDto) {
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

  @Get('blogs/:slug')
  @ApiOperation({ summary: 'Get a published blog by slug' })
  @ApiResponse({ status: 200, description: 'Blog retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  async getBlogBySlug(@Param('slug') slug: string) {
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
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }
}
