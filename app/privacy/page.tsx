import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | I Vend Station",
  description: "Learn how I Vend Station handles account details, enquiries, device-local preferences, quote-cart data, and voice-assistant features.",
};

const englishContents = [
  ["en-scope", "Scope"], ["en-data", "Data we handle"], ["en-use", "How we use data"], ["en-storage", "Device storage"],
  ["en-sharing", "Sharing and transfers"], ["en-retention", "Retention and security"], ["en-rights", "Your rights"], ["en-contact", "Contact"],
] as const;

const malayContents = [
  ["ms-skop", "Skop"], ["ms-data", "Data yang dikendalikan"], ["ms-tujuan", "Cara data digunakan"], ["ms-storan", "Storan peranti"],
  ["ms-perkongsian", "Perkongsian dan pemindahan"], ["ms-penyimpanan", "Penyimpanan dan keselamatan"], ["ms-hak", "Hak anda"], ["ms-hubungi", "Hubungi"],
] as const;

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy} data-animate="up">
          <p className={styles.eyebrow}>PRIVACY AT I VEND STATION</p>
          <h1>Privacy,<br /><em>made clear.</em></h1>
          <p>This notice explains what the I Vend Station website handles, what stays only on your device, and the choices available to you.</p>
        </div>
        <div className={styles.heroMeta} data-animate="up" data-animate-delay="1">
          <div><span>Effective</span><time dateTime="2026-08-12">12 August 2026</time></div>
          <div><span>Applies to</span><strong>This website and its account, cart, and product-guide features</strong></div>
          <nav aria-label="Choose privacy policy language"><a href="#english">English</a><a href="#bahasa-malaysia" lang="ms">Bahasa Malaysia</a></nav>
        </div>
      </section>

      <section className={styles.quickFacts} aria-label="Privacy highlights">
        <article data-animate="up"><span>01</span><h2>Your cart stays local.</h2><p>Product IDs and quantities are stored in your browser, not in an I Vend Station customer database.</p></article>
        <article data-animate="up" data-animate-delay="1"><span>02</span><h2>No advertising trackers.</h2><p>The current website has no advertising pixels, behavioural analytics, or online payment collection.</p></article>
        <article data-animate="up" data-animate-delay="2"><span>03</span><h2>Ask IVS is website-based.</h2><p>Typed questions stay in page memory. Voice audio may be processed by your browser or device speech service.</p></article>
      </section>

      <section className={styles.policyLayout}>
        <aside className={styles.contents} data-animate="up">
          <p>ON THIS PAGE</p>
          <a className={styles.languageHeading} href="#english">English notice</a>
          <nav aria-label="English privacy policy contents">{englishContents.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav>
          <a className={styles.languageHeading} href="#bahasa-malaysia" lang="ms">Notis Bahasa Malaysia</a>
          <nav aria-label="Kandungan notis privasi Bahasa Malaysia" lang="ms">{malayContents.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav>
        </aside>

        <div className={styles.policyContent}>
          <section className={styles.languageSection} id="english" aria-labelledby="english-title">
            <header data-animate="up"><p>ENGLISH</p><h2 id="english-title">I Vend Station Privacy Policy</h2><p>I Vend Station operates this vending-machine catalogue website. This notice describes the website as it works on the effective date above. It does not cover payment or transaction data processed separately by a vending machine, T05 terminal, merchant acquirer, or payment provider.</p></header>

            <article id="en-scope" data-animate="up"><span>01</span><div><h3>Scope and sources</h3><p>We handle information that you choose to provide when you sign in, use website features, or contact the business. We may also receive limited technical information through the services that host and protect the website. Information may come directly from you, from ChatGPT sign-in, from your browser or device, or from a communication service you choose to use.</p></div></article>

            <article id="en-data" data-animate="up"><span>02</span><div><h3>Personal data and other information we handle</h3><ul>
              <li><strong>Account details:</strong> if you sign in with ChatGPT, the website receives a user identifier, email address, and, when available, your name. I Vend Station does not receive your ChatGPT password.</li>
              <li><strong>Enquiry details:</strong> if you contact the business outside this website, you may voluntarily provide your name, phone number, email, product type, location, requirements, message, or attachments.</li>
              <li><strong>Device-local selections:</strong> the quote cart stores product identifiers and quantities. The appearance control stores System, Light, or Dark. A session marker remembers that the loading screen has already appeared.</li>
              <li><strong>Product-guide content:</strong> questions typed into Ask IVS and its replies remain in the current page memory. They are not sent by this website to an external AI API.</li>
              <li><strong>Technical data:</strong> website hosting and security services may process request data such as IP address, browser or device type, requested page, date and time, referrer, and error or security events.</li>
            </ul></div></article>

            <article id="en-use" data-animate="up"><span>03</span><div><h3>Why we use information</h3><p>Information is used to provide the website and protected account page; remember your local cart and appearance choices; answer catalogue questions; respond to enquiries; prepare quotations and compatibility checks; maintain security and reliability; prevent misuse; meet legal duties; and protect the rights of users, I Vend Station, or others.</p><p>Providing information is optional unless it is needed for a feature you request. Without ChatGPT sign-in, the protected account page cannot open. Without enough product, location, and contact information, I Vend Station may be unable to answer an enquiry or prepare a suitable quotation.</p><p>The website does not sell personal data, use it for behavioural advertising, make significant automated decisions about you, or collect payment-card details.</p></div></article>

            <article id="en-storage" data-animate="up"><span>04</span><div><h3>Local storage, voice, and cookies</h3><p>The quote cart and appearance preference use your browser&apos;s local storage. They remain until you clear them, clear site data, or your browser removes them. The loading-screen marker uses session storage and normally ends with the browser session. You can use browser controls to remove these items.</p><p>Ask IVS messages stay in memory until you start a new conversation, reload, or leave the page. Voice input starts only when you press the microphone. I Vend Station&apos;s website does not save voice recordings, but your browser or device speech service may process audio and may use the internet under its own privacy terms. Spoken replies use your browser&apos;s speech-synthesis feature.</p><p>The application does not set advertising or analytics cookies. ChatGPT sign-in and hosting or security services may use cookies or similar technologies that are necessary to provide, authenticate, or protect their services.</p></div></article>

            <article id="en-sharing" data-animate="up"><span>05</span><div><h3>Who may receive data and international transfers</h3><p>Depending on the feature you choose, data may be processed by website hosting and security providers; the ChatGPT sign-in provider; your browser or device speech provider; WhatsApp, email, or another communication provider you choose; professional advisers; or public authorities where disclosure is permitted or required by law.</p><p>Some providers may process data outside Malaysia. Their own privacy terms and safeguards apply to their services. I Vend Station does not control how your browser speech provider, ChatGPT account, WhatsApp, email provider, merchant acquirer, or payment service independently handles information.</p></div></article>

            <article id="en-retention" data-animate="up"><span>06</span><div><h3>Retention, accuracy, and security</h3><p>Device-local data follows the periods described above. Ask IVS page-memory messages are not retained by an I Vend Station server. Business communications are kept only for as long as reasonably needed to respond, prepare or support a quotation, resolve issues, maintain necessary records, and meet legal duties.</p><p>I Vend Station uses reasonable organisational and technical measures appropriate to the information and the website. No internet transmission or storage system can be guaranteed completely secure. Please keep information accurate and do not send passwords, full payment-card details, or unnecessary sensitive information.</p></div></article>

            <article id="en-rights" data-animate="up"><span>07</span><div><h3>Your rights and choices</h3><p>Subject to applicable Malaysian law, you may ask whether I Vend Station holds personal data about you and request access, correction, withdrawal of consent, limits on processing, deletion where applicable, or an end to direct marketing. You may also clear the local cart and preferences with this website&apos;s or your browser&apos;s controls, choose not to sign in, type instead of using voice, and decide what to include in an enquiry.</p><p>A request may be limited where law allows or requires continued processing. If you believe personal data has been mishandled, you may also contact Malaysia&apos;s <a href="https://www.pdp.gov.my/ppdpv1/en/" target="_blank" rel="noreferrer">Personal Data Protection Commissioner</a>.</p></div></article>

            <article id="en-contact" data-animate="up"><span>08</span><div><h3>Contact and changes to this policy</h3><p>For a privacy question or request, visit the <a href="/#contact">I Vend Station Contact section</a>. The official WhatsApp number or business privacy email still needs to be configured; until then, the website does not provide an active online privacy-request channel. This policy will be updated when that channel is activated or when website practices materially change.</p><p>This website is intended for business customers and is not designed to knowingly collect children&apos;s personal data. If you believe a child has provided information, contact I Vend Station when the official channel becomes available.</p></div></article>
          </section>

          <section className={styles.languageSection} id="bahasa-malaysia" lang="ms" aria-labelledby="malay-title">
            <header data-animate="up"><p>BAHASA MALAYSIA</p><h2 id="malay-title">Notis Privasi I Vend Station</h2><p>I Vend Station mengendalikan laman web katalog mesin layan diri ini. Notis ini menerangkan cara laman web berfungsi pada tarikh kuat kuasa di atas. Notis ini tidak meliputi data pembayaran atau transaksi yang diproses secara berasingan oleh mesin layan diri, terminal T05, pemeroleh saudagar atau penyedia pembayaran.</p></header>

            <article id="ms-skop" data-animate="up"><span>01</span><div><h3>Skop dan sumber</h3><p>Kami mengendalikan maklumat yang anda pilih untuk berikan apabila anda mendaftar masuk, menggunakan ciri laman web atau menghubungi perniagaan. Kami juga mungkin menerima maklumat teknikal terhad melalui perkhidmatan yang mengehos dan melindungi laman web. Maklumat boleh diperoleh terus daripada anda, melalui daftar masuk ChatGPT, pelayar atau peranti anda, atau perkhidmatan komunikasi yang anda pilih.</p></div></article>

            <article id="ms-data" data-animate="up"><span>02</span><div><h3>Data peribadi dan maklumat lain yang kami kendalikan</h3><ul>
              <li><strong>Butiran akaun:</strong> jika anda mendaftar masuk dengan ChatGPT, laman web menerima pengenal pengguna, alamat e-mel dan, jika tersedia, nama anda. I Vend Station tidak menerima kata laluan ChatGPT anda.</li>
              <li><strong>Butiran pertanyaan:</strong> jika anda menghubungi perniagaan di luar laman web ini, anda boleh memberikan nama, nombor telefon, e-mel, jenis produk, lokasi, keperluan, mesej atau lampiran secara sukarela.</li>
              <li><strong>Pilihan dalam peranti:</strong> troli sebut harga menyimpan pengenal produk dan kuantiti. Kawalan paparan menyimpan pilihan Sistem, Cerah atau Gelap. Penanda sesi mengingati bahawa skrin pemuatan telah dipaparkan.</li>
              <li><strong>Kandungan panduan produk:</strong> soalan yang ditaip dalam Ask IVS dan jawapannya kekal dalam memori halaman semasa. Laman web ini tidak menghantarnya kepada API AI luaran.</li>
              <li><strong>Data teknikal:</strong> perkhidmatan pengehosan dan keselamatan mungkin memproses data permintaan seperti alamat IP, jenis pelayar atau peranti, halaman yang diminta, tarikh dan masa, perujuk, serta peristiwa ralat atau keselamatan.</li>
            </ul></div></article>

            <article id="ms-tujuan" data-animate="up"><span>03</span><div><h3>Tujuan maklumat digunakan</h3><p>Maklumat digunakan untuk menyediakan laman web dan halaman akaun terlindung; mengingati troli dan pilihan paparan setempat; menjawab soalan katalog; membalas pertanyaan; menyediakan sebut harga dan semakan keserasian; menjaga keselamatan dan kebolehpercayaan; mencegah penyalahgunaan; memenuhi kewajipan undang-undang; dan melindungi hak pengguna, I Vend Station atau pihak lain.</p><p>Pemberian maklumat adalah pilihan melainkan maklumat itu diperlukan untuk ciri yang anda minta. Tanpa daftar masuk ChatGPT, halaman akaun terlindung tidak dapat dibuka. Tanpa maklumat produk, lokasi dan hubungan yang mencukupi, I Vend Station mungkin tidak dapat menjawab pertanyaan atau menyediakan sebut harga yang sesuai.</p><p>Laman web ini tidak menjual data peribadi, menggunakannya untuk pengiklanan berdasarkan tingkah laku, membuat keputusan automatik penting tentang anda atau mengumpul butiran kad pembayaran.</p></div></article>

            <article id="ms-storan" data-animate="up"><span>04</span><div><h3>Storan setempat, suara dan kuki</h3><p>Troli sebut harga dan pilihan paparan menggunakan storan setempat pelayar. Data kekal sehingga anda memadamkannya, memadam data laman atau pelayar membuangnya. Penanda skrin pemuatan menggunakan storan sesi dan biasanya tamat bersama sesi pelayar. Anda boleh menggunakan kawalan pelayar untuk membuang item ini.</p><p>Mesej Ask IVS kekal dalam memori sehingga anda memulakan perbualan baharu, memuat semula atau meninggalkan halaman. Input suara bermula hanya apabila anda menekan mikrofon. Laman web I Vend Station tidak menyimpan rakaman suara, tetapi perkhidmatan pertuturan pelayar atau peranti anda mungkin memproses audio dan mungkin menggunakan internet tertakluk pada terma privasinya sendiri. Jawapan bersuara menggunakan ciri sintesis pertuturan pelayar.</p><p>Aplikasi ini tidak menetapkan kuki pengiklanan atau analitik. Daftar masuk ChatGPT serta perkhidmatan pengehosan atau keselamatan mungkin menggunakan kuki atau teknologi serupa yang diperlukan untuk menyediakan, mengesahkan atau melindungi perkhidmatan mereka.</p></div></article>

            <article id="ms-perkongsian" data-animate="up"><span>05</span><div><h3>Pihak yang mungkin menerima data dan pemindahan antarabangsa</h3><p>Bergantung pada ciri yang anda pilih, data mungkin diproses oleh penyedia pengehosan dan keselamatan laman web; penyedia daftar masuk ChatGPT; penyedia pertuturan pelayar atau peranti; WhatsApp, e-mel atau penyedia komunikasi lain yang anda pilih; penasihat profesional; atau pihak berkuasa awam jika pendedahan dibenarkan atau dikehendaki undang-undang.</p><p>Sesetengah penyedia mungkin memproses data di luar Malaysia. Terma privasi dan perlindungan mereka sendiri terpakai. I Vend Station tidak mengawal cara penyedia pertuturan pelayar, akaun ChatGPT, WhatsApp, penyedia e-mel, pemeroleh saudagar atau perkhidmatan pembayaran anda mengendalikan maklumat secara bebas.</p></div></article>

            <article id="ms-penyimpanan" data-animate="up"><span>06</span><div><h3>Tempoh penyimpanan, ketepatan dan keselamatan</h3><p>Data dalam peranti mengikut tempoh yang diterangkan di atas. Mesej Ask IVS dalam memori halaman tidak disimpan oleh pelayan I Vend Station. Komunikasi perniagaan disimpan hanya selama yang munasabah diperlukan untuk membalas, menyediakan atau menyokong sebut harga, menyelesaikan isu, menyimpan rekod yang perlu dan memenuhi kewajipan undang-undang.</p><p>I Vend Station menggunakan langkah organisasi dan teknikal yang munasabah mengikut kesesuaian maklumat dan laman web. Tiada penghantaran internet atau sistem storan yang boleh dijamin selamat sepenuhnya. Sila pastikan maklumat tepat dan jangan hantar kata laluan, butiran penuh kad pembayaran atau maklumat sensitif yang tidak diperlukan.</p></div></article>

            <article id="ms-hak" data-animate="up"><span>07</span><div><h3>Hak dan pilihan anda</h3><p>Tertakluk pada undang-undang Malaysia yang terpakai, anda boleh bertanya sama ada I Vend Station memegang data peribadi anda dan meminta akses, pembetulan, penarikan balik persetujuan, had pemprosesan, pemadaman jika berkenaan, atau pemberhentian pemasaran langsung. Anda juga boleh memadam troli dan pilihan setempat melalui kawalan laman web atau pelayar, memilih untuk tidak mendaftar masuk, menaip tanpa menggunakan suara dan menentukan maklumat yang disertakan dalam pertanyaan.</p><p>Permintaan mungkin dihadkan jika undang-undang membenarkan atau mewajibkan pemprosesan diteruskan. Jika anda percaya data peribadi telah disalahkendalikan, anda juga boleh menghubungi <a href="https://www.pdp.gov.my/ppdpv1/" target="_blank" rel="noreferrer">Pesuruhjaya Perlindungan Data Peribadi Malaysia</a>.</p></div></article>

            <article id="ms-hubungi" data-animate="up"><span>08</span><div><h3>Hubungi dan perubahan kepada notis ini</h3><p>Untuk pertanyaan atau permintaan privasi, lawati <a href="/#contact">bahagian Hubungi I Vend Station</a>. Nombor WhatsApp rasmi atau e-mel privasi perniagaan masih perlu dikonfigurasi; sehingga itu, laman web tidak menyediakan saluran permintaan privasi dalam talian yang aktif. Notis ini akan dikemas kini apabila saluran tersebut diaktifkan atau apabila amalan laman web berubah secara ketara.</p><p>Laman web ini ditujukan kepada pelanggan perniagaan dan tidak direka untuk mengumpul data peribadi kanak-kanak secara sedar. Jika anda percaya seorang kanak-kanak telah memberikan maklumat, hubungi I Vend Station apabila saluran rasmi tersedia.</p></div></article>
          </section>

          <aside className={styles.reviewNote} data-animate="up"><strong>Business owner action required</strong><p>Add the official legal business name, postal address, and active WhatsApp number or privacy email before relying on this notice for operational compliance. The policy should also be reviewed whenever new analytics, forms, payment services, or data-storage tools are introduced.</p></aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
