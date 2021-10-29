import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
//import {User} from "./users/user.entity";
import {Content} from "./content/content.entity";
import {UsersModule} from "./users/users.module";
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'project_atz',
            entities: [
                'entity/*.entity{.ts,.js}',
                //User,
                Content
            ],
            synchronize: true,
        }),
        UsersModule,
        ContentModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
