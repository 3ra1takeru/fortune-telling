import { Hono } from 'hono'
import { BigQuery } from '@google-cloud/bigquery'

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
    try {
        const body = await c.req.json()
        // Expected: name, birthDate, birthTime, birthPlace, bloodType...

        const { birthDate, birthTime } = body

        // 1. Calculate Zodiac Sign (This logic should be robust)
        // For now, simple mock or query BQ if we pushed logic there.

        // 2. Query BigQuery for interpretations
        // This requires setting up the BQ client
        let bqClient;
        try {
            if (c.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
                const credentials = JSON.parse(c.env.GOOGLE_SERVICE_ACCOUNT_JSON);
                bqClient = new BigQuery({
                    projectId: c.env.GOOGLE_PROJECT_ID,
                    credentials
                });

                // Example Query
                // const query = `SELECT * FROM \`fortune_telling_db.master_zodiac_signs\` LIMIT 1`;
                // const [rows] = await bqClient.query(query);
                // return c.json({ result: rows });
            }
        } catch (e) {
            console.error("BigQuery Init Error", e);
            return c.json({ error: "Database configuration error" }, 500);
        }

        return c.json({
            message: "Fortune calculation not fully implemented yet",
            input: body
        })

    } catch (e) {
        return c.json({ error: "Invalid request" }, 400)
    }
})

export default app
