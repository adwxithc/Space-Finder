import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';
import { updateSpace } from './UpdateSpace';
import { deleteSpace } from './DeleteSpace';
import { JsonError, MissingFieldError } from '../shared/Validator';

const ddbClient = new DynamoDBClient({});

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {


    try {
        switch (event.httpMethod) {
            case 'POST':
                return await postSpaces(event, ddbClient);
            case 'GET':
                return await getSpaces(event, ddbClient);
            case 'PUT':
                return await updateSpace(event, ddbClient);
            case 'DELETE':
                return await deleteSpace(event, ddbClient);

            default:
                return {
                    statusCode: 405,
                    body: JSON.stringify({
                        message: 'Method Not Allowed'
                    })
                };
        }
    } catch (error) {
        if (error instanceof MissingFieldError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        if (error instanceof JsonError) {
            return {
                statusCode: 400,
                body: error.message
            }
        }
        return {
            statusCode: 500,
            body: error instanceof Error ? error.message : 'Internal Server Error'
        }
    }
}



export { handler }
