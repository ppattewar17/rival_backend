import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  UseGuards,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto, BlogQueryDto } from '../dto/blog.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@ApiTags('blogs')
@Controller('blogs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog' })
  @ApiResponse({ status: 201, description: 'Blog successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBlogDto: CreateBlogDto, @CurrentUser('id') userId: string) {
    return this.blogsService.create(userId, createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user blogs' })
  @ApiResponse({ status: 200, description: 'Blogs retrieved successfully' })
  findAll(
    @CurrentUser('id') userId: string,
    @Query() query: BlogQueryDto,
  ) {
    return this.blogsService.findAll(userId, query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific blog' })
  @ApiResponse({ status: 200, description: 'Blog retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.blogsService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog' })
  @ApiResponse({ status: 200, description: 'Blog updated successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.blogsService.update(id, userId, updateBlogDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a blog' })
  @ApiResponse({ status: 204, description: 'Blog deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.blogsService.remove(id, userId);
  }
}
