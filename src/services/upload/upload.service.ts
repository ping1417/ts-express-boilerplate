import { S3Params } from '../../interfaces/s3-params.interface';
import config from '../../scripts/env';
import { uploadFileToS3 } from '../s3/s3.service';

export const upload = async (text: string) => {
    try {
        const body = Buffer.from(text, 'utf-8');
        const bucketName = config['bucketName'];

        const s3Params: S3Params = {
            bucket: `${bucketName}`,
            key: 'stage/test.txt',
            body
        };

        await uploadFileToS3(s3Params);
    } catch (error) {
        console.error(`Failed to upload text to S3: ${error}`);
        throw error;
    }
};
