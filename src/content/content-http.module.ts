import { Module } from '@nestjs/common';
import { ContentModule } from './content.module';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';

@Module({
    imports: [ContentModule],
    providers: [ContentService],
    controllers: [ContentController]
})
export class UserHttpModule {}
