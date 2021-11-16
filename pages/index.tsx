import {gql, GraphQLClient} from "graphql-request";
import type {GetStaticProps, NextPage} from 'next'
import Image from "next/image";
import Section from "../components/Section";
import NavBar from "../components/Navbar";

const Home: NextPage = ({videos, account}: any) => {


    const randomVideos = (videos: any) => {
        return videos[Math.floor(Math.random() * videos.length)]
    }

    const videosFilter = (videos: any, genre: any) => {
        return videos.filter((video: any) => video.tags.includes(genre))
    }
    const unseenVideos = (videos: any) => {
        return videos.filter((video: any) => video.seen === false || video.seen === null)
    }

    return (
        <>

            <div className='p-2 sm:px-28 md:px-36'>
                <NavBar account={account}/>
               <div className='w-full h-52 overflow-y-hidden '>
                   <Image layout='responsive' width={800} height={300} src={randomVideos(videos).thumbnail.url} alt="logo" className=''/>
               </div>
                <div>
                    <Section genre='Recommended for you' videos={unseenVideos(videos)} />
                    <Section genre='family' videos={videosFilter(videos, 'family')} />
                    <Section genre={'Thriller'} videos={videosFilter(videos, 'thriller')}/>
                    <Section genre={'Classic'} videos={videosFilter(videos, 'classic')} />
                    <Section genre={'Pixar'} videos={videosFilter(videos, 'pixar')}/>
                    <Section genre={'Marvel'}  videos={videosFilter(videos, 'marvel')}/>
                    <Section genre={'National Geographic'} videos={videosFilter(videos, 'national-geographic')} />
                    <Section genre={'Disney'} videos={videosFilter(videos, 'disney')}/>
                    <Section genre={'Star Wars'} videos={videosFilter(videos, 'star wars')}/>
                </div>
            </div>
        </>
    )
}

export default Home


export const getStaticProps: GetStaticProps = async () => {
    const url = process.env.ENDPOINT

    const graphQLClient = new GraphQLClient(url, {
        headers: {
            "Authorization": process.env.GRAPH_CMS_TOKEN
        }
    })
    const query = gql`
         query {
          videos {
            createdAt,
            id,
            title,
            description,
            seen,
            slug,
            tags,
            thumbnail {
              url
            }
          }
        }
    `
    const accountQuery:any = gql`
        query {
          account(where: {
            id: "ckw1tos74768m0b46ndl544y6"
          }) {
            username
            avatar {
             url
            }
          }
        }
    `
    const accountData = await graphQLClient.request(accountQuery )
    const account = accountData.account

    const data = await graphQLClient.request(query)


    return {
        props: {videos : data.videos, account}
    }
}