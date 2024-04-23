const { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');

let options = {};
if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

const client = new DynamoDBClient(options);

const dynamoDB = {
    async get(id, TableName) {
        const params = {
            TableName,
            Key: {
                id: { S: id },
            },
        };

        const command = new GetItemCommand(params);
        const data = await client.send(command);

        if (!data || !data.Item) {
            throw Error(`Se produjo un error al obtener los datos del ID de ${id} desde ${TableName}`);
        }
        console.log(data);

        return data.Item;
    },

    async scan(TableName) {
        const params = {
            TableName,
        };

        const command = new ScanCommand(params);
        const data = await client.send(command);

        if (!data || !data.Items) {
            throw Error(`Se produjo un error al obtener los datos desde ${TableName}`);
        }
        console.log(data);

        return data.Items;
    },

    async put(data, TableName) {
        if (!data.id) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };

        const command = new PutItemCommand(params);
        const res = await client.send(command);

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`);
        }

        return data;
    },

    async update(params) {
        const command = new UpdateItemCommand(params);
        const data = await client.send(command);

        if (!data) {
            throw Error(`There was an error fetching the data`);
        }
        console.log(data);

        return data;
    },

    async delete(id, TableName) {
        const params = {
            TableName,
            Key: {
                id: { S: id },
            },
        };

        const command = new DeleteItemCommand(params);
        const data = await client.send(command);

        if (!data) {
            throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`);
        }
        console.log(data);

        return data;
    },
};

module.exports = dynamoDB;
