export const Avatar = ({ link, className, onClick = () => {} }) => {
    if (!link) {
        return (
            <div onClick={onClick} className={`border rounded-full h-full w-full bg-gray-600 ${className}`} />
        );
    }
    return (
        <img onClick={onClick} src={link} alt="avatar" className={`border rounded-full h-full w-full ${className}`} />
    )
}

Avatar.displayName = "Avatar"

export default Avatar;