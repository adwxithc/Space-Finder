import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpaces } from './PostSpaces';

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {


    try {
            switch (event.httpMethod) {
        case 'POST':
            return await postSpaces(event, ddbClient);
        case 'GET':
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'GET method is not implemented yet'
                })
            }

        default:
            return {
                statusCode: 405,
                body: JSON.stringify({
                    message: 'Method Not Allowed'
                })
            };
    }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                error: (error as Error).message
            })
        }
    }


}

export { handler }
