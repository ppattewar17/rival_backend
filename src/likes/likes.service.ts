import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likeBlog(blogId: string, userId: string) {
    // Check if blog exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
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

      // Get updated like count
      const likeCount = await this.prisma.like.count({
        where: { blogId },
      });

      return {
        like,
        likeCount,
      };
    } catch (error) {
      // Handle unique constraint violation
      if (error.code === 'P2002') {
        throw new ConflictException('You have already liked this blog');
      }
      throw error;
    }
  }

  async unlikeBlog(blogId: string, userId: string) {
    // Check if blog exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
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
      throw new ConflictException('You have not liked this blog');
    }

    await this.prisma.like.delete({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
    });

    // Get updated like count
    const likeCount = await this.prisma.like.count({
      where: { blogId },
    });

    return {
      message: 'Blog unliked successfully',
      likeCount,
    };
  }

  async getBlogLikes(blogId: string) {
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
}
