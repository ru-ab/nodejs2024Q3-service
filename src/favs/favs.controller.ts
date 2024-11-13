// import {
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   NotFoundException,
//   Param,
//   ParseUUIDPipe,
//   Post,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
// import { Favs } from './entities/favs.entity';
// import { FavsService } from './favs.service';

// @Controller('favs')
// export class FavsController {
//   constructor(private readonly favsService: FavsService) {}

//   @Get()
//   @ApiOperation({
//     summary: 'Get all favorites',
//     description: 'Gets all favorites artists, albums and tracks',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Returns all favorites records',
//     type: Favs,
//   })
//   findAll() {
//     return this.favsService.findAll();
//   }

//   @Post('track/:id')
//   @ApiOperation({
//     summary: 'Add track to the favorites',
//     description: 'Add track to the favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Track ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Returns if track has been added to the favorites',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if track ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 422,
//     description: 'Returns if track with ID does not exist',
//   })
//   async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
//     const track = await this.favsService.addTrack(id);
//     if (!track) {
//       throw new UnprocessableEntityException(`Track with ${id} doesn't exist`);
//     }
//   }

//   @Delete('track/:id')
//   @HttpCode(204)
//   @ApiOperation({
//     summary: 'Delete track from favorites',
//     description: 'Delete track from favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Track ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 204,
//     description: 'Returns if track has been removed',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if track ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Returns if track is not favorite',
//   })
//   async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
//     const removedTrackId = await this.favsService.removeTrack(id);
//     if (!removedTrackId) {
//       throw new NotFoundException('Track is not favorite');
//     }
//   }

//   @Post('album/:id')
//   @ApiOperation({
//     summary: 'Add album to the favorites',
//     description: 'Add album to the favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Album ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Returns if album has been added to the favorites',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if album ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 422,
//     description: 'Returns if album with ID does not exist',
//   })
//   async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
//     const album = await this.favsService.addAlbum(id);
//     if (!album) {
//       throw new UnprocessableEntityException(`Album with ${id} doesn't exist`);
//     }
//   }

//   @Delete('album/:id')
//   @HttpCode(204)
//   @ApiOperation({
//     summary: 'Delete album from favorites',
//     description: 'Delete album from favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Album ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 204,
//     description: 'Returns if album has been removed',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if album ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Returns if album is not favorite',
//   })
//   async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
//     const removedAlbumId = await this.favsService.removeAlbum(id);
//     if (!removedAlbumId) {
//       throw new NotFoundException('Album is not favorite');
//     }
//   }

//   @Post('artist/:id')
//   @ApiOperation({
//     summary: 'Add artist to the favorites',
//     description: 'Add artist to the favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Artist ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Returns if artist has been added to the favorites',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if artist ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 422,
//     description: 'Returns if artist with ID does not exist',
//   })
//   async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
//     const artist = await this.favsService.addArtist(id);
//     if (!artist) {
//       throw new UnprocessableEntityException(`Artist with ${id} doesn't exist`);
//     }
//   }

//   @Delete('artist/:id')
//   @HttpCode(204)
//   @ApiOperation({
//     summary: 'Delete artist from favorites',
//     description: 'Delete artist from favorites',
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'Artist ID',
//     required: true,
//     type: String,
//     format: 'uuid',
//   })
//   @ApiResponse({
//     status: 204,
//     description: 'Returns if artist has been removed',
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Returns if artist ID is not valid UUID',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Returns if artist is not favorite',
//   })
//   async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
//     const removedArtistId = await this.favsService.removeArtist(id);
//     if (!removedArtistId) {
//       throw new NotFoundException('Artist is not favorite');
//     }
//   }
// }
