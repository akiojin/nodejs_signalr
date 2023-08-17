import { app, HttpRequest, InvocationContext, HttpResponseInit, output } from "@azure/functions"

const signalRMessage = output.generic({
    type: "signalR",
    name: "signalRMessages",
    hubName: "default",
    connectionStringSetting: "AzureSignalRConnectionString"
})

async function SendMessage(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>
{
    const message = await request.json()

    context.extraOutputs.set(signalRMessage, {
        target: "newMessage",
        arguments: [message]
    })

    return { status: 200 }
}

app.http('SendMessage', {
    methods: ['POST'],
    handler: SendMessage,
    extraOutputs: [
        signalRMessage
    ]
})
