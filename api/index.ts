import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TableClient } from "@azure/data-tables"

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
    const connectionString = process.env.AzureWebJobsStorage;
    if (!connectionString) {
        throw new Error("AzureWebJobsStorage connection string is not configured");
    }
    const tableClient = TableClient.fromConnectionString(connectionString, "VisitorCounter");

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
                partitionKey: "counter",  // Explicitly include partitionKey
                rowKey: "visits",         // Explicitly include rowKey
                ...entity,
                count: (entity.count as number) + 1
            };
            await tableClient.updateEntity(updatedEntity, "Replace");
            context.res = {
                body: { count: updatedEntity.count }
            };
        } catch {
            await tableClient.createEntity(counterEntity);
            context.res = {
                body: { count: 1 }
            };
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: (error instanceof Error ? error.message : String(error))
        };
    }
};

export default httpTrigger;