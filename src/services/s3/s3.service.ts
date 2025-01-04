import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3.client';
import { S3Params } from '../../interfaces/s3-params.interface';

export const uploadFileToS3 = async (s3Params: S3Params): Promise<void> => {
    try {
        await s3Client.send(
            new PutObjectCommand({
                Bucket: s3Params.bucket,
                Key: s3Params.key,
                Body: s3Params.body,
                ContentType: 'application/pdf'
            })
        );
        console.info(`File uploaded to ${s3Params.bucket}`);
    } catch (error) {
        throw new Error(`Error uploading file to S3: ${error}`);
    }
};
