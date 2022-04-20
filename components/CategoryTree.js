import Link from "next/link";

export default function CategoryTree({ tree }) {
  const TreeList = ({ categories }) =>
    categories.map((category, index) => (
      <li key={category.path}>
        <Link href={`/article?category=${category.query}`}>
          <a>{category.name}</a>
        </Link>
        {category.children.length > 0 && (
          <ul>
            <TreeList categories={category.children} />
          </ul>
        )}
      </li>
    ));

  return (
    <>
      <nav className="category-tree">
        <ul>
          <TreeList categories={tree} />
        </ul>
      </nav>
    </>
  );
}
