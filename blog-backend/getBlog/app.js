const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.lambdaHandler = async (event) => {
    const id = event.pathParameters.id;

    const params = {
        TableName: 'blogTable',
        Key: {
            id: id
        }
    };

    try {
        const data = await dynamodb.get(params).promise();
        if (!data.Item) {
            return { statusCode: 404, body: JSON.stringify({ message: 'Blog post not found' }) };
        }

        return { statusCode: 200, body: JSON.stringify(data.Item) };
    } catch (err) {
        console.error('Unable to get blog post:', err);
        return { statusCode: 500, body: JSON.stringify({ message: 'Unable to get blog post' }) };
    }
};
