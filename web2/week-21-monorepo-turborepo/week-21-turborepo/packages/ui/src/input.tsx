interface inputProps{
    type:string;
    placeholder:string;
    ref:any;
}

export const Input=({type,placeholder,ref}:inputProps)=>{

    return (
        <input type={type} placeholder={placeholder} style={{
            padding:'0.5rem',
            flexGrow:'1'
        }}
        ref={ref}
        />
    )
}