import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from '../dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBlogDto: CreateBlogDto) {
    const { title, content, summary, isPublished } = createBlogDto;
    
    // Generate unique slug
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

  async findAll(userId: string, page = 1, limit = 10) {
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
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string, userId?: string) {
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
      throw new NotFoundException('Blog not found');
    }

    // Check if user is the owner
    if (userId && blog.userId !== userId) {
      throw new ForbiddenException('You can only access your own blogs');
    }

    return blog;
  }

  async update(id: string, userId: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.userId !== userId) {
      throw new ForbiddenException('You can only edit your own blogs');
    }

    const { title, content, summary, isPublished } = updateBlogDto;

    // Generate new slug if title is being updated
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

  async remove(id: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.userId !== userId) {
      throw new ForbiddenException('You can only delete your own blogs');
    }

    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
