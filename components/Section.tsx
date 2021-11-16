import {FC} from "react"
import Card from "./Card";
import Link from 'next/link'
interface ISection {
    genre: string
    videos: {
        id: number
        slug: string
        thumbnail: string
    }[]
}
const Section: FC<ISection> = ({genre, videos}) => {
  return (
     <>
        <h3 className='font-semibold'> {genre} </h3>
         <div className=''>
             <div className='  grid lg:grid-cols-3 sm:grid-cols-2 gap-2 '>
                 {videos.map((video) => (
                     <Link href={`/video/${video.slug}`} key={video.id}>
                         <a>
                             <Card thumbnail={video.thumbnail} />
                         </a>
                     </Link>

                 ))}
             </div>
         </div>

     </>
  )
}
export default Section