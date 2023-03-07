import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class FirebaseService {
  constructor(private appConfigService: AppConfigService) {}

  async uploadFile(file: any): Promise<any> {
    const bucketURL = this.appConfigService.getConfig().firebase.storageBucket;

    const bucket = admin.storage().bucket();

    const fileName = file.originalname.split('.');
    const filenameDatetime = Date.now() + ' ' + fileName[0] + '.' + fileName[1];
    const fullName =
      '/uploaded-documents/' + filenameDatetime.replace(' ', '_');
    const fbFile = bucket.file(fullName);

    const stream = fbFile.createWriteStream({
      metadata: {
        contentType: 'file.mimetype',
      },
    });

    stream.on('error', (e: any) => {
      console.log('error');
      console.log(e);

      throw new BadRequestException("file wasn't uploaded", { cause: e });
    });

    stream.on('finish', async () => {
      await fbFile.makePublic();
    });

    stream.end(file.buffer);

    const fileUrl = `https://storage.googleapis.com/${bucketURL}/${fullName}`;
    return fileUrl;
  }
}
