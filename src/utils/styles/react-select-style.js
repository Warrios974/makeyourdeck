export const colorStyles = {
    control: (styles) => ({
        ...styles, 
        backgroundColor: "#000",
        border: "none",
        borderRadius: "40px",
        padding: ".3rem .5rem",
    }),
    option: (styles, {data, isDisable, isFocused, isSelected}) => {
        return {
            ...styles, 
            backgroundColor: isFocused ? "#FFF" : "#000",
            color: isFocused ? "#000" : "#FFF",
        }
    }, 
    placeholder: (styles) => ({
        ...styles, 
        color: "#FFF"
    }),
    input: (styles) => ({
        ...styles, 
        color: "#FFF",
        marginTop: "0"
    }),
    singleValue: (styles) => ({
        ...styles, 
        color: "#FFF",
    })
}