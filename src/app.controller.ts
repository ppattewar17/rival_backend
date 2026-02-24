import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Health check' })
    getHealth() {
        return {
            status: 'ok',
            message: 'Blog Platform API is running',
            timestamp: new Date().toISOString(),
        };
    }

    @Get('health')
    @ApiOperation({ summary: 'Health check endpoint' })
    healthCheck() {
        return {
            status: 'ok',
            message: 'Blog Platform API is healthy',
            timestamp: new Date().toISOString(),
        };
    }
}
