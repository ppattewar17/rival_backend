import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

export default async (req: any, res: any) => {
    if (!global.app) {
        const expressApp = express();
        const app = await NestFactory.create(
            AppModule,
            new ExpressAdapter(expressApp),
            { logger: ['error', 'warn'] }
        );

        // Global validation pipe
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );

        // CORS configuration
        app.enableCors({
            origin: process.env.FRONTEND_URL || '*',
            credentials: true,
        });

        // Swagger documentation
        const config = new DocumentBuilder()
            .setTitle('Blog Platform API')
            .setDescription('Secure blog platform with authentication and social features')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);

        await app.init();
        global.app = expressApp;
    }

    return global.app(req, res);
};
