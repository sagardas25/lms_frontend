export default function HowItWorksStep({ step, title, description }) {
  return (
    <div className="text-left">
      <div className="text-primary text-4xl font-bold mb-2">Step {step}</div>
      <h4 className="text-xl font-semibold mb-1">{title}</h4>
      <p className="text-sm text-textSecondary">{description}</p>
    </div>
  );
}
