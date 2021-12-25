import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Draggable } from 'react-beautiful-dnd';
import TasksUtility from '../../utilities/TasksUtility';

type TagProps = {
    tagContent: string;
    tagId: string;
    priority: number;
    onTagClose: (id: string) => void;
    rootClass?: string;
};

const Tag: React.FC<TagProps> = ({ tagContent, onTagClose, rootClass, tagId, priority }) => {
    return (
        <Draggable key={tagId} index={2} draggableId={tagId}>
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={[rootClass, 'ln-tag', TasksUtility.calculatePriorityClass(priority)].join(' ')}>
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
