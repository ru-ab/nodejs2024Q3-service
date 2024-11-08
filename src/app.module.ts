import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
