import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

let cachedApp: express.Application;

async function bootstrap() {
    if (cachedApp) {
        return cachedApp;
    }

    const expressApp = express();
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
        { logger: ['error', 'warn', 'log'] }
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

    cachedApp = expressApp;
    return expressApp;
}

export default async (req: Request, res: Response) => {
    const app = await bootstrap();
    app(req, res);
};
