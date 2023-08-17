import { app, HttpRequest, InvocationContext, HttpResponseInit } from "@azure/functions"
import * as fs from 'fs';

async function Index(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit>
{
    const fileContent = fs.readFileSync('content/index.html', 'utf8');

    return {
        status: 200,
        headers: {
            'Content-Type': 'text/html'
        },
        body: fileContent
    }
}

app.http('Index', {
    methods: ['GET', 'POST'],
    handler: Index
})
