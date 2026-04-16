import { handler } from "../src/services/spaces/handler";


process.env.TABLE_NAME = "SpacesTable-06d02accb14d";
process.env.AWS_REGION = "ap-south-1";


handler({
    httpMethod: "PUT",
    queryStringParameters: {
        id: "9b402e77-0307-4fb9-8b42-a67d50165c9a"
    },
    body: JSON.stringify({
        location: "Thrivandrum2"
    })
} as any, {} as any);