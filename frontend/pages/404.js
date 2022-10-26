import Image from 'next/image';
import Link from 'next/link'

const PageNotFound = () =>  {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <Image 
            src="/not_found.svg" 
            layout='responsive'
            height={570} 
            width={860}
            alt="Not found :(" 
            className='mb-20'
            />
      <h1 className="font-bold text-5xl">Page not found</h1>
      <Link href="/" className="underline text-2xl hover:text-primary transition-all">Go back to the app</Link>
    </div>
  );
}

export default PageNotFound;