export const Avatar = ({ link }) => {
    if (!link) {
        return (
            <div className="rounded-full h-full w-full bg-gray-600" />
        );
    }
    return (
        <img src={link} alt="avatar" className="rounded-full h-full w-full" />
    )
}

Avatar.displayName = "Avatar"

export default Avatar;