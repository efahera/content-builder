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

const Canvas = ({ blocks, addBlock, moveBlock, updateBlock, removeBlock, previewMode  }) => { 
    const [{ isOver }, drop] = useDrop(() => ({ 
        accept: ['toolbox-item', 'canvas-block'], 
        
        drop: (item, monitor) => {
            const didDrop = monitor.didDrop();
            if (didDrop) return;

            if (monitor.getItemType() === 'toolbox-item') {
                addBlock({ type: item.element.type });
            }
        },

        collect: (monitor) => ({ 
        isOver: !!monitor.isOver(), 
        }), 
    })); 

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
                    block={block}
                    index={index}
                    moveBlock={moveBlock}
                    updateBlock={updateBlock}
                    removeBlock={removeBlock}
                    previewMode={previewMode}
                />
                ))} 
            </CanvasDropArea> 
        </CanvasContainer> 
    );

}; 
 
export default Canvas;