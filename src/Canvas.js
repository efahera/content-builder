import React from 'react'; 
import { useDrop } from 'react-dnd'; 
import ContentBlock from './ContentBlock'; 
import styled from 'styled-components'; 

const CanvasContainer = styled.div` 
    flex: 1; 
    padding: 20px; 
    background: #f9f9f9; 
    min-height: 100%; 
`;

const CanvasDropArea = styled.div` 
    min-height: 200px; 
    border: ${props => props.isOver ? '2px dashed #1890ff' : '2px dashed #ddd'}; 
    background: ${props => props.isOver ? 'rgba(24, 144, 255, 0.1)' : 'white'}; 
    padding: 50px; 
`;

const Canvas = ({ blocks, addBlock, moveBlock, updateBlock, removeBlock, isPreview  }) => { // added addBlock, isPreview 
    const [{ isOver }, drop] = useDrop(() => ({ 
        accept: ['toolbox-item', 'canvas-block'], 
        
        drop: (item, monitor) => {                          // added
        const didDrop = monitor.didDrop();                  // added
        if (didDrop) return;                                // added

        if (monitor.getItemType() === 'toolbox-item') {     // added
            addBlock({ type: item.element.type });          // added
        }                                                   // added
        },                                                  // added

        collect: (monitor) => ({ 
        isOver: !!monitor.isOver(), 
        }), 
  })); 

    const handleBlockChange = (blockId, newProps) => {
        updateBlock(blockId, newProps);
    };

    return ( 
        <CanvasContainer> 
        <h2>Content Canvas</h2> 
        <CanvasDropArea ref={drop} $isOver={isOver}> 
            {blocks.length === 0 && !isOver && ( 
            <p>Drag elements here to build your content</p> 
            )} 
            
            {blocks.map((block, index) => ( 
            <ContentBlock 
                key={block.id}
                type={block.type}
                props={block.props}
                block={block}
                onChange={(newProps) => handleBlockChange(block.id, newProps)}
                updateBlock={updateBlock}
                removeBlock={removeBlock}
            /> 
            ))} 
        </CanvasDropArea> 
        </CanvasContainer> 
    );

}; 
 
export default Canvas;