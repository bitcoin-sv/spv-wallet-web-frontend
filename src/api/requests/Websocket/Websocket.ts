import {Centrifuge, MessageContext} from "centrifuge";
import {BaseWebsocketModel, WebsocketTransaction} from '@/api/types/transaction'

export const SetupWebsocket = (url: string) => {
    const centrifuge = new Centrifuge(url, {websocket: WebSocket});
    centrifuge.connect();

    centrifuge.on('message', function (ctx: MessageContext) {
        const res = parseResponse(ctx)

        if (typeof res == "object" && res != undefined){
            switch (res.event) {
                case "create_transaction":
                    // TODO: create notification
                    break;
            }
        }
    });

    const channel = "bux-wallet";
    const sub = centrifuge.newSubscription(channel);
    sub.subscribe();
}

function parseResponse(ctx: MessageContext): WebsocketTransaction | undefined {
    // Try to map the response to the expected type
    //
    // Create transaction response
    const wsTransaction: BaseWebsocketModel<WebsocketTransaction> = ctx
    if (wsTransaction != undefined){
        return wsTransaction.data
    }

    // TODO: change of status or incoming transaction

    return undefined
}