import {FC} from "react"
import Link from 'next/link'
import Image from "next/image";
import disneyImage from '../public/7033669_disney_plus_icon.svg'

interface INavBar {
    account: {
        username: string
        avatar: {
            url: string
        }
    }

}
const NavBar: FC<INavBar> = ({account}) => {
    console.log(account)
  return (
     <>
        <div>
            <Link href={'/'}>
                <a>
                    <Image src={disneyImage} width={70} height={50} alt='disney logo'/>
                </a>
            </Link>
            <div className='flex items-center mb-4 space-x-2'>
                <Image src={account.avatar.url} className='rounded-full' width={50} height={50} alt='accaunt image'/>
                <p>Welcome {account.username}</p>
            </div>
        </div>
     </>
  )
}
export default NavBar