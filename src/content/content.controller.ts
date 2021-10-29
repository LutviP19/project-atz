import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {ApiOkResponse, ApiTags,} from '@nestjs/swagger';
import {CreateContentDto} from './dto/create-content.dto';
import {Content} from './content.entity';
import {ContentService} from './content.service';
import {ContentEntity} from './entities/content.entity';

@Controller('content')
@ApiTags('content')
export class ContentController {

    constructor(private readonly contentService: ContentService) {
    }


    @Post()
    create(@Body() createContentDto: CreateContentDto): Promise<Content> {
        return this.contentService.create(createContentDto);
    }

    @Get()
    @ApiOkResponse({description: 'Contents retrieved successfully.'})
    findAll(): Promise<ContentEntity> {
        return this.contentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Content> {
        return this.contentService.findOne(id);
    }

    @Get('/tpl/:itemCode')
    async findOneTpl(@Param('itemCode') itemCode: string): Promise<any> {
        const gcontent = await this.contentService.findOneTpl(itemCode);
        //console.log(gcontent);
        const content = gcontent[0];
        //console.log(content);

        if (content && content.isActive && content.urlPhoto != null && !content.urlAction != null) {
            return {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: content.contentName,
                                image_url: content.urlPhoto,
                                subtitle: content.itemCode + " - " + content.label,
                                default_action: {
                                    type: "web_url",
                                    url: content.urlAction,
                                    webview_height_ratio: "tall"
                                },
                                buttons: [
                                    {
                                        type: "web_url",
                                        url: content.urlAction,
                                        title: "View Item"
                                    },
                                    {
                                        type: "web_url",
                                        title: "WA Chatting",
                                        url: "https://api.whatsapp.com/send?phone=6285282793816&text=Item%20Code:" + encodeURI(content.itemCode)
                                    }
                                ]
                            }
                        ]
                    }
                }
            };
        }

        return {};
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() createContentDto: CreateContentDto): Promise<Content> {
        return this.contentService.update(id, createContentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.contentService.remove(id);
    }

}
