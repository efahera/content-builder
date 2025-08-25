import React from 'react'; 
import { useDrag } from 'react-dnd'; 
import styled from 'styled-components'; 
 
const ToolboxItem = styled.div` 
    padding: 10px; 
    margin: 5px; 
    background: #f0f0f0; 
    border: 1px dashed #ccc; 
    cursor: move; 
`; 
 
const ToolboxContainer = styled.div` 
    width: 350px; 
    height: auto;
    background: #e9e9e9; 
    border-right: 1px solid #ddd; 
    // position: fixed;
    // top: 10;
    // left: 0;
`; 
 
const Toolbox = () => { 
    const sections = [
        {
            title: "Format",
            elements: [
                { type: 'title', name: <div style={{ fontWeight: 'bold', fontSize: '18px', textDecoration: 'underline' }}>Title</div> }, 
                { type: 'header', name: <div style={{ fontWeight: 'bold', fontSize: '15px', textDecoration: 'underline' }}>Header</div> }, 
                { type: 'subheader', name: <div style={{ fontWeight: 'bold', fontSize: '12px', textDecoration: 'underline' }}>Subheader</div> }, 
            ]
        },

        {
            title: "Text",
            elements: [
                { type: 'text', name: <div>Text</div> }, 
                { type: 'boldtext', name: <div style={{ fontWeight: 'bold' }}>Bold</div> }, 
                { type: 'italictext', name: <div style={{ fontStyle: 'italic' }}>Cursive</div> }, 
            ]
        },

        {
            title: "Lists",
            elements: [
                { 
                    type: 'numberedlist', 
                    name: 
                    <ol 
                        style={{ paddingRight: '20px' }}>
                            <li>...</li>
                            <li>...</li>
                            <li>...</li>
                    </ol> 
                },

                { 
                    type: 'bulletpoints', 
                    name: 
                    <ul 
                        style={{ paddingRight: '20px' }}>
                            <li>...</li>
                            <li>...</li>
                            <li>...</li>
                    </ul> 
                },
            ]
        },

        {
            title: "Media",
            elements: [
                { type: 'image', name: 'Image' },
                { type: 'video', name: 'Video' },
            ]
        },

        {
            title: "Beautify",
            elements: [
                { type: 'divider', name: 'Divider' },
                { type: 'gap', name: 'Break' },
            ]
        },

        {
            title: "Column",
            elements: [
                { 
                    type: '1column', 
                    name: 
                        <div 
                            style={{
                                width: '60px',
                                height: '50px',
                                border: '1px solid #b8b8b8ff'
                            }}>
                        </div> 
                }, 

                { 
                    type: '2column', 
                    name: 
                        <div style={{ display: 'flex'}}>                        
                            <div 
                                style={{
                                    width: '30px',
                                    height: '50px',
                                    border: '1px solid #b8b8b8ff'
                                }}>
                            </div> 
                            <div 
                                style={{
                                    width: '30px',
                                    height: '50px',
                                    border: '1px solid #b8b8b8ff'
                                }}>
                            </div> 
                        </div>
                },

                { 
                    type: '3column', 
                    name: 
                        <div style={{ display: 'flex'}}>                        
                            <div 
                                style={{
                                    width: '20px',
                                    height: '50px',
                                    border: '1px solid #b8b8b8ff'
                                }}>
                            </div> 
                            <div 
                                style={{
                                    width: '20px',
                                    height: '50px',
                                    border: '1px solid #b8b8b8ff'
                                }}>
                            </div> 
                            <div 
                                style={{
                                    width: '20px',
                                    height: '50px',
                                    border: '1px solid #b8b8b8ff'
                                }}>
                            </div> 
                        </div>
                },
            ]
        },

        {
            title: "Row",
            elements: [
                { 
                    type: 'row', 
                    name:                             
                        <div 
                            style={{
                                width: '200px',
                                height: '20px',
                                border: '1px solid #b8b8b8ff'
                            }}>
                        </div> 

                },
            ]
        },

    ];


    return ( 
        <ToolboxContainer> 
            <h2>Elements</h2> 
            {sections.map((section, i) => (
                <div key={i}>
                    <div><h4><u>{section.title}</u></h4></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            {section.elements.map((element, index) => (
                                <DraggableToolboxItem key={index} element={element} />
                            ))}
                    </div>
                </div>
            ))}
        </ToolboxContainer> 
    ); 
}; 
 
const DraggableToolboxItem = ({ element }) => { 
    const [{ isDragging }, drag] = useDrag(() => ({ 
        type: 'toolbox-item', 
        item: { element }, 
        collect: (monitor) => ({ 
        isDragging: !!monitor.isDragging(), 
        }), 
    })); 
    
    return ( 
        <ToolboxItem 
        ref={drag} 
        style={{ 
            opacity: isDragging ? 0.5 : 1, 
        }} 
        > 
        {element.name}
        </ToolboxItem> 
    ); 
}; 
 
export default Toolbox;