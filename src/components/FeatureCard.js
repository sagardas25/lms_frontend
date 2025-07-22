export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-background rounded-2xl p-6 shadow-sm border">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-textSecondary">{description}</p>
    </div>
  );
}
