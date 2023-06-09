import { getPrismicClient } from "@/services/prismic"
import { GetStaticProps } from "next"
import { useSession } from "next-auth/react"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import { RichText } from "prismic-dom"
import styles from "../post.module.scss"
import { useEffect } from "react"
import { useRouter } from "next/router"

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatadeAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const session: any = useSession();
  const router = useRouter()

  useEffect(() => {
    if (!session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatadeAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              Subscribe now
            </Link>
          </div>
        </article>
      </main>

    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}


export const getStaticProps: GetStaticProps = async ({ params }: any) => {

  const { slug } = params



  const prismic = getPrismicClient()

  const response = await prismic.getByUID<any>('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title!),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatadeAt: new Date(response.last_publication_date!).toLocaleDateString("pt-Br", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    })
  }
  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutos
  }
}