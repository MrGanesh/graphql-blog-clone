import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {GraphQLClient, gql} from 'graphql-request';
import BlogCard from '../components/BlogCard'
const graphcms = new GraphQLClient('https://api-ap-south-1.graphcms.com/v2/cl4qnxgjr00cb01wgbyau4ssc/master')

const QUERY = gql`
{
  posts{
    title, 
    datepublished,
    slug,
    content{
      html
    }
    author{
      name,
      avatar{
        url
      }
    }
    coverPhoto{
       url
      }
    }
  }
}`

export async function getStaticProps(){
  const {posts} = await graphcms.request(QUERY)
  return{
    props:{
      posts
    },
    revalidate:10,
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        {posts.map(post => {
          <BlogCard title={post.title} author={post.author}
            coverPhoto={post.coverPhoto} key={post.id}
            datePublished={post.datePublished} slug={post.slug}
          />
        })}
      </main>
    </div>
  );
}
