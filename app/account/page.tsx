import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import styles from "./account.module.css";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireChatGPTUser("/account");
  const initial = user.displayName.trim().charAt(0).toUpperCase() || "I";

  return (
    <main className={styles.page}>
      <section className={styles.accountCard} data-animate="scale">
        <div className={styles.accountHeading}><p>CUSTOMER ACCOUNT</p><span>Signed in with ChatGPT</span></div>
        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true">{initial}</div>
          <div><h1>Welcome, {user.fullName ?? user.displayName}.</h1><p>{user.email}</p></div>
        </div>
        <div className={styles.accountGrid}>
          <article><span>01</span><h2>Your account is ready.</h2><p>You can use this identity for protected I Vend Station account features.</p></article>
          <article><span>02</span><h2>Your quote cart stays local.</h2><p>Cart selections stay on this device. Quote history and submitted orders are not saved to your account yet.</p></article>
        </div>
        <div className={styles.accountActions}><a href="/cart">Open quote cart <span aria-hidden="true">&rarr;</span></a><a href={chatGPTSignOutPath("/")}>Sign out</a></div>
      </section>
      <p className={styles.privacyNote} data-animate="up" data-animate-delay="1">Your website account uses your ChatGPT sign-in. I Vend Station does not receive or store a password through this page.</p>
    </main>
  );
}
