import {Editor} from "slate";

const FindMatch = (editor:Editor ,matchFunctoin :Function, getText=true) => {
    const [match]: any = Editor.nodes(editor, {
        at: [],
        match: matchFunctoin,
    });

    var match_text: any
    if (getText){
        try {
        match_text = match[0].children[0].text;
        return match_text
    } catch (e) {
        }

    } else {
        return match;
    }

};

export default FindMatch;