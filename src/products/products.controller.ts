import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { ConnectionArgsDTO } from '../page/connection-args.dto';
import { Page } from '../page/page.dto';
import { ApiPageResponse } from '../page/api-page-response.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products')
@ApiTags('products')
@ApiExtraModels(Page)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @ApiPageResponse(ProductEntity)
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'A product has been successfully updated.',
    type: ProductEntity,
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'A product has been successfully deleted.',
    type: ProductEntity,
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
