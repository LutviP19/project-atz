import {Injectable,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Content} from './content.entity';
import {ContentEntity} from './entities/content.entity';
import {CreateContentDto} from './dto/create-content.dto';
import {UpdateContentDto} from './dto/update-content.dto';
import Utils from './utils'


@Injectable()
export class ContentService {
    private static contentsRepository: Repository<Content>;

    constructor(
        @InjectRepository(Content)
        readonly contentRepository: Repository<Content>,
    ) {
    }

    //private readonly logger = new Logger(ContentService.name);

    create(createContentDto: CreateContentDto): Promise<Content> {
        const content = new Content();

        content.itemCode = Utils.formatItemCode(createContentDto.itemCode);
        content.roleItem = createContentDto.roleItem;
        content.contentName = createContentDto.contentName;
        content.label = createContentDto.label;
        content.urlPhoto = createContentDto.urlPhoto;
        content.urlAction = createContentDto.urlAction;
        content.description = createContentDto.description;
        content.isActive = createContentDto.isActive;

        return this.contentRepository.save(content);
    }

    async findAll(): Promise<ContentEntity> {
        //this.logger.log('Returning all content');

        const data = await this.contentRepository.find();

        const content = new ContentEntity();
        content.total = data.length;
        content.totalNotFiltered = data.length;
        content.rows = data;

        return content
    }

    async findOneTpl(itemCode: string): Promise<any> {
         console.log(itemCode);
        // format itemCode
        const formatedItemCode = Utils.formatItemCode(itemCode);
         console.log(formatedItemCode);

        return this.contentRepository.find({where: {itemCode: formatedItemCode}, take: 1});
    }

    findOne(id: string): Promise<Content> {
        return this.contentRepository.findOne(id);
    }

    async update(id: string, updateContentDto: UpdateContentDto) {
        const content = await this.findOne(id);

        content.itemCode = Utils.formatItemCode(updateContentDto.itemCode);
        content.contentName = updateContentDto.contentName;
        content.label = updateContentDto.label;
        content.urlPhoto = updateContentDto.urlPhoto;
        content.urlAction = updateContentDto.urlAction;
        content.roleItem = updateContentDto.roleItem;
        content.description = updateContentDto.description;
        content.isActive = updateContentDto.isActive;
        await this.contentRepository.save(content);

        return await this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.contentRepository.delete(id);
        return undefined;
    }
}
