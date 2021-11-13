import React from 'react'
import {Route} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import LeftVert from "../components/LeftVert";

function Draft() {
  // let { username }: any = useParams()
    const options = [{
        icon: <DeleteIcon/>,
        title: 'delete',
    }]

    const buttons = [{
        icon: <AddIcon/>,
        title: 'delicate',
    }]


    return (
        <Route path="/Drafts">
           <LeftVert
                buttons={buttons}
                options={options}
                button={<MoreVertIcon/>}
           > content x </LeftVert>
        </Route>
    );
}

export default Draft
