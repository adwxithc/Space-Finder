import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Code, Function as LambdaFuncation, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { join } from "node:path";


interface LambdaStackProps extends StackProps {
    spacesTable: ITable

}


export class LambdaStack extends Stack {

    public readonly helloLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: LambdaStackProps) {
        super(scope, id, props);

        const helloLambda = new LambdaFuncation(this, 'HelloFunction', {
            runtime: Runtime.NODEJS_22_X,
            handler: 'hello.main',
            code: Code.fromAsset(join(__dirname, '..', '..', 'services')),
            environment: {
                TABLE_NAME: props?.spacesTable.tableName || ''
            }
        });

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda);

    }
}