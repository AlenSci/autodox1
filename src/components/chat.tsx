import {gql} from "apollo-boost";
import React, {useMemo} from "react";
import SubscriptionHook from "../hooks/subscription_hook";
import DraggableDialog from "../UI/dragabledialog";
import AlignItemsList from "../UI/itemslist";
import DialogActions from "@mui/material/DialogActions";
import {TextField} from "@mui/material";
import MutationHook from "../hooks/mutation_hook";
import SEND, {MESSAGES_SUBSCRIPTIONS} from '../queries/chat'


function Chat() {
    const [activate, is_loading, Mdata] = MutationHook(SEND)
    const [x, data] = SubscriptionHook(MESSAGES_SUBSCRIPTIONS, {id: 0});
    // if (typeof data.chat == 'list'){
    //     localStorage.setItem('messages', JSON.stringify(data))
    // }



    const chats = useMemo(() => {
            if (typeof data == 'string') {
                localStorage.setItem('messages', '[]')
            }
            var chats: any = localStorage.getItem('messages')
            if (typeof data == 'object') {
                chats = JSON.parse(chats);
                chats.push(data.chat)
                localStorage.setItem('messages', JSON.stringify(chats))
            }

            chats = localStorage.getItem('messages')
            chats = JSON.parse(chats);
            return chats
        }, [data],
    );


    const messages = chats.map((item: any) => {

        return {title: item.sender, content: item.message}
    });


    return (
        <div>

            <DraggableDialog button={'open chat'} title={'chat app'} content={<div>
                <AlignItemsList items={messages}/>
                <DialogActions>
                    <TextField
                        onKeyDown={(e: any) => {
                            if (e.keyCode == 13) {
                                activate({
                                    send: e.target.value
                                });
                                e.target.value = ''
                            }
                        }
                        }
                        id="outlined-basic" label="Outlined" variant="outlined"/>
                </DialogActions>
            </div>}/>

        </div>
    );
}
export default Chat;