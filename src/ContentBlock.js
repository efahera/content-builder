import React, { useState, useEffect } from 'react'; 
import { useDrag, useDrop } from 'react-dnd'; 
import styled from 'styled-components'; 
import ComponentType from './ComponentType';

 
const BlockContainer = styled.div` 
    position: relative; 
    padding: 15px; 
    margin-bottom: 10px; 
    background: white; 
    border: 1px solid #ddd; 
    border-radius: 4px; 
`; 
 
const BlockControls = styled.div` 
    position: absolute; 
    top: 5px; 
    right: 5px; 
    display: flex; 
    gap: 5px; 
`; 
 
const ControlButton = styled.button` 
    background: #f0f0f0; 
    border: none; 
    width: 24px; 
    height: 24px; 
    border-radius: 3px; 
    cursor: pointer; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    
    &:hover { 
        background: #e0e0e0; 
    } 
`; 
 
const ContentBlock = ({ block, index, moveBlock, updateBlock, removeBlock, previewMode }) => {
    const [isEditing, setIsEditing] = useState(false); 
    const [localContent, setLocalContent] = useState(block.content ?? '');

    useEffect(() => {
        setLocalContent(block.content || '');
    }, [block.content]);
    
    const ref = React.useRef(null); 

    const [{ isDragging }, drag] = useDrag({ 
        type: 'canvas-block', 
        item: { index }, 
        collect: (monitor) => ({ 
            isDragging: monitor.isDragging(), 
        }), 
        // type: "block",
        // item: { id: block.id },
        // collect: (monitor) => ({
        // isDragging: monitor.isDragging(),
        // }),

    }); 
   
    const [, drop] = useDrop({ 
        accept: 'canvas-block', 
        hover(item, monitor) { 
            if (!ref.current) return; 
            const dragIndex = item.index; 
            const hoverIndex = index; 
        
            if (dragIndex === hoverIndex) return; 
        
            moveBlock(dragIndex, hoverIndex); 
            item.index = hoverIndex; 
        }, 
    }); 
   
    drag(drop(ref)); 
    
    const handleChange = (newChange) => {
        setLocalContent(newChange);
    };

    const handleSave = () => {
        updateBlock(block.id, {
            ...block,
            content: localContent,
        });
        setIsEditing(false);
    };
   
  return ( 
        <BlockContainer 
            ref={ref} 
            style={{ 
                opacity: isDragging ? 0.5 : 1,
                cursor: previewMode  ? 'default' : 'move',
                border: previewMode  ? 'none' : '1px solid #ddd',
                padding: previewMode  ? '0px' : '15px',
                background: previewMode  ? 'transparent' : 'white',
            }} 
        > 
        {!previewMode  && (
            <BlockControls> 
                { !["divider", "gap"].includes(block.type) && (
                    <ControlButton onClick={() => setIsEditing(!isEditing)}> ✏️ </ControlButton>
                )}
                <ControlButton onClick={() => removeBlock(block.id)}> 🗑️ </ControlButton> 
            </BlockControls> 
        )}

        <ComponentType
            type={block.type}
            content={localContent}
            isEditing={isEditing}
            onChange={handleChange}            
            onSave={handleSave}
            setIsEditing={setIsEditing}
            block={block}
            updateBlock={updateBlock}
        />
        </BlockContainer> 
    ); 
}; 
 
export default ContentBlock; 