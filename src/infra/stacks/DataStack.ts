import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
export class DataStack extends Stack {

    public readonly spacesTable:  ITable;

    constructor(scope: Construct, id: string, props?: StackProps) {

        super(scope, id, props);

        const suffix = getSuffixFromStack(this);

        this.spacesTable = new Table(this, 'SpacesTable', {
            partitionKey:{
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: `SpacesTable-${suffix}`
        })
    }
}