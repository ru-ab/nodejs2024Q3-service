import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all albums records',
    isArray: true,
    type: Album,
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if album record exists',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if album ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: "Returns if album record does't exist",
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns if album has been created',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumService.create(createAlbumDto);

    if (!album) {
      throw new BadRequestException('Artist with artistId not found');
    }

    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns if album has been updated',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if album ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if album does not exist',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);
    if (!updatedAlbum) {
      throw new NotFoundException('Album not found');
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiParam({
    name: 'id',
    description: 'Album ID',
    required: true,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Returns if album has been removed',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if album ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if album does not exist',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedAlbum = await this.albumService.remove(id);
    if (!removedAlbum) {
      throw new NotFoundException('Album not found');
    }
  }
}
