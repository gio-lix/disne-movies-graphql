import React, {useState} from 'react';
import {gql, GraphQLClient} from "graphql-request";
import type {GetServerSideProps, NextPage} from "next";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const changeToSeen = async (slug: string) => {
    const {data} = await axios.post(`http://localhost:3000/api/changeToSeen`, slug)
}

const VideoPage: NextPage = ({data}: any) => {

    const [watching, setWatching] = useState<boolean>(false);
    return (
        <div className='px-10 mt-10'>
            {!watching && (
                <div className='relative w-full h-96'>
                    <Image layout='fill' src={data.thumbnail.url} alt="image" className='absolute'/>
                    <div className='absolute bottom-10 left-10'>
                        <p>{data.tags.join(', ')}</p>
                        <p>{data.description}</p>
                        <button
                            onClick={() => {
                                setWatching(!watching),
                                changeToSeen(data.slug)
                            }}
                            className='text-green-300'>PLAY</button>
                        <div>
                            <Link href={'/'}>
                                <a className='text-green-400'>Go Back</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {watching && (
                <video width="100%" controls>
                    <source src={data.mp4.url} type='video/mp4'/>
                </video>
            )}


        </div>
    );
};
export default VideoPage;





export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const {slug} = ctx.query

    let url = process.env.ENDPOINT
    const graphQLClient: any = new GraphQLClient(url, {
        headers: {
            "Authorization": process.env.GRAPH_CMS_TOKEN
        }
    })
    const query = gql`
        query($slug: String) {
          video(where:  {
            slug: $slug
          }) {
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
            mp4 {
              url
            }
          }
        }
    `



    const variables = {slug}

    const data = await graphQLClient.request(query, variables)

    return {
        props: {data: data.video }
    }
}
