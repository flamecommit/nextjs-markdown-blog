import Seo from "../components/Seo";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Seo title="Home" />
      <ul>
        <li>
          <Link href="/article">
            <a>Article</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
