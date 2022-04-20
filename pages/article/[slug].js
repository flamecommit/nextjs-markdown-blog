import ReactMarkdown from "react-markdown";
import Router from "next/router";
import fs from "fs";

export default function ArticleDetail({ content }) {
  return (
    <div className="article-detail">
      <button type="button" onClick={() => Router.back()}>
        뒤로가기
      </button>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const content = fs.readFileSync(
    `articles/${slug.replace(/-/gi, "/")}.md`,
    "utf-8"
  );

  return {
    props: {
      content,
    },
  };
}
