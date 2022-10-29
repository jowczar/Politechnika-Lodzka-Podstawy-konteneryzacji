import Image from 'next/image';
import Link from 'next/link'

const PageNotFound = () =>  {
  return (
    <div className='flex flex-col gap-3 items-center justify-center h-screen'>
        <Image 
            src="/not_found.svg" 
            layout='responsive'
            height={285} 
            width={430}
            alt="Not found :(" 
            className='mb-20'
            />
      <h1 className="font-bold text-4xl">Page not found</h1>
      <Link href="/" className="underline text-lg hover:text-primary transition-all">Go back to the app</Link>
    </div>
  );
}

PageNotFound.layout = 'withoutNavbar';

export default PageNotFound;