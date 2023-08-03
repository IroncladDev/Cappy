import { newsletterUrl } from "app/config";

export default function Newsletter() {
  return <></>;
}

export function getStaticProps() {
  return {
    redirect: {
      destination: newsletterUrl,
    },
  };
}
