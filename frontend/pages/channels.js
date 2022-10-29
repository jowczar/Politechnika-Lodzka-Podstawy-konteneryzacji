import Button from '../components/Button'
import Image from 'next/image';
import { useUser } from '../contexts/UserProvider';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center lg:h-screen mt-20 lg:mt-0">
        Welcome
    </div>
  )
}

export default LandingPage;