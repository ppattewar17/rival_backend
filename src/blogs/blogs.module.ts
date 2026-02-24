import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { PublicController } from './public.controller';
import { BlogsService } from './blogs.service';

@Module({
  controllers: [BlogsController, PublicController],
  providers: [BlogsService],
  exports: [BlogsService],
})
export class BlogsModule {}
