import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponseOptions,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { ConnectionArgsDTO } from '../page/connection-args.dto';
import { Page } from '../page/page.dto';

const apiOkResponseWithPagination: ApiResponseOptions = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(Page) },
      {
        properties: {
          edges: {
            type: 'array',
            items: {
              type: 'object',
              required: ['cursor', 'node'],
              properties: {
                cursor: { type: 'string' },
                node: { type: 'object', $ref: getSchemaPath(ProductEntity) },
              },
            },
          },
        },
      },
    ],
  },
};

@Controller('products')
@ApiTags('products')
@ApiExtraModels(Page)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: ProductEntity,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({
    description:
      'The list of published products has been successfully returned.',
    type: ProductEntity,
    isArray: true,
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/drafts')
  @ApiOkResponse({
    description:
      'The list of products not published has been successfully returned.',
    type: ProductEntity,
    isArray: true,
  })
  findAllDrafts() {
    return this.productsService.findAllDrafts();
  }

  @Get('page')
  @ApiOkResponse(apiOkResponseWithPagination)
  findPage(@Query() connectionArgsDTO: ConnectionArgsDTO) {
    return this.productsService.findPage(connectionArgsDTO);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The product has been successfully returned.',
    type: ProductEntity,
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'A product has been successfully updated.',
    type: ProductEntity,
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'A product has been successfully deleted.',
    type: ProductEntity,
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
