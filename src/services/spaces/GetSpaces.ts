import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";




export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {


    if (event.queryStringParameters) {
        if ('id' in event.queryStringParameters) {

            const spaceId = event.queryStringParameters['id'] || '';
            console.log('Fetching space with id: ', spaceId);
            const getItemResponse = await ddbClient.send(new GetItemCommand({
                TableName: process.env.TABLE_NAME,
                Key: {
                    'id': { S: spaceId }
                }
            }))

            if (getItemResponse?.Item) {
                console.log('GetItem Result: ', getItemResponse.Item);
                return {
                    statusCode: 200,
                    body: JSON.stringify(getItemResponse.Item)
                }
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'Space not found'
                    })
                }

            }

        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Bad Request: Missing id query parameter'
                })
            }
        }
    }

    const result = await ddbClient.send(new ScanCommand({
        TableName: process.env.TABLE_NAME,

    }));
    console.log('Result: ', result);
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    }
}