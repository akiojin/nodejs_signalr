import { app, HttpRequest, InvocationContext, HttpResponseInit, input } from "@azure/functions"

const connectInfo = input.generic({
    type: 'signalRConnectionInfo',
    name: 'connectionInfo',
    hubName: "default",
    connectionStringSetting: "AzureSignalRConnectionString",
    userId: "{query.user_id}"
})

async function Negotiate(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>
{
    return {
        status: 200,
        jsonBody: context.extraInputs.get(connectInfo)
    }
};

app.http('Negotiate', {
    methods: ['POST'],
    handler: Negotiate,
    extraInputs: [
        connectInfo
    ]
})
