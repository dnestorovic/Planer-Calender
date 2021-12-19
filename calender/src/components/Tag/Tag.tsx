import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';

type TagProps = {
    tagContent: string;
    tagId: string;
    priority: number;
    onTagClose: (id: string) => void;
    rootClass?: string;
};

const Tag: React.FC<TagProps> = ({ tagContent, onTagClose, rootClass, tagId, priority }) => {
    const calculatePriorityClass = () => {
        if (priority < 5) {
            return 'lnm-basic';
        } else if (priority >= 5 && priority < 10) {
            return 'lnm-recommended';
        } else if (priority >= 10 && priority < 15) {
            return 'lnm-important';
        } else {
            return 'lnm-very-important';
        }
    };

    return (
        <Draggable key={tagId} index={2} draggableId={tagId}>
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={[rootClass, 'ln-tag', calculatePriorityClass()].join(' ')}>
                        <span>{tagContent}</span>
                        <button onClick={() => onTagClose(tagId)} className="lnp-close-button">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default Tag;
