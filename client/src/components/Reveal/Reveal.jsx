import useReveal from "../../hooks/useReveal";
import "./Reveal.css";

/**
 * Wrap any block in <Reveal> to fade/slide it in once it enters the viewport.
 * Usage: <Reveal delay={120} className="my-class">...</Reveal>
 *        <Reveal as="article">...</Reveal>
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  ...rest
}) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}