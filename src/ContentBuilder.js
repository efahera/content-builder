import { useState, useEffect } from 'react'; 
import { DndProvider } from 'react-dnd'; 
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import Toolbox from './Toolbox'; 
import Canvas from './Canvas'; 
import styled from 'styled-components'; 
 
const BuilderContainer = styled.div` 
    display: flex; 
    height: 100%; 
`; 

const SideContainer = styled.div` 
    padding: 20px; 
    background: #f9f9f9; 
    min-height: 100%; 
`; 

// const LOCAL_STORAGE_KEY = `content_blocks_page_${PAGE_ID}`;

const ContentBuilder = () => { 
    const [blocks, setBlocks] = useState([]);

    const addBlock = (block) => {
        setBlocks(prev => [...prev, { ...block, id: Date.now() + Math.random() }]);
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

    // clear page on backend
    const clearPage = async () => {
        setBlocks([]);
        // localStorage.removeItem(LOCAL_STORAGE_KEY);

        try {
        await fetch(`http://localhost:8000/api/pages/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Landing Page',
                content: [],
            }),
        });
        } catch (error) {
            console.error('Failed to clear on backend:', error);
        }
    };

    const saveToBackend = async () => {
        try {
            await fetch(`http://localhost:8000/api/pages/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Landing Page',
                    content: blocks,
                }),
            });
            
            console.log("After saving, blocks:", blocks);
            alert("Page saved!");

        } catch (error) {
            console.error('Failed to sync to backend:', error);
        }
        };

    const loadFromBackend = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/pages/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            const parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
            setBlocks(parsed || []);
            console.log("Retrieved blocks:", parsed);
            alert("Page retrieved!");

        } catch (err) {
            console.error("Error retrieving page:", err);
        }
    };

    const [previewMode, setPreviewMode] = useState(false);

    // retrieve from backend
    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                // retrieve from database
                const res = await fetch(`http://localhost:8000/api/pages/`);
                if (!res.ok) throw new Error('Backend fetch failed');
                const data = await res.json();
                const parsed = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
                setBlocks(parsed || []);
                // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parsed || [])); // sync to localStorage
            } catch (err) {
            }
        };

        fetchBlocks();
    }, []);


    // const loadFromBackend = async () => {
    //     try {
    //         await fetch(`http://localhost:8000/api/pages/`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
            
    //         console.log("Retrieved blocks:", blocks);
    //         alert("Page retrieved!");

    //     } catch (err) {
    //         console.error("Error retrieving page:", err);
    //     }
    // };

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
                clearPage={clearPage}
                previewMode={previewMode}
                /> 

                <SideContainer>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <button 
                            style={{ marginTop: '10px' }} 
                            onClick={() => setPreviewMode(!previewMode)}>
                                {previewMode ? 'Exit Preview' : 'Preview'} 
                        </button> 

                        <button 
                            style={{ marginTop: '10px' }} 
                            onClick={clearPage}>
                                Clear Page
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
                </SideContainer>
            </BuilderContainer> 
        </DndProvider> 
        
    ); 
}; 
 
export default ContentBuilder;