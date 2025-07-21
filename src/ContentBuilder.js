import React, { useState, useEffect } from 'react'; 
import { DndProvider } from 'react-dnd'; 
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import Toolbox from './Toolbox'; 
import Canvas from './Canvas'; 
import styled from 'styled-components'; 
 
const BuilderContainer = styled.div` 
    display: flex; 
    height: 100%; 
`; 

const PreviewContainer = styled.div` 
    padding: 20px; 
    background: #f9f9f9; 
    min-height: 100%; 
`; 

const ContentBuilder = () => { 
   
    const [blocks, setBlocks] = useState(() => {                        // added
    const saved = localStorage.getItem('content_blocks');               // added
    return saved ? JSON.parse(saved) : [];                              // added
    });                                                                 // added

    useEffect(() => {                                                   // added
    localStorage.setItem('content_blocks', JSON.stringify(blocks));     // added
    }, [blocks]);                                                       // added

    const addBlock = (block) => { 
        setBlocks(prev => [...prev, { ...block, id: Date.now() + Math.random() }]); // added '+ Math.random()'
    }; 
   
    const moveBlock = (dragIndex, hoverIndex) => { 
        const draggedBlock = blocks[dragIndex]; 
        const updatedBlocks = [...blocks]; 
        updatedBlocks.splice(dragIndex, 1); 
        updatedBlocks.splice(hoverIndex, 0, draggedBlock); 
        setBlocks(updatedBlocks); 
    }; 
   
    const updateBlock = (id, newData) => { 
        setBlocks(blocks.map(block =>  
        block.id === id ? { ...block, ...newData } : block 
        )); 
    }; 
    
    const removeBlock = (id) => { 
        setBlocks(blocks.filter(block => block.id !== id)); 
    }; 

    const [isPreview, setIsPreview] = useState(false); // added

    return ( 
        <DndProvider backend={HTML5Backend}> 
        <BuilderContainer> 
            <Toolbox /> 

            <Canvas 
            blocks={blocks}  
            addBlock={addBlock}  // added
            moveBlock={moveBlock} 
            updateBlock={updateBlock} 
            removeBlock={removeBlock} 
            isPreview={isPreview}   // added
            /> 

            <PreviewContainer>
            <button style={{height: '20px', width: 'auto' }} onClick={() => setIsPreview(prev => !prev)}> {/* // added */}
            {isPreview  ? 'Exit Preview' : 'Preview'} {/* // added */}
            </button> {/* // added */}
            </PreviewContainer>


        </BuilderContainer> 

        </DndProvider> 
        
    ); 
}; 
 
export default ContentBuilder;