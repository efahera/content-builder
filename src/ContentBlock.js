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
 
const ContentBlock = ({ block, index, moveBlock, updateBlock, removeBlock, isPreview  }) => {
    const [isEditing, setIsEditing] = useState(false); 
    // const [localContent, setLocalContent] = useState(block?.props?.content || '');
    const [localContent, setLocalContent] = useState(block.props?.content ?? '');

    
    useEffect(() => {
    setLocalContent(block.content || '');
    }, [block.content]);
    
    if (!block.props?.content) {
    console.warn('Block missing content:', block);
    }

    // useEffect(() => {
    // const typesThatRequireContent = ['title', 'header', 'text', 'boldtext', 'bulletpoints'];

    // if (typesThatRequireContent.includes(block.type) && (block.content === undefined || block.content === null)) {
    //     console.warn("Block missing content:", block);
    // }
    // }, []);

    const ref = React.useRef(null); 
    
    const [{ isDragging }, drag] = useDrag({ 
        type: 'canvas-block', 
        item: { index }, 
        collect: (monitor) => ({ 
        isDragging: monitor.isDragging(), 
        }), 
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
    
    const handleChange = (updatedProps) => {
        setLocalContent(updatedProps.content);
    };

    const handleSave = () => {
        updateBlock(block.id, { ...block.props, content: localContent });
        setIsEditing(false);
    };

    // const handleBlockChange = (blockId, newProps) => {
    // setBlocks(prevBlocks =>
    //     prevBlocks.map(block =>
    //     block.id === blockId
    //         ? { ...block, props: { ...block.props, ...newProps } }
    //         : block
    //     )
    // );
    // };

    // const renderBlockContent = () => { 
    //     switch (block.type) { 
    //         case 'text': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                     onClick={() => !isPreview && setIsEditing(true)}
    //                     style={{ textAlign: 'left' }}
    //                     > 
    //                         {content || 'Double click to edit text'} 
    //                 </div> 
    //             );

    //         case 'boldtext': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ fontWeight: 'bold', textAlign: 'left' }}
    //                 >
    //                 {content || 'Double click to edit text'}
    //                 </div>
    //             );

    //         case 'italictext': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ fontStyle: 'italic', textAlign: 'left' }}
    //                 >
    //                 {content || 'Double click to edit text'}
    //                 </div>
    //             );

    //         case 'bulletpoints':
    //             return isEditing ? (
    //                 <div>
    //                 <textarea
    //                     value={content}
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     placeholder="Enter bullet points, one per line"
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }}
    //                 />
    //                 <button onClick={handleSave}>Save</button>
    //                 </div>
    //             ) : (
    //                 <ul 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ textAlign: 'left' }}
    //                 >
    //                     {content.split('\n').map((line, index) => (
    //                         <li key={index}>{line}</li>
    //                     ))}
    //                 </ul>
    //             );

    //         case 'numberedlist':
    //             return isEditing ? (
    //                 <div>
    //                 <textarea
    //                     value={content}
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     placeholder="Enter ordered list items, one per line"
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }}
    //                 />
    //                 <button onClick={handleSave}>Save</button>
    //                 </div>
    //             ) : (
    //                 <ol
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{
    //                     textAlign: 'left',
    //                     paddingLeft: '20px',
    //                     margin: 0,
    //                 }}
    //                 >
    //                 {content.split('\n').map((line, index) => (
    //                     <li key={index}>{line}</li>
    //                 ))}
    //                 </ol>
    //             );

    //         case 'title': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ fontSize: '26px', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}
    //                 >
    //                 {content || 'Double click to edit title'}
    //                 </div>
    //             );

    //         case 'header': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'left', textDecoration: 'underline' }}
    //                 >
    //                 {content || 'Double click to edit header'}
    //                 </div>
    //             );

    //         case 'subheader': 
    //             return isEditing ? ( 
    //                 <div> 
    //                     <textarea 
    //                     value={content} 
    //                     onChange={(e) => {
    //                         setContent(e.target.value);
    //                         updateBlock(block.id, { content: e.target.value });
    //                     }}
    //                     style={{ width: '100%', minHeight: '100px', textAlign: 'left' }} 
    //                     /> 
    //                     <button onClick={handleSave}>Save</button> 
    //                 </div> 
    //             ) : ( 

    //                 <div 
    //                 onClick={() => !isPreview && setIsEditing(true)}
    //                 style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }}
    //                 >
    //                 {content || 'Double click to edit subheader'}
    //                 </div>
    //             );

    //         case 'image': 
    //             return ( 
    //                 <div> 
    //                     {content ? ( 
    //                     <img src={content} alt="Content" style={{ maxWidth: '500px', display: 'flex', justifyContent: 'left' }} />
    //                     ) : ( 
    //                     <div> 
    //                         <input 
    //                         type="file" 
    //                         onChange={(e) => { 
    //                             const file = e.target.files[0]; 
    //                             if (file) { 
    //                             const reader = new FileReader(); 
    //                             reader.onload = (event) => { 
    //                                 const imageData = event.target.result;
    //                                 setContent(imageData);
    //                                 updateBlock(block.id, { content: imageData });
    //                             }; 
    //                             reader.readAsDataURL(file); 
    //                             } 
    //                         }} 
    //                         /> 
    //                     </div> 
    //                     )} 
    //                 </div> 
    //             ); 

    //         case 'button': 
    //             return ( 
    //             <button style={{ padding: '10px 20px', background: '#1890ff', color: 'white', border: 'none' }}> 
    //                 {content || 'Click me'} 
    //             </button> 
    //             ); 

    //         case 'video':
    //             return isEditing ? (
    //                 <div>
    //                 <input
    //                     value={content}
    //                     onChange={(e) => setContent(e.target.value)}
    //                     placeholder="Paste YouTube embed URL"
    //                     style={{ width: '100%' }}
    //                 />
    //                 <button onClick={handleSave}>Save</button>
    //                 </div>
    //             ) : (
    //                 <div onClick={() => setIsEditing(true)}>
    //                 {content ? (
    //                     <iframe
    //                     width="100%"
    //                     height="200"
    //                     src={content}
    //                     frameBorder="0"
    //                     allowFullScreen
    //                     title="Video"
    //                     />
    //                 ) : (
    //                     <p>Click to add video URL</p>
    //                 )}
    //                 </div>
    //             );
            
    //         case 'divider':
    //             return <hr style={{ borderTop: '1px solid #ccc' }} />;

    //         case 'gap 10px':
    //             return <div style={{ height: '10px' }} />;

    //         case 'gap 20px':
    //             return <div style={{ height: '20px' }} />;

    //         case 'gap 30px':
    //             return <div style={{ height: '30px' }} />;

    //         default: 
    //         return <div>{block.type} element</div>; 
    //     } 
    // }; 
   
  return ( 
        <BlockContainer 
            ref={ref} 
            style={{ 
                opacity: isDragging ? 0.5 : 1,
                cursor: isPreview ? 'default' : 'move',
                border: isPreview ? 'none' : '1px solid #ddd',
                padding: isPreview ? '0px' : '15px',
                background: isPreview ? 'transparent' : 'white',
            }} 
        > 
        {!isPreview && (
            <BlockControls> 
                <ControlButton onClick={() => setIsEditing(!isEditing)}> ✏️ </ControlButton> 
                <ControlButton onClick={() => removeBlock(block.id)}> 🗑️ </ControlButton> 
            </BlockControls> 
        )}

        <ComponentType
            type={block.type}
            props={{ content: localContent }}
            isEditing={isEditing}
            onChange={handleChange}            
            onSave={handleSave}
            setIsEditing={setIsEditing}
            isPreview={isPreview}
        />
        </BlockContainer> 
    ); 
}; 
 
export default ContentBlock; 