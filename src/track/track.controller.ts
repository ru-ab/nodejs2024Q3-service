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
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, description: 'Returns all tracks records' })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track by ID' })
  @ApiParam({ name: 'id', description: 'Track ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if track record exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if track ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: "Returns if track record does't exist",
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Post()
  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({
    status: 201,
    description: 'Returns if track has been created',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.albumId) {
      const album = await this.albumService.findOne(createTrackDto.albumId);
      if (!album) {
        throw new BadRequestException('Album with albumId not found');
      }
    }

    if (createTrackDto.artistId) {
      const artist = await this.artistService.findOne(createTrackDto.artistId);
      if (!artist) {
        throw new BadRequestException('Artist with artistId not found');
      }
    }

    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', description: 'Track ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if track has been updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if track ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if track does not exist',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }

    if (updateTrackDto.albumId) {
      const album = await this.albumService.findOne(updateTrackDto.albumId);
      if (!album) {
        throw new BadRequestException('Album with albumId not found');
      }
    }

    if (updateTrackDto.artistId) {
      const artist = await this.artistService.findOne(updateTrackDto.artistId);
      if (!artist) {
        throw new BadRequestException('Artist with artistId not found');
      }
    }

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', description: 'Track ID (UUID)', required: true })
  @ApiResponse({
    status: 204,
    description: 'Returns if track has been removed',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if track ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if track does not exist',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedTrack = await this.trackService.remove(id);
    if (!removedTrack) {
      throw new NotFoundException('Track not found');
    }
  }
}
