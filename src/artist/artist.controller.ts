import {
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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Returns all artists records' })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if artist record exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if artist ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: "Returns if artist record does't exist",
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Post()
  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({
    status: 201,
    description: 'Returns if artist has been created',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if request body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', description: 'Artist ID (UUID)', required: true })
  @ApiResponse({
    status: 200,
    description: 'Returns if artist has been updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if artist ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if artist does not exist',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistService.update(id, updateArtistDto);
    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'Artist ID (UUID)', required: true })
  @ApiResponse({
    status: 204,
    description: 'Returns if artist has been removed',
  })
  @ApiResponse({
    status: 400,
    description: 'Returns if artist ID is not valid UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'Returns if artist does not exist',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedArtist = await this.artistService.remove(id);
    if (!removedArtist) {
      throw new NotFoundException('Artist not found');
    }
  }
}
