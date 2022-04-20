import React from "react";
import CategoryTree from "../../components/CategoryTree";
import Seo from "../../components/Seo";
import fs from "fs";
import Link from "next/link";

export default function ArticleIndex({ categoryTree, articleList }) {
  return (
    <div className="article-index">
      <Seo title="Next.js Markdown Blog" />
      <CategoryTree tree={categoryTree} />
      <div className="article-list">
        <ul>
          {articleList.map((article) => (
            <li key={article.path}>
              <Link href={`/article/${article.path}`}>
                <a>{article.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const treePath = "articles";
  const treeFiles = fs.readdirSync(treePath);
  const categoryTree = [];

  const makeTree = (path, files, parent) => {
    files.map((name) => {
      const arr = name.split(".");
      const ext = arr[arr.length - 1];

      if (ext !== "md") {
        // directory
        const newPath = `${path}/${name}`;
        const query = newPath.replace("articles/", "").replace(/\//gi, "-");
        const newFiles = fs.readdirSync(newPath);
        const children = [];
        parent.push({
          name,
          path: newPath,
          children,
          query,
        });
        if (newFiles.length) {
          makeTree(newPath, newFiles, children);
        }
      }
    });
  };

  makeTree(treePath, treeFiles, categoryTree);

  const listPath = query.category
    ? `articles/${query.category.replace(/-/gi, "/")}`
    : "articles";
  const listFiles = fs.readdirSync(listPath);
  const articleList = [];

  const makeList = (path, files) => {
    files.map((name) => {
      const arr = name.split(".");
      const ext = arr[arr.length - 1];
      const newPath = `${path}/${name}`;

      if (ext !== "md") {
        // directory
        const newFiles = fs.readdirSync(newPath);
        makeList(newPath, newFiles);
      } else {
        articleList.push({
          name,
          path: newPath
            .replace("articles/", "")
            .replace(".md", "")
            .replace(/\//gi, "-"),
        });
      }
    });
  };

  makeList(listPath, listFiles);

  return {
    props: {
      categoryTree,
      articleList,
    },
  };
}
