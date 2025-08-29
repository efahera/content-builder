// import Canvas from "./Canvas";
import ContentBlock from "./ContentBlock";

// const InnerDropArea = styled.div`
//     min-height: 200px;
//     border: ${(props) => props.$isOver ? '2px dashed #1890ff' : '2px dashed #ddd'};
//     background: ${(props) => props.$isOver ? 'rgba(24, 144, 255, 0.1)' : 'white'};
//     padding: 50px;
// `;

const ComponentType = ({ block, updateBlock, type, content = '', isEditing, previewMode, setIsEditing, onSave, onChange, handleSave }) => {

    const renderTextarea = () => (
        <>
            <textarea
                value={content}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: '100%', minHeight: '100px', textAlign: 'left' }}
            />
            <div><button onClick={onSave}>Save</button></div>
        </>
    );

    const renderImageFile = () => (
        <input
            type="file"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        updateBlock(block.id, {
                            content: {
                                src: event.target.result
                            }
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }}
        />
    );

    const renderImageSize = () => (
        <>
            <div>
                <label>Width (px): </label>
                <input
                    type="number"
                    value={content?.width || ''}
                    onChange={(e) =>
                        onChange({
                            ...content,
                            width: parseInt(e.target.value, 10) || null
                        })
                    }
                />
            </div>

            <div>
                <label>Height (px): </label>
                <input
                    type="number"
                    value={content?.height || ''}
                    onChange={(e) =>
                        onChange({
                            ...content,
                            height: parseInt(e.target.value, 10) || null
                        })
                    }
                />
            </div>

            <div><button onClick={onSave}>Save</button></div>
        </>
    );

    const renderTextEdit = () => (
        <>
            <div
                onClick={() => !previewMode && setIsEditing(true)}
                style={{
                    color: 'gray',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }}
            >
                Click to edit
            </div>

        </>
    );

    const column = () => (
        <>
            <div 
            style={{             
                width: '100%',
                minHeight: '150px',
                border: '1px dashed #aaa',
                padding: '10px',
                margin: '10px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                color: "gray"
            }}>
                Column
            </div>
        </>
    );

    const row = () => (
        <>
            <div 
            style={{             
                width: '100%',
                height: '30px',
                border: '1px dashed #aaa',
                padding: '10px',
                margin: '10px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9',
                color: "gray"

            }}>
                Row
            </div>
        </>
    );

    switch (type) {
        case 'text':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <div
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{ textAlign: 'left', }}
                                >
                                    {content}
                                </div>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}                
                    </div>

            );
            
        case 'boldtext':
            return (
                 <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                    <>
                        {content ? (
                            <div
                                onClick={() => !previewMode && setIsEditing(true)}
                                style={{ fontWeight: 'bold', textAlign: 'left' }}
                            >
                                {content}
                            </div>
                        ) : (
                            <>{renderTextEdit()}</>
                        )}
                    </>
            )}
                </div>
        );
            
        case 'italictext':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <div
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{ fontStyle: 'italic', textAlign: 'left' }}                                
                                >
                                    {content}
                                </div>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}                
                    </div>

            );

        case 'bulletpoints':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <ul
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}
                                >
                                    {content.split('\n').map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                                </ul>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}                
                    </div>

            );

        case 'numberedlist':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <ol
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}
                                >
                                    {content.split('\n').map((line, index) => (
                                        <li key={index}>{line}</li>
                                    ))}
                                </ol>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}                
                    </div>
            );
        
        case 'title':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <div
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{
                                        fontSize: '26px',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {content}
                                </div>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}

                </div>
            );
            
        case 'header':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <div
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {content}
                                </div>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}

                </div>
            );

        case 'subheader':
            return (
                <div>
                    {isEditing ? (
                        <>{renderTextarea()}</>
                    ) : (
                        <>
                            {content ? (
                                <div
                                    onClick={() => !previewMode && setIsEditing(true)}
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        textDecoration: 'underline',
                                    }}
                                >
                                    {content}
                                </div>
                            ) : (
                                <>{renderTextEdit()}</>
                            )}
                        </>
                    )}

                </div>
            );

        case 'image':
            return (
                <div>
                    {isEditing ? (
                        <>
                            {renderImageFile()}
                            {renderImageSize()}
                        </>
                    ) : (
                        <div onClick={() => !previewMode && setIsEditing(true)}>
                            {content ? (
                                <img
                                    src={content.src}
                                    alt="Content"
                                    style={{
                                        maxWidth: '100%',
                                        width: content.width ? `${content.width}px` : '100%',
                                        height: content.height ? `${content.height}px` : 'auto'
                                    }}
                                />
                            ) : (
                                <div style={{ color: '#888' }}>Click to add image</div>
                            )}
                        </div>
                    )}
                </div>
            );

        case 'divider':
            return <hr style={{ borderTop: '1px solid #ccc' }} />;

        case 'gap':
            return <div style={{ height: '10px' }} />;
            
        case '1column':
            // return (
            //     <>
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //             {column()} 
            //         </div>
            //     </>
            // );
        
            return (
                <div className="flex flex-col gap-2">
                    {block.children?.map((child) => (
                        <ContentBlock key={child.id} block={child} />
                    ))}
                </div>
            );

        case '2column':
            // return (
            //     <> 
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //             {column()} 
            //             {column()}
            //         </div>
            //     </>
            // );
            
            return (
                <div className="grid grid-cols-2 gap-4">
                    {block.children?.map((child, idx) => (
                        <ContentBlock key={child.id || idx} block={child} />
                    ))}
                </div>
            );

        case '3column':
            // return (
            //     <> 
            //         <div style={{ display: 'flex', gap: '10px' }}>
            //             {column()} 
            //             {column()}
            //             {column()}
            //         </div>
            //     </>
            // );

            return (
                <div className="grid grid-cols-3 gap-4">
                    {block.children?.map((child, idx) => (
                        <ContentBlock key={child.id || idx} block={child} />
                    ))}
                </div>
            );

        case 'row':
            // return (
            //     <>{row()}</>
            // );

            return (
                <div className="flex flex-row gap-2">
                    {block.children?.map((child) => (
                        <ContentBlock key={child.id} block={child} />
                    ))}
                </div>
            );

        default:
            return <div>Unknown component type: {type}</div>;
    }
};

export default ComponentType;
