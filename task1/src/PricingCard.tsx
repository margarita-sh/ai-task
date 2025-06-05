import React from 'react';

type PricingCardProps = {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
};

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
}) => {
  const styles = {
    card: isFeatured ? 'bg-slate-700 text-white lg:scale-105' : 'bg-white text-slate-700',
    planText: isFeatured ? 'text-slate-300' : 'text-slate-500',
    priceText: isFeatured ? 'text-white' : 'text-slate-900',
    border: isFeatured ? 'border-slate-600' : 'border-slate-200',
    buttonText: isFeatured ? 'text-white' : 'text-slate-500',
    focusRing: 'focus-within:ring-4 focus-within:ring-indigo-500 focus-within:ring-offset-4 focus-within:ring-offset-slate-900',
  };

  return (
    <div
      className={`
        flex h-full w-96 flex-col shadow-lg /* <--- CHANGED: Set a specific, wider width */
        transition-transform duration-300 ease-in-out
        hover:-translate-y-2
        ${styles.card} ${styles.focusRing}
      `}
    >
      <div className="p-8">
        <h2 className={`text-center text-sm font-semibold uppercase ${styles.planText}`}>
          {plan}
        </h2>
        <p className={`mt-4 text-center text-5xl font-bold ${styles.priceText}`}>
          {price}
        </p>
      </div>
      <ul className="flex-grow">
        {features.map((feature) => (
          <li key={feature} className={`border-t p-4 text-center text-sm ${styles.border}`}>
            {feature}
          </li>
        ))}
      </ul>
      <div className={`border-t p-4 ${styles.border}`}>
        <button
          className={`w-full bg-transparent py-2 text-center text-sm font-bold uppercase tracking-wider ${styles.buttonText} focus:outline-none`}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default PricingCard;