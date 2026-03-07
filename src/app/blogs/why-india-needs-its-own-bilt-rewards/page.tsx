import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/why-india-needs-its-own-bilt-rewards/real-estate.png";
import { RelatedPosts } from "@/components/related-posts";
import { BiltMarketComparisonChart } from "@/components/bilt-market-comparison-chart";
import { BiltGrowthChart } from "@/components/bilt-growth-chart";
import { BiltRevenueFlowChart } from "@/components/bilt-revenue-flow-chart";

export const metadata: Metadata = {
  title: "Why India Needs Its Own Bilt Rewards, And Why It Could Be Even Bigger",
  description: "How Bilt Rewards turned rent into a wealth-building tool in the US, why the same opportunity exists in India with UPI and a $170 billion rental market, and what the regulatory landscape means for anyone building in this space.",
  keywords: ["bilt rewards", "india fintech", "rent rewards", "UPI", "credit card india", "rental market india", "CRED", "RBI regulations", "proptech india", "housing society", "co-branded credit card", "rent credit score"],
  openGraph: {
    title: "Why India Needs Its Own Bilt Rewards, And Why It Could Be Even Bigger",
    description: "How Bilt Rewards turned rent into a wealth-building tool in the US, why the same opportunity exists in India with UPI and a $170 billion rental market, and what the regulatory landscape means for anyone building in this space.",
    type: "article",
    publishedTime: "2026-03-07",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why India Needs Its Own Bilt Rewards",
    description: "How Bilt Rewards turned rent into a wealth-building tool in the US, and why the same opportunity exists in India with UPI and a $170 billion rental market.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Why India Needs Its Own Bilt Rewards, And Why It Could Be Even Bigger
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-03-07">Mar 7, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>18 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Silhouette of a person sitting with a coffee cup looking out at a city skyline of apartment buildings"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Disclaimer: This post reflects my personal research and analysis. I have no affiliation with Bilt Rewards, CRED, or any company mentioned here. The opinions are entirely my own, and the market data cited is sourced from publicly available reports. This is not investment advice.
        </p>

        <hr />

        <p>
          I came across <a href="https://www.bilt.com/" target="_blank" rel="noopener noreferrer">Bilt Rewards</a> recently and thought it was a genuinely clever idea. They took the single largest monthly expense most people have, rent, and turned it into a wealth-building tool. No new spending. No lifestyle change. Just rewarding people for money they&apos;re already paying.
        </p>

        <p>
          In four years, the company hit a <a href="https://newsroom.biltrewards.com/bilt-raises-250-million-at-over-10-billion-valuation" target="_blank" rel="noopener noreferrer">$10.75 billion valuation</a>. That got me wondering: <strong>why doesn&apos;t something like this exist in India?</strong>
        </p>

        <p>
          So I spent some time looking into it. The opportunity in India might actually be bigger, but it comes with a unique set of regulatory hurdles that make a straight copy-paste impossible. Someone would need to think about this differently, and that&apos;s what makes it interesting.
        </p>

        <p>Here&apos;s what I found.</p>

        <h2>What Bilt Actually Does</h2>

        <p>
          Bilt Rewards was founded by <a href="https://en.wikipedia.org/wiki/Ankur_Jain" target="_blank" rel="noopener noreferrer">Ankur Jain</a> in 2021 with a simple observation: rent is most people&apos;s biggest monthly expense, yet it earns zero rewards, builds zero credit, and does nothing toward future homeownership.
        </p>

        <p>
          Bilt changed that by building a loyalty platform and a <a href="https://newsroom.mastercard.com/news/press/2021/june/bilt-rewards-and-mastercard-team-up-to-launch-the-bilt-mastercard/" target="_blank" rel="noopener noreferrer">co-branded Mastercard</a> that lets renters earn points on every rent payment with no fees for either the tenant or the landlord. Those points can be transferred 1:1 to over 100 airline and hotel partners, used on Amazon, spent at local merchants, or even put toward a down payment on a home. On top of that, every on-time rent payment is reported to credit bureaus, helping renters build their credit score passively.
        </p>

        <p>
          The clever part isn&apos;t any single feature. It&apos;s the flywheel. Renters get rewards, so they stay on the platform. Landlords get better tenant retention, so they sign up. Merchants get foot traffic from the rewards network, so they pay commissions. And Bilt sits in the middle, earning from all sides.
        </p>

        <p>
          <strong>How they make money:</strong> Bilt charges property managers 0.6-0.9% on rent payments processed through the platform. They earn 1.5-2% commissions from their network of 40,000+ neighbourhood merchants. They collect fees from property managers for tenant engagement and lease renewal tools. And they earn interchange revenue from the co-branded Mastercard. None of this comes from the renter&apos;s pocket.
        </p>

        <p>
          <strong>The numbers are hard to ignore.</strong> Revenue hit roughly $400M annualized in Q1 2025, up from $275M in 2024 and $116M in 2023. They&apos;ve raised <a href="https://newsroom.biltrewards.com/bilt-raises-250-million-at-over-10-billion-valuation" target="_blank" rel="noopener noreferrer">$958M in total funding</a> and are targeting $1B+ in annual revenue by Q1 2026. Their network covers 1 in 4 US apartment buildings and 70% of the top 100 property managers, with over 5 million members.
        </p>

        <BiltGrowthChart />

        <p>
          They&apos;ve built a real revenue engine on top of a spending category that nobody was monetizing before.
        </p>

        <h2>Why This Could Work in India</h2>

        <p>
          India isn&apos;t just a &ldquo;similar market.&rdquo; In several ways, the structural opportunity here is larger. But the regulatory and market landscape demands a fundamentally different approach. A straight copy of Bilt won&apos;t work. The person who adapts the model for Indian conditions could build something massive.
        </p>

        <h3>India&apos;s rental market is enormous</h3>

        <p>
          India&apos;s rental housing market was valued at <strong>$20.31 billion in 2024</strong> and is projected to reach $26.78 billion by 2030. About <a href="https://www.aurumproptech.in/blog/USD-20-Billion-India-Residential-Rental-Real-Estate-Sector" target="_blank" rel="noopener noreferrer">28% of urban Indian households rent</a>, and in cities like Bangalore, Hyderabad, and Chennai, that number is closer to 40-46%. With 486 million people living in urban India and that number growing every year through migration, the renter population is massive and expanding.
        </p>

        <p>
          Rents in metro cities have been climbing <a href="https://www.cribapp.com/resources/average-rent-india" target="_blank" rel="noopener noreferrer">7-9% annually</a>, well above the overall inflation rate of around 3%. A 2BHK in Mumbai or Delhi already costs Rs 50,000-60,000/month. Even in Tier-2 cities, Rs 10,000-20,000 is standard.
        </p>

        <p>
          If you conservatively estimate 80 million urban renter households paying an average of Rs 15,000/month, that&apos;s roughly <strong>Rs 14 lakh crore (around $170 billion) in annual rent payments</strong>. Nobody is building a dedicated rewards layer on top of this.
        </p>

        <BiltMarketComparisonChart />

        <h3>UPI gives India a head start that the US never had</h3>

        <p>
          In the US, Bilt had to solve a genuinely hard infrastructure problem. American landlords don&apos;t accept credit cards for rent because the processing fees eat into their margins. Bilt and Mastercard spent years and hundreds of millions of dollars engineering a custom payment solution called BiltProtect, using open banking tools from Transactis and Finicity (both Mastercard companies), just to make rent payments via card possible.
        </p>

        <p>
          India doesn&apos;t have that problem. UPI already handles everything. It processed <a href="https://coinlaw.io/upi-statistics/" target="_blank" rel="noopener noreferrer">228.3 billion transactions in 2025</a>, up from 172.2 billion in 2024. In October 2024 alone, it hit 16.58 billion transactions in a single month. The digital payments market is valued at $6.83 billion and projected to reach $33.5 billion by 2034.
        </p>

        <p>
          Millions of tenants already pay their landlords through Google Pay, PhonePe, or direct UPI transfers every month. The payment rail is already there. What&apos;s missing is the rewards and loyalty layer on top of it. That&apos;s the gap.
        </p>

        <h3>The credit card market is growing fast with huge headroom</h3>

        <p>
          India had <a href="https://gokiwi.in/blog/credit-card-usage-in-india-2025-trends-and-consumer-behaviour/" target="_blank" rel="noopener noreferrer">114.9 million credit cards</a> in circulation as of November 2025, doubled from 54 million in 2019. Credit card payments are projected to <a href="https://www.ibef.org/news/india-credit-charge-card-payment-market-to-cross-rs-25-91-700-crore-us-300-billion-in-2025-report" target="_blank" rel="noopener noreferrer">cross $300 billion in 2025</a>, growing 27% year over year. <a href="https://gokiwi.in/blog/credit-card-trends-in-india/" target="_blank" rel="noopener noreferrer">Co-branded cards are growing at 35-40% annually</a> and are projected to capture 25% of the market by 2028.
        </p>

        <p>
          But here&apos;s the key part: credit card penetration in India is still just 5-6%, compared to over 65% in the US. That&apos;s massive headroom. A compelling new product like a rent rewards card could capture outsized share in a market that&apos;s still early in its growth curve.
        </p>

        <h3>Nobody owns the &ldquo;housing loyalty&rdquo; category</h3>

        <p>
          India&apos;s loyalty programs market is valued at <a href="https://www.globenewswire.com/news-release/2024/10/11/2961861/28124/en/India-Loyalty-Programs-Market-and-Future-Growth-Dynamics-Report-2024.html" target="_blank" rel="noopener noreferrer"><strong>$3.8 billion</strong></a> and projected to reach $17.1 billion by 2035, growing at 16.1% annually. But the major players today are all in e-commerce: Amazon Prime, Flipkart Plus, Paytm First.
        </p>

        <p>
          There&apos;s no platform where your largest monthly expense, rent, earns you anything. That&apos;s a category waiting to be created.
        </p>

        <h3>India&apos;s digital public infrastructure makes this cheaper to build</h3>

        <p>
          India has something the US doesn&apos;t: a world-class stack of public digital infrastructure purpose-built for fintech. Aadhaar handles instant identity verification. UPI handles payments. CIBIL handles credit reporting. DigiLocker handles document verification. These public rails would let a startup build in months what took Bilt years and hundreds of millions of dollars to create using private infrastructure in the US.
        </p>

        <h3>Homeownership is a deeper motivation in India</h3>

        <p>
          In the US, Bilt&apos;s &ldquo;use your points toward a home down payment&rdquo; feature is a nice perk. In India, it would hit differently. Owning a home isn&apos;t just a financial decision here. It&apos;s a deeply cultural and family milestone. When average home prices in metros are 8-12x annual income, a platform that turns monthly rent into a visible, accumulating path toward a down payment taps into one of the strongest consumer motivations in the country.
        </p>

        <h2>&ldquo;But What About CRED?&rdquo;</h2>

        <p>
          This is the first question anyone asks, and it&apos;s a fair one. CRED is a well-built product and has done a great job of making credit card management seamless for millions of Indians. But what Bilt does and what CRED does are fundamentally different things.
        </p>

        <p>
          CRED is a credit card bill payment and rewards app. Rent payment was one of many features it offered alongside utility payments, travel bookings, and a commerce store. It was never the central product, and that&apos;s fine, because CRED was designed to solve a different problem.
        </p>

        <p>
          A Bilt-style platform would be built from the ground up around rent. Every product decision, from the credit card design to the loyalty program to the merchant network to the property manager tools, would flow from the idea that rent is an undermonetized category. There&apos;s a real difference between a feature inside a platform and a company whose entire identity revolves around one category. YouTube and Google Video, Slack and Microsoft Teams&apos; chat feature: these comparisons come up often for a reason. Focused products tend to outperform bolted-on features.
        </p>

        <p>
          There&apos;s also the fee structure question. CRED&apos;s rent payment service <a href="https://www.cardexpert.in/cred-rentpay-review-paying-rent-has-never-been-this-easy-rewarding/" target="_blank" rel="noopener noreferrer">charged 1-1.5% convenience fees</a> on transactions, which is reasonable for the service it provided. But a rent-first platform could take a different approach entirely. Bilt charges zero fees to both tenants and landlords and monetizes through property manager tools, merchant commissions, and card interchange instead. That&apos;s a structurally different value proposition for the renter.
        </p>

        <p>
          And then there&apos;s the regulatory reality. In September 2025, the RBI effectively stopped credit card rent payments through fintech apps. <a href="https://www.business-standard.com/finance/personal-finance/phonepe-paytm-cred-end-rent-service-as-rbi-tightens-payment-rules-125091800422_1.html" target="_blank" rel="noopener noreferrer">CRED, PhonePe, Paytm, and Amazon Pay all suspended this service</a> in compliance with the new rules. The old model of routing credit card payments to landlords through a third-party app is no longer viable. Anyone who wants to play in this space now needs to build something architecturally different, with proper bank partnerships and regulatory compliance baked in from day one. That&apos;s a harder problem to solve, but it also means whoever solves it has a real moat.
        </p>

        <h2>The Regulatory Landscape</h2>

        <p>
          This is where it gets real. India&apos;s regulatory environment around payments and lending has evolved significantly in 2025, and anyone building in this space needs to understand these rules and design around them rather than fight them.
        </p>

        <h3>RBI Payment Aggregator Directions (September 2025)</h3>

        <p>
          This is the big one. The <a href="https://www.medianama.com/2025/09/223-rbi-pa-rules-phonepe-paytm-cred-credit-card-rent-payments/" target="_blank" rel="noopener noreferrer">RBI&apos;s updated Master Direction on Payment Aggregators</a> fundamentally changed how rent payments can be processed. Payment aggregators can now only process transactions for merchants with whom they have a direct, KYC-verified contract. Individual landlords don&apos;t qualify as merchants under these rules.
        </p>

        <p>
          The directive also sets a <a href="https://c4scourses.in/banking-finance/rbis-new-master-direction-on-payment-aggregators-2025/" target="_blank" rel="noopener noreferrer">minimum net worth requirement of Rs 15 crore</a> at the time of application, rising to Rs 25 crore within three years. Full KYC and due diligence is required for all payment recipients, including identity verification and sometimes physical verification. All payment data must be stored within India.
        </p>

        <p>
          What this means in practice: you can&apos;t simply build a payment aggregator that routes credit card payments to landlords. The architecture has to be fundamentally different. The compliant path is through direct bank partnerships.
        </p>

        <h3>RBI Digital Lending Directions (May 2025)</h3>

        <p>
          The <a href="https://www.lawrbit.com/article/reserve-bank-of-india-digital-lending-directions-2025/" target="_blank" rel="noopener noreferrer">Digital Lending Directions</a> are relevant if the platform offers any credit-adjacent products like BNPL for rent or security deposit financing. All loan disbursals must go directly to the borrower&apos;s bank account. There&apos;s a mandatory cooling-off period where borrowers can exit without penalties. Data collection must be purpose-specific, consent-based, and minimal. Platforms need dedicated grievance redressal officers.
        </p>

        <h3>RBI Credit Card Rules 2025-26</h3>

        <p>
          <a href="https://www.airtel.in/blog/credit-card/rbi-credit-card-guidelines-2025-what-changes-for-you/" target="_blank" rel="noopener noreferrer">Updated rules</a> now require credit card payments through third-party apps to go through the Bharat Bill Payment System (BBPS). Banks that haven&apos;t integrated with BBPS can&apos;t process these payments. Co-branded card partnerships are also under tighter regulation, with the issuing bank required to own the balance-sheet risk.
        </p>

        <h3>Credit Bureau Reporting</h3>

        <p>
          The RBI introduced <a href="https://www.godrejcapital.com/media-blog/knowledge-centre/what-are-the-5-new-rules-introduced-by-the-rbi-for-cibil-scores" target="_blank" rel="noopener noreferrer">updated credit reporting rules effective January 2025</a>. Lenders now have to update borrower data twice a month. Disputes must be resolved within 30 days. First-time borrowers can receive scores with less than six months of history.
        </p>

        <p>
          But here&apos;s the important gap: <strong>rent payments are still not reported to credit bureaus in India.</strong> There&apos;s no regulatory framework requiring it, and CIBIL doesn&apos;t factor rent into credit scores. A startup called <a href="https://rentenpe.com/" target="_blank" rel="noopener noreferrer">RentenPe</a> is trying to create a &ldquo;Rent Credit Score,&rdquo; but it&apos;s early-stage. This is one of the biggest white spaces in Indian fintech and could be the single most impactful feature a rent rewards platform offers.
        </p>

        <h3>Model Tenancy Act and Rent Agreement Rules</h3>

        <p>
          The central government approved the <a href="https://prsindia.org/billtrack/the-model-tenancy-act-2021" target="_blank" rel="noopener noreferrer">Model Tenancy Act in June 2021</a> to modernize the rental market. It mandates written rent agreements, caps security deposits at two months&apos; rent for residential properties, and sets up a three-tier dispute resolution system.
        </p>

        <p>
          The catch is that land is a state subject, so adoption is voluntary. As of 2025, <a href="https://www.drishtiias.com/daily-updates/daily-news-analysis/model-tenancy-act-2" target="_blank" rel="noopener noreferrer">only four states</a> have adopted it: Andhra Pradesh, Tamil Nadu, Uttar Pradesh, and Assam. Most major rental markets like Maharashtra, Karnataka, and Delhi haven&apos;t.
        </p>

        <p>
          On top of this, the government has pushed <a href="https://www.legalkart.com/legal-blog/new-rent-rules-2025-explained-online-registration-&-deposit-limits-made-simple" target="_blank" rel="noopener noreferrer">new rent agreement rules in 2025</a> that mandate digital registration of all rental agreements within 60 days, require e-stamping instead of traditional stamp paper, limit rent increases to once every 12 months with 90 days&apos; notice, and route disputes through Rent Tribunals for resolution within 30-60 days.
        </p>

        <p>
          This matters for a platform because mandatory digital registration creates a structured dataset of landlord-tenant relationships. A platform that helps people create, stamp, and register their rent agreements digitally naturally becomes the trusted place where rent payments and rewards live too.
        </p>

        <h2>How This Could Actually Work in India</h2>

        <p>
          Given the regulatory landscape, here&apos;s what I think a workable architecture looks like. It can&apos;t be a copy of Bilt and it can&apos;t work the way CRED&apos;s rent feature did. It needs to be something built for Indian regulations from the ground up.
        </p>

        <h3>Lead with UPI, not cards</h3>

        <p>
          This is where India&apos;s version would look fundamentally different from Bilt. In the US, Bilt had to spend years and hundreds of millions building custom payment infrastructure just to make rent payments via card possible. In India, UPI already does the hard part. Millions of tenants already pay landlords through UPI every single month. There&apos;s no behaviour to change, no infrastructure to build, no landlord to convince. The payment is already happening.
        </p>

        <p>
          The platform&apos;s job is to sit on top of this. When a tenant pays rent through the platform&apos;s UPI handle, the payment is verified as a rent transaction and reward points are triggered. No convenience fee, no credit card required, no friction. That&apos;s the primary channel, and it immediately gives the platform access to hundreds of millions of renters, not just the 115 million who have credit cards. This is the real UPI advantage: not just that the rail exists, but that it makes the core product accessible to nearly every urban renter from day one.
        </p>

        <h3>Add a co-branded credit card as the premium layer</h3>

        <p>
          On top of the UPI base, the platform can offer a co-branded credit card with a bank partner like HDFC, ICICI, SBI, or Kotak for users who want higher reward rates and credit-building benefits. The RBI&apos;s payment aggregator rules killed the old model where third-party apps routed credit card payments to landlords. But banks themselves can still process rent payments. So the card would be bank-issued, with rent payments processed through the bank&apos;s own infrastructure, and the startup providing the loyalty and rewards layer.
        </p>

        <p>
          This is similar to what Bilt did with Mastercard in the US. But unlike Bilt, which depends on the card as its primary product, the Indian version would have UPI as its foundation and the card as a premium upgrade. That&apos;s a stronger position because the platform isn&apos;t gated by credit card adoption.
        </p>

        <h3>Make rent build credit</h3>

        <p>
          This could be the single most powerful feature. Millions of young professionals in India pay Rs 20,000-50,000 a month in rent but have thin or nonexistent credit files because rent payments don&apos;t count toward credit scores. If a platform could verify on-time rent payments and partner with CIBIL or Experian India to report that data, it would help tenants build credit scores just by paying rent on time. In a country where getting your first credit card or home loan often feels like a chicken-and-egg problem, this alone could drive massive adoption.
        </p>

        <h3>Use housing societies as the distribution channel</h3>

        <p>
          In the US, Bilt goes through large property management companies that control millions of apartment units. India&apos;s rental market doesn&apos;t work that way. It&apos;s fragmented, with millions of individual landlords.
        </p>

        <p>
          But India has something the US doesn&apos;t: housing societies, formally known as Resident Welfare Associations (RWAs). Urban India is organized into apartment complexes with management committees that oversee 50 to 500+ units each. If you win over a society secretary or management committee, you onboard hundreds of tenants at once.
        </p>

        <p>
          The platform could offer these societies digital rent collection and maintenance fee management, compliance tools for rent agreement registration and e-stamping, visitor management, maintenance request tracking, and financial reporting for audits. Provide real value to the society, and tenant adoption follows naturally. It&apos;s a much more efficient go-to-market than trying to onboard individual landlords one by one.
        </p>

        <h3>The revenue model</h3>

        <BiltRevenueFlowChart />

        <p>Here&apos;s how the money actually flows, step by step.</p>

        <p>
          <strong>When a tenant pays rent through the platform&apos;s UPI handle</strong>, the platform verifies it as a rent transaction (using the linked rent agreement or housing society data), awards reward points to the tenant, and settles the payment to the landlord&apos;s account. The platform earns nothing directly from UPI transactions since UPI is zero-fee. Instead, the rent payment is the anchor that pulls the tenant into the ecosystem where other revenue streams kick in.
        </p>

        <p>
          <strong>The co-branded credit card generates interchange revenue.</strong> When a tenant uses the platform&apos;s co-branded card (issued by, say, HDFC or ICICI) to pay rent, the issuing bank earns interchange from the card network. A portion of this interchange is shared with the platform as the co-branding partner. This is the same model that Amazon-ICICI, Flipkart-Axis, and other co-branded cards in India already use. The bank handles compliance, underwriting, and balance-sheet risk. The platform brings the users and the rewards layer.
        </p>

        <p>
          <strong>Housing societies pay a SaaS fee.</strong> The platform offers society management committees a dashboard for digital rent collection, maintenance fee tracking, visitor management, compliance tools (rent agreement registration, e-stamping), and financial reporting for audits. This is priced at Rs 5-15 per unit per month. A 200-unit society paying Rs 10/unit is Rs 2,000/month, which is easy for any society to justify given the time it saves the treasurer and secretary. This is also the distribution engine: one society signs up, and 200 tenants are onboarded into the rewards ecosystem at once.
        </p>

        <p>
          <strong>Neighbourhood merchants pay commissions.</strong> The platform builds a local rewards network with groceries, pharmacies, restaurants, gyms, and service providers near each housing society. When a tenant uses their reward points or the co-branded card at a partner merchant, the merchant pays the platform a 1-2% commission. This is similar to how Bilt&apos;s merchant network works in the US, and it mirrors the Swiggy/Zomato restaurant commission model that Indian merchants are already familiar with.
        </p>

        <p>
          <strong>Financial product referrals generate lead fees.</strong> As the platform accumulates data on tenants (rent payment history, credit scores, income patterns), it&apos;s well positioned to refer them to partner banks for home loans, personal loans, and insurance. A tenant who has been paying Rs 30,000/month rent on time for three years is a qualified home loan lead. Banks typically pay Rs 2,000-10,000 per converted home loan lead. This revenue grows naturally as the user base ages on the platform.
        </p>

        <p>
          <strong>Rent agreement and compliance services.</strong> With the 2025 rules mandating digital registration and e-stamping of all rent agreements, there&apos;s a direct service fee opportunity. The platform charges Rs 200-500 per agreement for creating, digitally stamping, and registering rent agreements. It&apos;s a small fee that tenants and landlords are happy to pay for convenience, and it locks the landlord-tenant relationship into the platform&apos;s ecosystem.
        </p>

        <p>
          <strong>Data and analytics.</strong> Over time, the platform would sit on valuable data about rental patterns, tenant spending behaviour, and neighbourhood commerce trends. Some might see this as a revenue stream by selling anonymized insights to real estate developers, FMCG companies, or retailers. Personally, I think user data should be protected and used only to improve the platform&apos;s own service, not sold to third parties. Trust is everything for a product that handles people&apos;s rent and financial information, and monetizing their data is a quick way to lose that trust.
        </p>

        <h3>A rough estimate of the opportunity</h3>

        <p>
          Here&apos;s some basic math: if the platform reaches 5 million active renters within three years (a modest target given that NoBroker alone has over 80 lakh users), with an average monthly rent of Rs 18,000, that&apos;s roughly Rs 1.08 lakh crore (about $13 billion) in annual rent processed. At a blended take rate of 0.5%, that&apos;s around Rs 540 crore ($65M) from rent processing alone. Add in SaaS fees, merchant commissions, and financial product referrals, and the annual revenue potential is in the range of Rs 1,500-2,000 crore ($180-240M).
        </p>

        <p>
          For context, Bilt hit $400M revenue with 5 million members processing $45B in rent. India has a much larger renter population and lower per-unit revenue, but the unit economics can still work given India&apos;s lower operational costs and the fact that UPI removes much of the payment infrastructure expense.
        </p>

        <h2>Risks Worth Acknowledging</h2>

        <p>No analysis is complete without being honest about what could go wrong.</p>

        <p>
          <strong>Regulatory unpredictability</strong> is the biggest risk. The RBI reshaped the payments landscape overnight in September 2025, and it could do so again. Any platform in this space needs to be built with regulatory flexibility as a core principle, not an afterthought.
        </p>

        <p>
          <strong>India&apos;s landlord market is deeply fragmented.</strong> There are millions of individual landlords here, not a few hundred large property management companies. Housing societies help with distribution, but they don&apos;t cover standalone rental properties where a single owner rents out one or two flats.
        </p>

        <p>
          <strong>Unit economics are tighter at Indian price points.</strong> Transaction fees and merchant commissions are structurally lower in India than in the US. The platform would need to reach massive scale to achieve profitability, which means faster growth than a typical fintech startup.
        </p>

        <p>
          <strong>Rent laws vary wildly by state.</strong> Stamp duty, registration requirements, and tenant protections are all different across states. The Model Tenancy Act has been adopted by only <a href="https://www.drishtiias.com/daily-updates/daily-news-analysis/model-tenancy-act-2" target="_blank" rel="noopener noreferrer">four out of 28 states</a>. The platform needs to handle this complexity without breaking.
        </p>

        <p>
          <strong>Incumbents could enter the space.</strong> NoBroker, CRED, Paytm, or PhonePe could build something similar. That said, history suggests that focused, category-defining startups tend to outperform feature additions by large generalist platforms.
        </p>

        <p>
          <strong>Getting credit bureaus on board isn&apos;t guaranteed.</strong> Convincing CIBIL or Experian India to accept and factor in rent payment data would require regulatory advocacy and institutional partnerships. It&apos;s a meaningful lift.
        </p>

        <p>
          <strong>Cash is still king in parts of India.</strong> A meaningful portion of rent, especially in Tier 2 and Tier 3 cities and from older landlords, is still paid in cash and isn&apos;t captured in any digital system.
        </p>

        <h2>The Bottom Line</h2>

        <p>
          Bilt Rewards built a billion-dollar company by solving one problem: rent is dead money, and it shouldn&apos;t be. They turned America&apos;s largest recurring household expense into a rewards engine, a credit builder, and a path to homeownership.
        </p>

        <p>
          India&apos;s version of this opportunity is structurally similar but needs a different playbook. The rental market is larger. The digital payments infrastructure through UPI is more advanced. The credit card market is growing faster with far more headroom. And the cultural desire for homeownership is deep.
        </p>

        <p>
          The regulatory changes of 2025, while they shut down the old way of doing credit card rent payments through fintech apps, actually created a moat for anyone willing to build the right architecture from scratch. CRED proved Indian consumers will engage with financial rewards platforms. NoBroker proved they&apos;ll adopt digital rental tools. The government&apos;s push for digital rent agreements is creating the data layer. And the RBI&apos;s framework, while strict, has clear pathways for compliant innovation through bank partnerships.
        </p>

        <p>The pieces are all there. Someone just needs to put them together.</p>
      </div>

      <RelatedPosts slug="why-india-needs-its-own-bilt-rewards" />
    </article>
  );
}
