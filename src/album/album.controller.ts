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
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'Returns all albums records' })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album by ID' })
  @ApiParam({ name: 'id', description: 'Album ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if album record exists',
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
  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({
    status: 201,
    description: 'Returns if album has been created',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.artistId) {
      const artist = await this.artistService.findOne(createAlbumDto.artistId);
      if (!artist) {
        throw new BadRequestException('Artist with artistId not found');
      }
    }

    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', description: 'Album ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if album has been updated',
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

    if (updateAlbumDto.artistId) {
      const artist = await this.artistService.findOne(updateAlbumDto.artistId);
      if (!artist) {
        throw new BadRequestException('Artist with artistId not found');
      }
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', description: 'Album ID (UUID)', required: true })
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
