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
    width: 250px; 
    height: 100%;
    padding: 20px; 
    background: #e9e9e9; 
    border-right: 1px solid #ddd; 
`; 
 
const Toolbox = () => { 
    const elements = [ 
        { type: 'text', name: 'Text Block' }, 
        { type: 'boldtext', name: 'Bold Text Block' }, 
        { type: 'italictext', name: 'Cursive Text Block' }, 
        { type: 'bulletpoints', name: 'Bullet Points' },
        { type: 'numberedlist', name: 'Numbered List' },
        { type: 'title', name: 'Title' }, 
        { type: 'header', name: 'Header' }, 
        { type: 'subheader', name: 'Subheader' }, 
        { type: 'image', name: 'Image' }, 
        { type: 'button', name: 'Button' }, 
        { type: 'video', name: 'Video Embed' }, 
        { type: 'divider', name: 'Divider' }, 
        { type: 'gap 10px', name: '10px' }, 
        { type: 'gap 20px', name: '20px' }, 
        { type: 'gap 30px', name: '30px' }, 
    ]; 
 
    return ( 
        <ToolboxContainer> 
        <h3>Elements</h3> 
        {elements.map((element, index) => ( 
            <DraggableToolboxItem key={index} element={element} /> 
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