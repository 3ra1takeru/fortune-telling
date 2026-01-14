import { Hono } from 'hono'

type Bindings = {
    GOOGLE_PROJECT_ID: string
    GOOGLE_SERVICE_ACCOUNT_JSON: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
    return c.text('Ultimate Fortune Telling API')
})

app.get('/health', (c) => {
    return c.json({ status: 'ok', datetime: new Date().toISOString() })
})

// Main Fortune Endpoint
app.post('/api/fortune', async (c) => {
    console.log("Fortune Request Received");
    try {
        const body = await c.req.json()

        // Note: Direct BigQuery client lib doesn't work in Edge runtime.
        // In production, use BigQuery REST API via fetch or a separate Node.js service.
        // For this deployment, we return the structure directly.

        return c.json({
            message: "Fortune calculation ready (Mock)",
            input: body,
            result: {
                mainText: "Your fortune is being calculated...",
                compatibility: { score: 90 }
            }
        })

    } catch (e) {
        return c.json({ error: "Invalid request" }, 400)
    }
})

export default app
