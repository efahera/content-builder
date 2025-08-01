import React, { useState } from 'react'; 
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

    // useEffect(() => {                                                   // added
    // localStorage.setItem('content_blocks', JSON.stringify(blocks));     // added
    // }, [blocks]);                                                       // added

    const addBlock = (block) => {
        const safeBlock = {
            ...block,
            id: Date.now() + Math.random(),
            props: block.props || { content: '' },
        };
        setBlocks(prev => [...prev, safeBlock]);
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
        setBlocks(prevBlocks => {
            const updated = prevBlocks.filter(block => block.id !== id);
            console.log("After deletion, blocks:", updated);
            saveToBackend(updated);
            return updated;
        });
    }; 


    const [isPreview, setIsPreview] = useState(false);

    const saveToBackend = async () => {
        try {
            const content = JSON.stringify(blocks);
            const res = await fetch("http://localhost:8000/api/pages/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Landing Page",
                    content: content
                })
            });
            if (!res.ok) throw new Error("Failed to save to backend");
            console.log("After saving, blocks:", blocks);

            alert("Page saved!");
        } catch (err) {
            console.error("Error saving:", err);
        }
    };

    const loadFromBackend = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/pages/", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to save to backend: ${errorText}`);
            }
            
            console.log("Retrieved blocks:", blocks);

            const data = await res.json();
            const page = data.find(p => p.title === "Landing Page");

            if (!page) {
                alert("Page not found!");
                return;
            }

            const parsedContent = JSON.parse(page.content);
            setBlocks(parsedContent);
            alert("Page retrieved from backend!");
        } catch (err) {
            console.error("Error retrieving page:", err);
        }
    };

    return ( 
        <DndProvider backend={HTML5Backend}> 
        <BuilderContainer> 
            <Toolbox /> 

            <Canvas 
            blocks={blocks}  
            addBlock={addBlock}
            moveBlock={moveBlock} 
            updateBlock={updateBlock} 
            removeBlock={removeBlock} 
            isPreview={isPreview}
            /> 

            <PreviewContainer>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <button 
                        style={{ marginTop: '10px' }} 
                        onClick={() => setIsPreview(prev => !prev)}>
                            {isPreview  ? 'Exit Preview' : 'Preview'} 
                    </button> 

                    <button 
                        style={{ marginTop: '10px' }} 
                        onClick={saveToBackend}>
                            Save to Backend
                    </button>

                    <button 
                        style={{ marginTop: '10px' }} 
                        onClick={loadFromBackend}>
                            Load from Backend
                    </button>
                </div>
            </PreviewContainer>


        </BuilderContainer> 

        </DndProvider> 
        
    ); 
}; 
 
export default ContentBuilder;