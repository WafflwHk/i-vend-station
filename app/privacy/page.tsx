import type { Metadata } from "next";
import SiteFooter from "../components/SiteFooter";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | I Vend Station",
  description: "Learn how I Vend Station handles account details, enquiries, device-local preferences, and voice-assistant features.",
};

const englishContents = [
  ["en-scope", "Scope"], ["en-data", "Data we handle"], ["en-use", "How we use data"], ["en-storage", "Device storage"],
  ["en-sharing", "Sharing and transfers"], ["en-retention", "Retention and security"], ["en-rights", "Your rights"], ["en-contact", "Contact"],
] as const;

const malayContents = [
  ["ms-skop", "Skop"], ["ms-data", "Data yang dikendalikan"], ["ms-tujuan", "Cara data digunakan"], ["ms-storan", "Storan peranti"],
  ["ms-perkongsian", "Perkongsian dan pemindahan"], ["ms-penyimpanan", "Penyimpanan dan keselamatan"], ["ms-hak", "Hak anda"], ["ms-hubungi", "Hubungi"],
] as const;

const chineseContents = [
  ["zh-scope", "范围"], ["zh-data", "我们处理的数据"], ["zh-use", "我们如何使用数据"], ["zh-storage", "设备存储"],
  ["zh-sharing", "共享与传输"], ["zh-retention", "保留与安全"], ["zh-rights", "您的权利"], ["zh-contact", "联系我们"],
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
          <div><span>Effective</span><time dateTime="2026-08-22">22 August 2026</time></div>
          <div><span>Applies to</span><strong>This website and its account, appearance, and product-guide features</strong></div>
          <nav aria-label="Choose privacy policy language"><a href="#english">English</a><a href="#bahasa-malaysia" lang="ms">Bahasa Malaysia</a><a href="#simplified-chinese" lang="zh-Hans">简体中文</a></nav>
        </div>
      </section>

      <section className={styles.quickFacts} aria-label="Privacy highlights">
        <article data-animate="up"><span>01</span><h2>Your preferences stay local.</h2><p>Your System, Light, or Dark appearance choice is stored in your browser, not in an I Vend Station customer database.</p></article>
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
          <a className={styles.languageHeading} href="#simplified-chinese" lang="zh-Hans">简体中文通知</a>
          <nav aria-label="简体中文隐私政策目录" lang="zh-Hans">{chineseContents.map(([id, label], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav>
        </aside>

        <div className={styles.policyContent}>
          <section className={styles.languageSection} id="english" aria-labelledby="english-title">
            <header data-animate="up"><p>ENGLISH</p><h2 id="english-title">I Vend Station Privacy Policy</h2><p>I Vend Station operates this vending-machine catalogue website. This notice describes the website as it works on the effective date above. It does not cover payment or transaction data processed separately by a vending machine, T05 terminal, merchant acquirer, or payment provider.</p></header>

            <article id="en-scope" data-animate="up"><span>01</span><div><h3>Scope and sources</h3><p>We handle information that you choose to provide when you sign in, use website features, or contact the business. We may also receive limited technical information through the services that host and protect the website. Information may come directly from you, from ChatGPT sign-in, from your browser or device, or from a communication service you choose to use.</p></div></article>

            <article id="en-data" data-animate="up"><span>02</span><div><h3>Personal data and other information we handle</h3><ul>
              <li><strong>Account details:</strong> if you sign in with ChatGPT, the website receives a user identifier, email address, and, when available, your name. I Vend Station does not receive your ChatGPT password.</li>
              <li><strong>Enquiry details:</strong> if you contact the business outside this website, you may voluntarily provide your name, phone number, email, product type, location, requirements, message, or attachments.</li>
              <li><strong>Device-local preferences:</strong> the appearance control stores System, Light, or Dark. A session marker remembers that the loading screen has already appeared.</li>
              <li><strong>Product-guide content:</strong> questions typed into Ask IVS and its replies remain in the current page memory. They are not sent by this website to an external AI API.</li>
              <li><strong>Technical data:</strong> website hosting and security services may process request data such as IP address, browser or device type, requested page, date and time, referrer, and error or security events.</li>
            </ul></div></article>

            <article id="en-use" data-animate="up"><span>03</span><div><h3>Why we use information</h3><p>Information is used to provide the website and protected account page; remember your local appearance choice; answer catalogue questions; respond to enquiries; prepare quotations and compatibility checks; maintain security and reliability; prevent misuse; meet legal duties; and protect the rights of users, I Vend Station, or others.</p><p>Providing information is optional unless it is needed for a feature you request. Without ChatGPT sign-in, the protected account page cannot open. Without enough product, location, and contact information, I Vend Station may be unable to answer an enquiry or prepare a suitable quotation.</p><p>The website does not sell personal data, use it for behavioural advertising, make significant automated decisions about you, or collect payment-card details.</p></div></article>

            <article id="en-storage" data-animate="up"><span>04</span><div><h3>Local storage, voice, and cookies</h3><p>The appearance preference uses your browser&apos;s local storage. It remains until you clear it, clear site data, or your browser removes it. The loading-screen marker uses session storage and normally ends with the browser session. You can use browser controls to remove these items.</p><p>Ask IVS messages stay in memory until you start a new conversation, reload, or leave the page. Voice input starts only when you press the microphone. I Vend Station&apos;s website does not save voice recordings, but your browser or device speech service may process audio and may use the internet under its own privacy terms. Spoken replies use your browser&apos;s speech-synthesis feature.</p><p>The application does not set advertising or analytics cookies. ChatGPT sign-in and hosting or security services may use cookies or similar technologies that are necessary to provide, authenticate, or protect their services.</p></div></article>

            <article id="en-sharing" data-animate="up"><span>05</span><div><h3>Who may receive data and international transfers</h3><p>Depending on the feature you choose, data may be processed by website hosting and security providers; the ChatGPT sign-in provider; your browser or device speech provider; WhatsApp, email, or another communication provider you choose; professional advisers; or public authorities where disclosure is permitted or required by law.</p><p>Some providers may process data outside Malaysia. Their own privacy terms and safeguards apply to their services. I Vend Station does not control how your browser speech provider, ChatGPT account, WhatsApp, email provider, merchant acquirer, or payment service independently handles information.</p></div></article>

            <article id="en-retention" data-animate="up"><span>06</span><div><h3>Retention, accuracy, and security</h3><p>Device-local data follows the periods described above. Ask IVS page-memory messages are not retained by an I Vend Station server. Business communications are kept only for as long as reasonably needed to respond, prepare or support a quotation, resolve issues, maintain necessary records, and meet legal duties.</p><p>I Vend Station uses reasonable organisational and technical measures appropriate to the information and the website. No internet transmission or storage system can be guaranteed completely secure. Please keep information accurate and do not send passwords, full payment-card details, or unnecessary sensitive information.</p></div></article>

            <article id="en-rights" data-animate="up"><span>07</span><div><h3>Your rights and choices</h3><p>Subject to applicable Malaysian law, you may ask whether I Vend Station holds personal data about you and request access, correction, withdrawal of consent, limits on processing, deletion where applicable, or an end to direct marketing. You may also clear local preferences with this website&apos;s or your browser&apos;s controls, choose not to sign in, type instead of using voice, and decide what to include in an enquiry.</p><p>A request may be limited where law allows or requires continued processing. If you believe personal data has been mishandled, you may also contact Malaysia&apos;s <a href="https://www.pdp.gov.my/ppdpv1/en/" target="_blank" rel="noreferrer">Personal Data Protection Commissioner</a>.</p></div></article>

            <article id="en-contact" data-animate="up"><span>08</span><div><h3>Contact and changes to this policy</h3><p>For a privacy question or request, contact I Vend Station through its official WhatsApp number, <a href="https://wa.me/601133180812" target="_blank" rel="noopener noreferrer">+60 11-3318 0812</a>. WhatsApp independently processes information you send under its own privacy terms and may process it outside Malaysia. Please do not send passwords, full payment-card details, or unnecessary sensitive information. This policy will be updated when website practices materially change.</p><p>This website is intended for business customers and is not designed to knowingly collect children&apos;s personal data. If you believe a child has provided information, contact I Vend Station through the official WhatsApp channel above.</p></div></article>
          </section>

          <section className={styles.languageSection} id="bahasa-malaysia" lang="ms" aria-labelledby="malay-title">
            <header data-animate="up"><p>BAHASA MALAYSIA</p><h2 id="malay-title">Notis Privasi I Vend Station</h2><p>I Vend Station mengendalikan laman web katalog mesin layan diri ini. Notis ini menerangkan cara laman web berfungsi pada tarikh kuat kuasa di atas. Notis ini tidak meliputi data pembayaran atau transaksi yang diproses secara berasingan oleh mesin layan diri, terminal T05, pemeroleh saudagar atau penyedia pembayaran.</p></header>

            <article id="ms-skop" data-animate="up"><span>01</span><div><h3>Skop dan sumber</h3><p>Kami mengendalikan maklumat yang anda pilih untuk berikan apabila anda mendaftar masuk, menggunakan ciri laman web atau menghubungi perniagaan. Kami juga mungkin menerima maklumat teknikal terhad melalui perkhidmatan yang mengehos dan melindungi laman web. Maklumat boleh diperoleh terus daripada anda, melalui daftar masuk ChatGPT, pelayar atau peranti anda, atau perkhidmatan komunikasi yang anda pilih.</p></div></article>

            <article id="ms-data" data-animate="up"><span>02</span><div><h3>Data peribadi dan maklumat lain yang kami kendalikan</h3><ul>
              <li><strong>Butiran akaun:</strong> jika anda mendaftar masuk dengan ChatGPT, laman web menerima pengenal pengguna, alamat e-mel dan, jika tersedia, nama anda. I Vend Station tidak menerima kata laluan ChatGPT anda.</li>
              <li><strong>Butiran pertanyaan:</strong> jika anda menghubungi perniagaan di luar laman web ini, anda boleh memberikan nama, nombor telefon, e-mel, jenis produk, lokasi, keperluan, mesej atau lampiran secara sukarela.</li>
              <li><strong>Pilihan dalam peranti:</strong> kawalan paparan menyimpan pilihan Sistem, Cerah atau Gelap. Penanda sesi mengingati bahawa skrin pemuatan telah dipaparkan.</li>
              <li><strong>Kandungan panduan produk:</strong> soalan yang ditaip dalam Ask IVS dan jawapannya kekal dalam memori halaman semasa. Laman web ini tidak menghantarnya kepada API AI luaran.</li>
              <li><strong>Data teknikal:</strong> perkhidmatan pengehosan dan keselamatan mungkin memproses data permintaan seperti alamat IP, jenis pelayar atau peranti, halaman yang diminta, tarikh dan masa, perujuk, serta peristiwa ralat atau keselamatan.</li>
            </ul></div></article>

            <article id="ms-tujuan" data-animate="up"><span>03</span><div><h3>Tujuan maklumat digunakan</h3><p>Maklumat digunakan untuk menyediakan laman web dan halaman akaun terlindung; mengingati pilihan paparan setempat; menjawab soalan katalog; membalas pertanyaan; menyediakan sebut harga dan semakan keserasian; menjaga keselamatan dan kebolehpercayaan; mencegah penyalahgunaan; memenuhi kewajipan undang-undang; dan melindungi hak pengguna, I Vend Station atau pihak lain.</p><p>Pemberian maklumat adalah pilihan melainkan maklumat itu diperlukan untuk ciri yang anda minta. Tanpa daftar masuk ChatGPT, halaman akaun terlindung tidak dapat dibuka. Tanpa maklumat produk, lokasi dan hubungan yang mencukupi, I Vend Station mungkin tidak dapat menjawab pertanyaan atau menyediakan sebut harga yang sesuai.</p><p>Laman web ini tidak menjual data peribadi, menggunakannya untuk pengiklanan berdasarkan tingkah laku, membuat keputusan automatik penting tentang anda atau mengumpul butiran kad pembayaran.</p></div></article>

            <article id="ms-storan" data-animate="up"><span>04</span><div><h3>Storan setempat, suara dan kuki</h3><p>Pilihan paparan menggunakan storan setempat pelayar. Data ini kekal sehingga anda memadamkannya, memadam data laman atau pelayar membuangnya. Penanda skrin pemuatan menggunakan storan sesi dan biasanya tamat bersama sesi pelayar. Anda boleh menggunakan kawalan pelayar untuk membuang item ini.</p><p>Mesej Ask IVS kekal dalam memori sehingga anda memulakan perbualan baharu, memuat semula atau meninggalkan halaman. Input suara bermula hanya apabila anda menekan mikrofon. Laman web I Vend Station tidak menyimpan rakaman suara, tetapi perkhidmatan pertuturan pelayar atau peranti anda mungkin memproses audio dan mungkin menggunakan internet tertakluk pada terma privasinya sendiri. Jawapan bersuara menggunakan ciri sintesis pertuturan pelayar.</p><p>Aplikasi ini tidak menetapkan kuki pengiklanan atau analitik. Daftar masuk ChatGPT serta perkhidmatan pengehosan atau keselamatan mungkin menggunakan kuki atau teknologi serupa yang diperlukan untuk menyediakan, mengesahkan atau melindungi perkhidmatan mereka.</p></div></article>

            <article id="ms-perkongsian" data-animate="up"><span>05</span><div><h3>Pihak yang mungkin menerima data dan pemindahan antarabangsa</h3><p>Bergantung pada ciri yang anda pilih, data mungkin diproses oleh penyedia pengehosan dan keselamatan laman web; penyedia daftar masuk ChatGPT; penyedia pertuturan pelayar atau peranti; WhatsApp, e-mel atau penyedia komunikasi lain yang anda pilih; penasihat profesional; atau pihak berkuasa awam jika pendedahan dibenarkan atau dikehendaki undang-undang.</p><p>Sesetengah penyedia mungkin memproses data di luar Malaysia. Terma privasi dan perlindungan mereka sendiri terpakai. I Vend Station tidak mengawal cara penyedia pertuturan pelayar, akaun ChatGPT, WhatsApp, penyedia e-mel, pemeroleh saudagar atau perkhidmatan pembayaran anda mengendalikan maklumat secara bebas.</p></div></article>

            <article id="ms-penyimpanan" data-animate="up"><span>06</span><div><h3>Tempoh penyimpanan, ketepatan dan keselamatan</h3><p>Data dalam peranti mengikut tempoh yang diterangkan di atas. Mesej Ask IVS dalam memori halaman tidak disimpan oleh pelayan I Vend Station. Komunikasi perniagaan disimpan hanya selama yang munasabah diperlukan untuk membalas, menyediakan atau menyokong sebut harga, menyelesaikan isu, menyimpan rekod yang perlu dan memenuhi kewajipan undang-undang.</p><p>I Vend Station menggunakan langkah organisasi dan teknikal yang munasabah mengikut kesesuaian maklumat dan laman web. Tiada penghantaran internet atau sistem storan yang boleh dijamin selamat sepenuhnya. Sila pastikan maklumat tepat dan jangan hantar kata laluan, butiran penuh kad pembayaran atau maklumat sensitif yang tidak diperlukan.</p></div></article>

            <article id="ms-hak" data-animate="up"><span>07</span><div><h3>Hak dan pilihan anda</h3><p>Tertakluk pada undang-undang Malaysia yang terpakai, anda boleh bertanya sama ada I Vend Station memegang data peribadi anda dan meminta akses, pembetulan, penarikan balik persetujuan, had pemprosesan, pemadaman jika berkenaan, atau pemberhentian pemasaran langsung. Anda juga boleh memadam pilihan setempat melalui kawalan laman web atau pelayar, memilih untuk tidak mendaftar masuk, menaip tanpa menggunakan suara dan menentukan maklumat yang disertakan dalam pertanyaan.</p><p>Permintaan mungkin dihadkan jika undang-undang membenarkan atau mewajibkan pemprosesan diteruskan. Jika anda percaya data peribadi telah disalahkendalikan, anda juga boleh menghubungi <a href="https://www.pdp.gov.my/ppdpv1/" target="_blank" rel="noreferrer">Pesuruhjaya Perlindungan Data Peribadi Malaysia</a>.</p></div></article>

            <article id="ms-hubungi" data-animate="up"><span>08</span><div><h3>Hubungi dan perubahan kepada notis ini</h3><p>Untuk pertanyaan atau permintaan privasi, hubungi I Vend Station melalui nombor WhatsApp rasmi, <a href="https://wa.me/601133180812" target="_blank" rel="noopener noreferrer">+60 11-3318 0812</a>. WhatsApp memproses maklumat yang anda hantar secara bebas, tertakluk pada terma privasinya sendiri, dan mungkin memprosesnya di luar Malaysia. Jangan hantar kata laluan, butiran penuh kad pembayaran atau maklumat sensitif yang tidak diperlukan. Notis ini akan dikemas kini apabila amalan laman web berubah secara ketara.</p><p>Laman web ini ditujukan kepada pelanggan perniagaan dan tidak direka untuk mengumpul data peribadi kanak-kanak secara sedar. Jika anda percaya seorang kanak-kanak telah memberikan maklumat, hubungi I Vend Station melalui saluran WhatsApp rasmi di atas.</p></div></article>
          </section>

          <section className={styles.languageSection} id="simplified-chinese" lang="zh-Hans" aria-labelledby="chinese-title">
            <header data-animate="up"><p>简体中文</p><h2 id="chinese-title">I Vend Station 隐私政策</h2><p>I Vend Station 经营本自动贩卖机产品目录网站。本通知说明本网站截至上述生效日期的运作方式。本通知不涵盖由自动贩卖机、T05 终端、商户收单机构或付款服务提供商另行处理的付款或交易数据。</p></header>

            <article id="zh-scope" data-animate="up"><span>01</span><div><h3>范围和信息来源</h3><p>我们会处理您在登录、使用网站功能或联系本企业时选择提供的信息。我们也可能通过托管和保护本网站的服务接收有限的技术信息。信息可能直接来自您、ChatGPT 登录服务、您的浏览器或设备，或您选择使用的通信服务。</p></div></article>

            <article id="zh-data" data-animate="up"><span>02</span><div><h3>我们处理的个人数据和其他信息</h3><ul>
              <li><strong>账户资料：</strong>如果您使用 ChatGPT 登录，本网站会收到用户识别码、电邮地址，以及在可用情况下收到您的姓名。I Vend Station 不会收到您的 ChatGPT 密码。</li>
              <li><strong>咨询资料：</strong>如果您通过本网站以外的方式联系本企业，您可以自愿提供姓名、电话号码、电邮地址、产品类型、地点、要求、消息或附件。</li>
              <li><strong>设备本地选项：</strong>外观控制会存储“跟随系统”、“浅色”或“深色”选项。会话标记会记住加载画面已经显示过。</li>
              <li><strong>产品指南内容：</strong>在 Ask IVS 中输入的问题及其回复会保留在当前页面的内存中。本网站不会将这些内容发送至外部 AI API。</li>
              <li><strong>技术数据：</strong>网站托管和安全服务可能会处理请求数据，例如 IP 地址、浏览器或设备类型、所请求的页面、日期和时间、来源页面，以及错误或安全事件。</li>
            </ul></div></article>

            <article id="zh-use" data-animate="up"><span>03</span><div><h3>我们为何使用这些信息</h3><p>这些信息用于提供本网站和受保护的账户页面；记住您的本地外观选择；回答产品目录问题；回复咨询；准备报价和兼容性检查；维护安全性和可靠性；防止滥用；履行法律义务；以及保护用户、I Vend Station 或其他人的权利。</p><p>除非您所请求的功能需要相关信息，否则提供信息是自愿的。如果不使用 ChatGPT 登录，受保护的账户页面将无法打开。如果没有足够的产品、地点和联系信息，I Vend Station 可能无法回复咨询或准备合适的报价。</p><p>本网站不会出售个人数据、将其用于行为定向广告、对您作出具有重大影响的自动化决定，或收集完整的付款卡资料。</p></div></article>

            <article id="zh-storage" data-animate="up"><span>04</span><div><h3>本地存储、语音和 Cookie</h3><p>外观偏好使用您浏览器的本地存储。这些数据会一直保留，直到您将其清除、清除网站数据，或浏览器将其移除。加载画面标记使用会话存储，通常会在浏览器会话结束时终止。您可以使用浏览器控制项移除这些数据。</p><p>Ask IVS 消息会保留在页面内存中，直到您开始新对话、重新加载页面或离开页面。只有当您按下麦克风按钮时，语音输入才会启动。I Vend Station 网站不会保存语音录音，但您的浏览器或设备语音服务可能会处理音频，并可能根据其自身的隐私条款使用互联网。语音回复使用您浏览器的语音合成功能。</p><p>本应用不会设置广告或分析 Cookie。ChatGPT 登录服务以及托管或安全服务可能会使用提供、验证或保护其服务所必需的 Cookie 或类似技术。</p></div></article>

            <article id="zh-sharing" data-animate="up"><span>05</span><div><h3>谁可能接收数据及个人数据跨境传输</h3><p>视您选择的功能而定，数据可能由以下各方处理：网站托管和安全服务提供商；ChatGPT 登录服务提供商；您的浏览器或设备语音服务提供商；您选择使用的 WhatsApp、电邮或其他通信服务提供商；专业顾问；或在法律允许或要求披露时的公共机关。</p><p>部分服务提供商可能会在马来西亚境外处理数据，其服务适用其自身的隐私条款和保障措施。I Vend Station 无法控制您的浏览器语音服务提供商、ChatGPT 账户、WhatsApp、电邮服务提供商、商户收单机构或付款服务如何独立处理信息。</p></div></article>

            <article id="zh-retention" data-animate="up"><span>06</span><div><h3>保留期限、准确性和安全</h3><p>设备本地数据的保留期限如上所述。Ask IVS 页面内存中的消息不会由 I Vend Station 服务器保留。业务通信只会在合理所需的期限内保留，以便回复咨询、准备或支持报价、解决问题、保存必要记录及履行法律义务。</p><p>I Vend Station 会根据相关信息和网站的性质，采取合理的组织和技术措施。任何互联网传输或存储系统都无法保证绝对安全。请确保您提供的信息准确，并且不要发送密码、完整的付款卡资料或不必要的敏感信息。</p></div></article>

            <article id="zh-rights" data-animate="up"><span>07</span><div><h3>您的权利和选择</h3><p>在适用的马来西亚法律约束下，您可以询问 I Vend Station 是否持有您的个人数据，并可请求查阅、更正、撤回同意、限制处理、在适用情况下删除数据，或停止直接营销。您也可以使用本网站或浏览器的控制项清除本地偏好设置；选择不登录；选择输入文字而不使用语音；以及自行决定在咨询中提供哪些信息。</p><p>如果法律允许或要求继续处理，您的请求可能会受到限制。如果您认为个人数据遭到不当处理，也可以联系<a href="https://www.pdp.gov.my/ppdpv1/" target="_blank" rel="noreferrer">马来西亚个人数据保护专员（Personal Data Protection Commissioner）</a>。</p></div></article>

            <article id="zh-contact" data-animate="up"><span>08</span><div><h3>联系我们及本政策的变更</h3><p>如有隐私问题或请求，请通过 I Vend Station 的官方 WhatsApp 号码 <a href="https://wa.me/601133180812" target="_blank" rel="noopener noreferrer">+60 11-3318 0812</a> 联系我们。WhatsApp 会根据其自身的隐私条款独立处理您发送的信息，并可能在马来西亚境外处理这些信息。请不要发送密码、完整的付款卡资料或不必要的敏感信息。本政策将在本网站的处理方式发生重大变化时更新。</p><p>本网站面向企业客户，并非设计用于在知情情况下收集儿童的个人数据。如果您认为儿童已经提供了信息，请通过上述官方 WhatsApp 渠道联系 I Vend Station。</p></div></article>
          </section>

          <aside className={styles.reviewNote} data-animate="up"><strong>Business owner action required</strong><p>Add the official legal business name, postal address, privacy contact person and designation, and, when available, a dedicated privacy email before relying on this notice for operational compliance. The policy should also be reviewed whenever new analytics, forms, payment services, or data-storage tools are introduced.</p></aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
