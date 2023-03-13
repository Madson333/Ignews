import { getPrismicClient } from "@/services/prismic"
import { GetStaticProps } from "next"
import Head from "next/head"
import styles from "./styles.module.scss"
import Prismic from "@prismicio/client"
import { RichText } from "prismic-dom"
import Link from "next/link"

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatadeAt: string;
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head><title>Posts | Ignews</title></Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => {
            return (
              <Link href={`/posts/${post.slug}`}>
                <time>{post.updatadeAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </Link>
            )
          })}


        </div>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query<any>([
    Prismic.predicates.at("document.type", "publication")
  ], {
    fetch: ["publication.title", "publication.content"],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: { type: string }) => content.type === "paragraph")?.text ?? "",
      updatadeAt: new Date(post.last_publication_date!).toLocaleDateString("pt-Br", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })

    }
  })

  return {
    props: {
      posts
    }
  }
}