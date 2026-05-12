import clsx from "clsx";

type IconProps = { className?: string };

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/rentroyz",
    Icon: InstagramIcon,
  },
  { name: "X", href: "https://x.com/rentroyz", Icon: XIcon },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@RENTROYZ",
    Icon: YouTubeIcon,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@rentroyz",
    Icon: TikTokIcon,
  },
  {
    name: "Snapchat",
    href: "https://snapchat.com/t/kYMvaZKz",
    Icon: SnapchatIcon,
  },
  {
    name: "Haraj",
    href: "https://haraj.com.sa/@id25325440_Ryntroyz",
    Icon: HarajIcon,
  },
  {
    name: "Aqar FM",
    href: "https://sa.aqar.fm/user/1270658",
    Icon: AqarIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/966556500470",
    Icon: WhatsAppIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/rentroyz/",
    Icon: LinkedInIcon,
  },
  
];

export default function SocialLinks({
  className,
}: {
  className?: string;
}) {
  return (
    <ul
      className={clsx(
        "flex flex-wrap items-center justify-center gap-3 sm:gap-4",
        className
      )}
    >
      {SOCIALS.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-sand/15 text-sand/70 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-sand/40 hover:bg-sand/5 hover:text-sand"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
  );
}

function SnapchatIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12.166 23.5h-.32c-.06 0-.117-.001-.176-.002-.97-.014-1.624-.498-2.157-.892-.4-.296-.762-.555-1.184-.628a3.41 3.41 0 0 0-.673-.063c-.395 0-.71.061-.94.105-.137.027-.275.05-.353.05-.097 0-.197-.018-.21-.097-.144-.776-.245-1.526-.39-1.7-.225-.275-.553-.297-.84-.318a3.276 3.276 0 0 1-.197-.02c-1.6-.234-2.34-.93-2.358-2.022-.005-.252.139-.474.383-.572 1.31-.526 2.243-1.06 2.832-1.586.467-.418.55-.66.555-.825.005-.18-.117-.418-.21-.595a4.687 4.687 0 0 0-.682-.953c-.18-.198-.382-.43-.466-.667a1.243 1.243 0 0 1 .137-.99 1.245 1.245 0 0 1 .754-.547.886.886 0 0 1 .25-.038c.1 0 .2.018.3.05.157.062.31.123.466.123.232 0 .413-.099.55-.298.157-.221.157-.475.157-.71 0-.083-.001-.171-.002-.262C7.97 4.43 7.927 1.6 11.18.286c.276-.11.567-.184.864-.218.083-.013.166-.024.252-.024h.21c.085 0 .168.011.252.024.297.034.587.108.864.218 3.253 1.313 3.21 4.143 3.187 6.78-.001.092-.002.18-.002.263 0 .235 0 .489.157.71.137.199.318.298.55.298.157 0 .31-.061.466-.123a.886.886 0 0 1 .3-.05.886.886 0 0 1 .25.038 1.245 1.245 0 0 1 .754.547 1.243 1.243 0 0 1 .137.99c-.084.237-.286.469-.466.667-.3.336-.527.65-.682.953-.094.177-.215.416-.21.595.005.166.087.407.554.825.59.526 1.522 1.06 2.832 1.586.245.097.388.32.382.572-.017 1.092-.758 1.788-2.358 2.022-.064.01-.131.014-.196.02-.287.021-.615.043-.84.318-.144.174-.245.924-.39 1.7-.013.079-.114.097-.21.097-.078 0-.216-.023-.354-.05a4.853 4.853 0 0 0-.94-.105 3.41 3.41 0 0 0-.673.063c-.42.073-.783.332-1.183.628-.534.394-1.188.878-2.158.892-.058.001-.117.002-.176.002z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.413c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.687-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l.218.348-1.001 3.65 3.75-.984.012.027zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Haraj is a Saudi classifieds marketplace — there's no universal brand icon,
// so we use a marketplace-style storefront glyph. Swap for the actual logo
// SVG when the brand asset is available.
function HarajIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 21V10h18v11H3z" />
      <path d="M2 10l2-6h16l2 6H2z" />
      <path d="M8 10v3a2 2 0 0 0 4 0M12 10v3a2 2 0 0 0 4 0" />
    </svg>
  );
}

// Aqar FM is a Saudi real-estate marketplace — generic building glyph for now.
function AqarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M3 21h18" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </svg>
  );
}
