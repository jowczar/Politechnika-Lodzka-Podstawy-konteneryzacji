const Channel = ({ isFound, videos, name }) => {
    if (!isFound) {
        return <h1>Channel not found</h1>
    }

    return <h1>Single channel page</h1>
}

export function getServerSideProps({ params }) {
    const { name } = params;

    //  TODO: ask real API if channel exists & get its data
    if (name === 'i-dont-exist') {
        return {
            props: {
                isFound: false,
                videos: [],
                name
            }
        }
    }

    return {
        props: {
            isFound: true,
            videos: [{ id: 1, title: 'Video 1' }, { id: 2, title: 'Video 2' }],
            name
        }
    }
}

export default Channel;