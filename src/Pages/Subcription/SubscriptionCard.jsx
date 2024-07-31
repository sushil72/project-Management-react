import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const SubscriptionCard = ({ data }) => {
  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl p-5 space-y-5 w-[18rem]">
      <p className="text-xl font-bold">{data.planName}</p>
      <p>
        <span className="text-2xl font-semibold">₹{data.price}</span>
        <span className="text-sm"> / {data.planType}</span>
      </p>
      {data.planType === "Annually" && (
        <p className="text-green-500">30% off</p>
      )}
      <Button className="w-full">{data.buttonName}</Button>
      <div className="space-y-2">
        {data.features.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
