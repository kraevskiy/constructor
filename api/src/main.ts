import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const port = process.env.PORT || 3002;

function infoRunning() {
	console.log(`Started API service on port: ${port}`);
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api');

	const config = new DocumentBuilder()
		.setTitle('Arter Swagger')
		.setDescription('Swagger for Arter Constructor')
		.setVersion('1.0')
		.addTag('Arter')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(port, infoRunning);
}

bootstrap();
