import Image from "next/image";

const Channel = ({ isFound, videos, name }) => {
    if (!isFound) {
        return (
            <div className='flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <Image 
                    src="/void.svg" 
                    layout='responsive'
                    height={323} 
                    width={309}
                    alt="Not found :("
                    />
                <h1 className="mt-10 font-bold text-3xl">Channel not found</h1>
                <h3 className="mt-1 text-gray-500">Tip: check your spelling!</h3>
            </div>
        )
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