const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

exports.lambdaHandler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const id = uuidv4();

    const params = {
        TableName: 'blogTable',
        Item: {
            id: id,
            title: requestBody.title,
            content: requestBody.content,
            author: requestBody.author,
            createdAt: new Date().toISOString(),
        }
    };

    try {
        await dynamodb.put(params).promise();
        return { statusCode: 201, body: JSON.stringify({ message: 'Blog post created', id }) };
    } catch (err) {
        console.error('Unable to create blog post:', err);
        return { statusCode: 500, body: JSON.stringify({ message: 'Unable to create blog post' }) };
    }
};

