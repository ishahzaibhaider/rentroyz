import clsx from "clsx";

type IconProps = { className?: string };

// Inline-SVG approximations of each payment method's brand. They render
// cleanly at small sizes and avoid an additional asset request. To swap in
// pixel-perfect brand logos later, drop the official `.svg` files into
// public/payments/ and replace the inline icon below with <img src=...>.
const PAYMENTS: { name: string; Icon: (p: IconProps) => JSX.Element }[] = [
  { name: "Visa", Icon: VisaIcon },
  { name: "Mastercard", Icon: MastercardIcon },
  { name: "Mada", Icon: MadaIcon },
  { name: "American Express", Icon: AmexIcon },
  { name: "Bank Transfer", Icon: BankTransferIcon },
];

export default function PaymentMethods({
  className,
}: {
  className?: string;
}) {
  return (
    <ul
      className={clsx(
        "flex flex-wrap items-center justify-center gap-2 sm:gap-3",
        className
      )}
    >
      {PAYMENTS.map(({ name, Icon }) => (
        <li key={name}>
          <div
            aria-label={name}
            title={name}
            className="flex h-9 w-14 items-center justify-center rounded-md bg-white px-1.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
          >
            <Icon className="h-full w-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function VisaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 20" className={className} aria-hidden>
      <text
        x="32"
        y="15"
        fill="#1A1F71"
        fontFamily="Arial Black, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="900"
        fontStyle="italic"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 36 22" className={className} aria-hidden>
      <circle cx="14" cy="11" r="9" fill="#EB001B" />
      <circle cx="22" cy="11" r="9" fill="#F79E1B" fillOpacity="0.85" />
    </svg>
  );
}

function AmexIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 22" className={className} aria-hidden>
      <rect width="48" height="22" rx="2" fill="#006FCF" />
      <text
        x="24"
        y="9.5"
        fill="white"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="5.5"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="0.3"
      >
        AMERICAN
      </text>
      <text
        x="24"
        y="16"
        fill="white"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="5.5"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="0.3"
      >
        EXPRESS
      </text>
    </svg>
  );
}

// Mada is the Saudi national payment scheme — green/blue brand colors with
// "mada" Latin + "مدى" Arabic wordmark.
function MadaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 56 22" className={className} aria-hidden>
      <text
        x="28"
        y="10"
        fill="#84BE41"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-0.3"
      >
        mada
      </text>
      <text
        x="28"
        y="18.5"
        fill="#252464"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="5.5"
        fontWeight="700"
        textAnchor="middle"
      >
        مدى
      </text>
    </svg>
  );
}

function BankTransferIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1F2937"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 21h18" />
      <path d="M5 21V11m14 10V11" />
      <path d="M3 11l9-6 9 6H3z" fill="#1F2937" stroke="none" />
      <path d="M8 21v-6m4 6v-6m4 6v-6" />
    </svg>
  );
}
