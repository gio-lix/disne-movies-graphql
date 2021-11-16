import {FC} from "react"
import Image from "next/image";
interface ICard {
    thumbnail: any
}
const Card: FC<ICard> = ({thumbnail}) => {
  return (
     <div className='w-full sm:w-44 h-60 sm:h-44 relative m-auto' >
         <Image src={thumbnail.url} layout='fill' alt="image" className='absolute' />
     </div>
  )
}
export default Card