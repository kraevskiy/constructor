import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Controller example')
		.setDescription('The controller API description')
		.setVersion('1.0')
		.addTag('controller')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	app.setGlobalPrefix('api');
	await app.listen(3000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
