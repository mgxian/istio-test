const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios')
const app = new Koa();
const router = new Router();


function getForwardHeaders(request) {
    headers = {}
    incoming_headers = [
        'x-request-id',
        'x-b3-traceid',
        'x-b3-spanid',
        'x-b3-parentspanid',
        'x-b3-sampled',
        'x-b3-flags',
        'x-ot-span-context'
    ]

    for (idx in incoming_headers) {
        ihdr = incoming_headers[idx]
        val = request.headers[ihdr]
        if (val !== undefined && val !== '') {
            headers[ihdr] = val
            console.log("incoming: " + ihdr + ":" + val)
        }
    }
    return headers
}



router.get('/status', async (ctx, next) => {
    ctx.body = 'ok';
})

router.get('/env', async (ctx, next) => {
    forwardHeaders = getForwardHeaders(ctx.request)
    service_node_url = 'http://' + 'service-go' + '/env'
    try {
        // console.log(forwardHeaders)
        const response = await axios.get(service_node_url, {
            headers: forwardHeaders
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    const version = process.versions.node;
    ctx.body = { 'message': 'node' + version + '----->' + response.data.message };
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(80);