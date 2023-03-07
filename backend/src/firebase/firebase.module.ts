import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [],
  providers: [FirebaseService],
})
export class FirebaseModule {}
