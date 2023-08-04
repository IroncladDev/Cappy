import { newsletterUrl } from "app/config";

export default function Newsletter() {
  return <>
    <meta httpEquiv="refresh" content={"0; url=" + newsletterUrl}/>
  </>;
}
