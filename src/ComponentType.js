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

    switch (type) {
        case 'text':
            return isEditing ? renderTextarea() : (
                <div
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{ textAlign: 'left' }}
                >
                    {content}
                </div>
            );

        case 'boldtext':
            return isEditing ? renderTextarea() : (
                <div
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{ fontWeight: 'bold', textAlign: 'left' }}
                >
                    {content}
                </div>
            );

        case 'italictext':
            return isEditing ? renderTextarea() : (
                <div
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{ fontStyle: 'italic', textAlign: 'left' }}
                >
                    {content}
                </div>
            );

        case 'bulletpoints':
            return isEditing ? renderTextarea() : (
                <ul
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}
                >
                    {content.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            );

        case 'numberedlist':
            return isEditing ? renderTextarea() : (
                <ol
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{ textAlign: 'left', paddingLeft: '20px', margin: 0 }}
                >
                    {content.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ol>
            );

        case 'title':
            return isEditing ? renderTextarea() : (
                <div
                    onClick={() => !previewMode && setIsEditing(true)}
                    style={{
                        fontSize: '26px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        textDecoration: 'underline',
                    }}
                >
                    {content}
                </div>
            );

        case 'header':
            return isEditing ? renderTextarea() : (
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
            );

        case 'subheader':
            return isEditing ? renderTextarea() : 
            (
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
            
        default:
            return <div>Unknown component type: {type}</div>;
    }
};

export default ComponentType;
