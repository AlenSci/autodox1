import React, {useCallback} from 'react'
import {Text} from 'slate'
import {css} from '@emotion/css'

const useSearch = (search: any) => {

    const decorate = useCallback(
        ([node, path, ranges]) => {

            if (search && Text.isText(node)) {
                const {text} = node
                const parts = text.split(search)
                let offset = 0

                parts.forEach((part, i) => {
                    if (i !== 0) {
                        ranges.push({
                            anchor: {path, offset: offset - search.length},
                            focus: {path, offset},
                            highlight: true,
                        })
                    }

                    offset = offset + part.length + search.length
                })
            }
        },
        [search]
    );


    const SearchLeaf = ({attributes, children, leaf}: any) => {
        return (
            <span
                {...attributes}
                {...({'data-cy': 'search-highlighted'})}
                className={css`
        font-weight: ${leaf.bold && 'bold'};
        background-color: ${leaf.highlight && '#ffeeba'};
      `}
            >
      {children}
    </span>
        )
    };

    return [decorate, SearchLeaf];


};



export default useSearch