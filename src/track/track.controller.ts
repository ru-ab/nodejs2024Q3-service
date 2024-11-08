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
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const removedTrack = await this.trackService.remove(id);
    if (!removedTrack) {
      throw new NotFoundException('Track not found');
    }
  }
}
