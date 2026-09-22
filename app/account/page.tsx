import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { createWhatsAppQuoteHref } from "../lib/whatsapp";
import styles from "./account.module.css";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await requireChatGPTUser("/account");
  const initial = user.displayName.trim().charAt(0).toUpperCase() || "I";
  const quoteHref = createWhatsAppQuoteHref();

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
          <article><span>02</span><h2>Quotation help is one message away.</h2><p>Product enquiries and quotation history are not saved to your account. Contact the IVEND team when you are ready.</p></article>
        </div>
        <div className={styles.accountActions}><a href={quoteHref} target="_blank" rel="noopener noreferrer">Request a Quote <span aria-hidden="true">&#8599;</span></a><a href={chatGPTSignOutPath("/")}>Sign out</a></div>
      </section>
      <p className={styles.privacyNote} data-animate="up" data-animate-delay="1">Your website account uses your ChatGPT sign-in. I Vend Station does not receive or store a password through this page. <a href="/privacy">Read the Privacy Policy.</a></p>
    </main>
  );
}
