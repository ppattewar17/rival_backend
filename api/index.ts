import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let app: any;

async function createApp() {
    if (!app) {
        const nestApp = await NestFactory.create(
            AppModule,
            new ExpressAdapter(server),
            { logger: ['error', 'warn', 'log'] }
        );

        nestApp.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );

        nestApp.enableCors({
            origin: process.env.FRONTEND_URL || '*',
            credentials: true,
        });

        const config = new DocumentBuilder()
            .setTitle('Blog Platform API')
            .setDescription('Secure blog platform with authentication and social features')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(nestApp, config);
        SwaggerModule.setup('api', nestApp, document);

        await nestApp.init();
        app = nestApp.getHttpAdapter().getInstance();
    }
    return app;
}

export default async (req: any, res: any) => {
    await createApp();
    server(req, res);
};
