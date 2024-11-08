import { Module } from '@nestjs/common';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
