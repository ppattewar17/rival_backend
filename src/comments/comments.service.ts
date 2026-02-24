import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, CommentQueryDto } from '../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(blogId: string, userId: string, createCommentDto: CreateCommentDto) {
    // Check if blog exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
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

  async getBlogComments(blogId: string, query: CommentQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // Check if blog exists
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
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

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('You can only delete your own comments');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
    });
  }
}
