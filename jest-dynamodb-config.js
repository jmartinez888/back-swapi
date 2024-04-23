module.exports = {
    tables: [
        {
            TableName: `${process.env.DYNAMODB_TABLE}`,
            KeySchema: [
                {
                    AttributeName: "id",
                    KeyType: "HASH",
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: "id",
                    AttributeType: "S",
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1,
            }
        }
    ]
};