import Button from '../components/Button'
import Image from 'next/image';
import { useUser } from '../contexts/UserProvider';

const LandingPage = () => {
  const { login } = useUser();

  return (
    <div className="flex flex-col gap-3 items-center justify-center lg:h-screen mt-20 lg:mt-0">
      <Image src='/youtube.svg' layout='responsive' height={50} width={220} alt='Youtube' className='mb-4'/>
      <h1 className='font-bold text-5xl text-center'>Subscription Manager</h1>
      <h3 className='text-xl font-light text-center'>Unofficial tool to keep your watch time productive</h3>
      <div className='flex flex-col w-full justify-center lg:flex-row gap-24 my-20 items-center lg:items-end text-center'>
        <div className='flex flex-col gap-8'>
          <Image src="/group_channels.svg" layout='responsive' height={220} width={310} alt="Group channels" />
          <h4 className='text-xl font-light'>Group channels that have same topics</h4>
        </div>
        <div className='flex flex-col gap-8'>
          <Image src="/new_videos.svg" layout='responsive' height={252} width={466} alt="New videos" />
          <h4 className='text-xl font-light'>Keep a clear view of what you didn’t see yet</h4>
        </div>
        <div className='flex flex-col gap-8'>
          <Image src="/clutter.svg" layout='responsive' height={314} width={343} alt="Clutter" className='pl-10' />
          <h4 className='text-xl lg:self-start font-light'>Hide what doesn’t interest you!</h4>
        </div>
      </div>
      <Button variant='cta' className='h-12 w-full lg:w-56' onClick={login}>Login with YouTube</Button>
    </div>
  )
}

LandingPage.layout = 'withoutNavbar';

export default LandingPage;