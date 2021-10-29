import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import hbs = require('hbs');

import * as session from 'express-session';
import flash = require('connect-flash');
import * as exphbs from 'express-handlebars';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
  );
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  const config = new DocumentBuilder()
      .setTitle('Atz Dashboard API')
      .setDescription('Atz Dashboard API')
      .setVersion('1.0')
      .build();

  app.use(
      session({
        secret: 'atz-code-satu-mome',
        resave: false,
        saveUninitialized: false,
      }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  //await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();