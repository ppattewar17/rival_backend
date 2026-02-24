import { 
  Controller, 
  Post, 
  Delete, 
  Param, 
  Get,
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('likes')
@Controller('blogs/:blogId/likes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiOperation({ summary: 'Like a blog' })
  @ApiResponse({ status: 201, description: 'Blog liked successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 409, description: 'Already liked' })
  likeBlog(@Param('blogId') blogId: string, @CurrentUser('id') userId: string) {
    return this.likesService.likeBlog(blogId, userId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlike a blog' })
  @ApiResponse({ status: 200, description: 'Blog unliked successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 409, description: 'Not liked yet' })
  unlikeBlog(@Param('blogId') blogId: string, @CurrentUser('id') userId: string) {
    return this.likesService.unlikeBlog(blogId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get blog likes' })
  @ApiResponse({ status: 200, description: 'Likes retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  getBlogLikes(@Param('blogId') blogId: string) {
    return this.likesService.getBlogLikes(blogId);
  }
}
