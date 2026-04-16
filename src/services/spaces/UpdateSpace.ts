import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";




export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    // console.log('UpdateSpace Event: ', event);
    if (event.queryStringParameters && 'id' in event.queryStringParameters && event.body) {
        console.log('Updating space with id: ', event.queryStringParameters['id']);
        const parseBody = JSON.parse(event.body);
        const spaceId = event.queryStringParameters['id'] || '';
        const requestBodyKey = Object.keys(parseBody)[0];
        const requestBodyValue = parseBody[requestBodyKey];

        const updateResult = await ddbClient.send(new UpdateItemCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                'id': { S: spaceId }
            },
            UpdateExpression: 'set #zzzNew = :new',
            ExpressionAttributeValues: {
                ':new': {
                    S: requestBodyValue
                }
            },
            ExpressionAttributeNames: {
                '#zzzNew': requestBodyKey
            },
            ReturnValues: 'UPDATED_NEW'
        }));
        console.log('Update Result: ', updateResult);
        return {
            statusCode: 200,
            body: JSON.stringify(updateResult.Attributes)
        }
    };

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: 'Bad Request: Missing id query parameter or request body'
        })
    }


}