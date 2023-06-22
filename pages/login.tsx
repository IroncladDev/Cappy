import { useSession, signIn, signOut } from "next-auth/react"

export default function MyComponent() {
  const { data: session } = useSession();

  if (!session) {
    return <button onClick={() => signIn("twitter")}>Sign in with Twitter</button>;
  }

  return (
    <div>
      <p>Welcome, {session.user?.name}!</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}