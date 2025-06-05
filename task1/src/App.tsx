import PricingCard from "./PricingCard";

function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-12">
      <h1 className="text-white text-3xl font-bold mb-10">Pricing</h1>
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-4">
        <PricingCard
          plan = "Standard"
          price = "$100"
          features = {['50,000 Requests', '4 contributors', 'Up to 3 GB storage space']}
          
        />
        <PricingCard
          plan="Pro"
          price="$200"
          features={['100,000 Requests', '7 contributors', 'Up to 6 GB storage space']}
          isFeatured = {true}
        />
        <PricingCard
          plan="Expert"
          price="$500"
          features={['200,000 Requests', '11 contributors', 'Up to 10 GB storage space']}
          
        />
      </div>
    </div>
  );
}

export default App;
