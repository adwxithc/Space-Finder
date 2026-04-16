import { handler } from "../src/services/spaces/handler";


// process.env.TABLE_NAME = "SpacesTable-06d02accb14d";
// process.env.AWS_REGION = "ap-south-1";


handler({ 
    httpMethod: "POST",
    body: JSON.stringify({
         location: "Thrivandrum"
        })
     } as any, {} as any);