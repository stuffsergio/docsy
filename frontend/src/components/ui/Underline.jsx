export default function Underline({ children, className }) {
  return (
    <div
      className={`${className} 
        relative cursor-pointer transition-all
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px
        after:bg-current after:origin-center 
        after:transition-transform after:duration-300
        after:scale-x-0 hover:after:scale-x-100`}
    >
      {children}
    </div>
  );
}
