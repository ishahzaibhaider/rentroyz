import Wordmark from "./ui/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-sand/10 bg-ink-deep px-6 py-12 text-sand/60 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-sand">
          <Wordmark className="h-7 w-auto" />
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <a href="#transformation" className="hover:text-sand">Services</a>
          <a href="#pillars" className="hover:text-sand">About</a>
          <a href="#contact" className="hover:text-sand">Contact</a>
          <span aria-disabled className="cursor-not-allowed text-sand/30" title="Coming soon">العربية</span>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col-reverse items-start justify-between gap-2 border-t border-sand/10 pt-6 text-xs text-sand/40 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} Rent Royz. All rights reserved.</span>
        <span>We Manage. You Earn.</span>
      </div>
    </footer>
  );
}
