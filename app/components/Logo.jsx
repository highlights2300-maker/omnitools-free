export default function LogoMark({ className = "h-5 w-5" }) {
  // A bespoke bolt/Z hybrid mark — reads as a lightning bolt (speed, "Quick")
  // while its zigzag also doubles as the letter Z ("Zeta").
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L4 14H10L9 22L20 9H13L13 2Z" />
    </svg>
  );
}
