import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { uploadPdfToS3 } from '../../../services/s3/s3.service';
import { s3Client } from '../../../services/s3/s3.client';
import { getPresignedURL } from '../../../services/s3/s3.service';
import { S3Params } from '../../../interfaces/s3-params.interface';

jest.mock('@aws-sdk/client-s3', () => ({
    PutObjectCommand: jest.fn(),
    GetObjectCommand: jest.fn()
}));
jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest.fn()
}));
jest.mock('../../../services/s3/s3.client', () => ({
    s3Client: {
        send: jest.fn()
    }
}));

describe('uploadPdfToS3', () => {
    const s3Params = {
        bucket: 'test-bucket',
        key: 'test-key',
        body: Buffer.from('PDF content')
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should upload PDF to S3 successfully', async () => {
        s3Client.send = jest.fn().mockResolvedValueOnce({});

        await uploadPdfToS3(s3Params);

        expect(PutObjectCommand).toHaveBeenCalledWith({
            Bucket: s3Params.bucket,
            Key: s3Params.key,
            Body: s3Params.body,
            ContentType: 'application/pdf'
        });
        expect(s3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
        expect(s3Client.send).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if uploading to S3 fails', async () => {
        const errorMessage = 'Upload failed';
        s3Client.send = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

        await expect(uploadPdfToS3(s3Params)).rejects.toThrow(`Error uploading file to S3: Error: ${errorMessage}`);

        expect(PutObjectCommand).toHaveBeenCalledWith({
            Bucket: s3Params.bucket,
            Key: s3Params.key,
            Body: s3Params.body,
            ContentType: 'application/pdf'
        });
        expect(s3Client.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
        expect(s3Client.send).toHaveBeenCalledTimes(1);
    });
});

describe('getPresignedURL', () => {
    const s3Params: S3Params = {
        bucket: 'test-bucket',
        key: 'test-key',
        responseContentDisposition: 'attachment; filename="test-file.pdf"'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a presigned URL when successful', async () => {
        const mockPresignedUrl = 'https://s3.amazonaws.com/test-bucket/test-key?presigned=true';
        (getSignedUrl as jest.Mock).mockResolvedValue(mockPresignedUrl);

        const result = await getPresignedURL(s3Params);

        expect(result).toBe(mockPresignedUrl);
        expect(getSignedUrl).toHaveBeenCalledWith(expect.anything(), expect.any(GetObjectCommand), { expiresIn: 604800 });
    });

    it('should throw an error if getSignedUrl fails', async () => {
        const mockError = new Error('S3 Error');
        (getSignedUrl as jest.Mock).mockRejectedValue(mockError);

        await expect(getPresignedURL(s3Params)).rejects.toThrow('S3 Error');

        expect(getSignedUrl).toHaveBeenCalledWith(expect.anything(), expect.any(GetObjectCommand), { expiresIn: 604800 });
    });
});
