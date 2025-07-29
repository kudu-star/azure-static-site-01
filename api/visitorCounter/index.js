"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_tables_1 = require("@azure/data-tables");
const httpTrigger = async function (context) {
    const connectionString = process.env.AzureWebJobsStorage;
    if (!connectionString) {
        throw new Error("AzureWebJobsStorage connection string is not configured");
    }
    const tableClient = data_tables_1.TableClient.fromConnectionString(connectionString, "VisitorCounter");
    try {
        await tableClient.createTable();
        const counterEntity = {
            partitionKey: "counter",
            rowKey: "visits",
            count: 1
        };
        try {
            const entity = await tableClient.getEntity("counter", "visits");
            const updatedEntity = {
                partitionKey: "counter",
                rowKey: "visits",
                ...entity,
                count: entity.count + 1
            };
            await tableClient.updateEntity(updatedEntity, "Replace");
            context.res = {
                body: { count: updatedEntity.count }
            };
        }
        catch {
            await tableClient.createEntity(counterEntity);
            context.res = {
                body: { count: 1 }
            };
        }
    }
    catch (error) {
        context.res = {
            status: 500,
            body: (error instanceof Error ? error.message : String(error))
        };
    }
};
exports.default = httpTrigger;
