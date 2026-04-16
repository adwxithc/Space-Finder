import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "node:crypto";
import { validateAsSpaceEntry } from "../shared/Validator";
import { marshall } from "@aws-sdk/util-dynamodb";



export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {

    const randomId = randomUUID();
    const item = JSON.parse(event.body || '{}');
    item.id = randomId;
    validateAsSpaceEntry(item);


    const result = await ddbClient.send(new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item)
    }));
    console.log('Result: ', result);
    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'Space created successfully with id: ' + randomId,
            id: randomId
        })
    }
}