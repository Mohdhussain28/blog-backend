const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.lambdaHandler = async (event) => {
    const id = event.pathParameters.id;

    const params = {
        TableName: 'blogTable',
        Key: { id }
    };

    try {
        await dynamodb.delete(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Blog post deleted' }) };
    } catch (err) {
        console.error('Unable to delete blog post:', err);
        return { statusCode: 500, body: JSON.stringify({ message: 'Unable to delete blog post' }) };
    }
};
