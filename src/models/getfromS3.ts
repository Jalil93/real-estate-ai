import { S3 } from 'aws-sdk';

const s3 = new S3();

const getObjectContent = async (bucketName: string, key: string) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const data = await s3.getObject(params).promise();
        if (data.Body) {
            console.log('Object content:', data.Body.toString('utf-8'));
        }
    } catch (err) {
        console.error('Error getting object:', err);
    }
};

getObjectContent('your-bucket-name', 'your-object-key');