import { 
  Controller, 
  Post, 
  Get, 
  Delete, 
  Param, 
  Body, 
  Query,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto, CommentQueryDto } from '../dto/comment.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('comments')
@Controller('blogs/:blogId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a comment on a blog' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createComment(
    @Param('blogId') blogId: string,
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.commentsService.createComment(blogId, userId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get comments for a blog' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  getBlogComments(@Param('blogId') blogId: string, @Query() query: CommentQueryDto) {
    return this.commentsService.getBlogComments(blogId, query);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  deleteComment(
    @Param('commentId') commentId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.commentsService.deleteComment(commentId, userId);
  }
}
