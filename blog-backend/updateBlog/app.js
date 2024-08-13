const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.lambdaHandler = async (event) => {
    const id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body);

    const params = {
        TableName: 'blogTable',
        Key: { id },
        UpdateExpression: 'set title = :title, content = :content',
        ExpressionAttributeValues: {
            ':title': requestBody.title,
            ':content': requestBody.content
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const data = await dynamodb.update(params).promise();
        return { statusCode: 200, body: JSON.stringify({ message: 'Blog post updated', updatedAttributes: data.Attributes }) };
    } catch (err) {
        console.error('Unable to update blog post:', err);
        return { statusCode: 500, body: JSON.stringify({ message: 'Unable to update blog post' }) };
    }
};
