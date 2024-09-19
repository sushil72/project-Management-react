import { useSelector } from "react-redux";
import SubscriptionCard from "./SubscriptionCard";

const Subscription = () => {
  // const { subscription } = useSelector((store) => store);
  const { subscription } = useSelector((store) => store);
  console.log("planType : ", subscription.userSubscription?.planType);

  const paidPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Customization Options",
    "Integration Support",
    "Advanced Security",
    "Training and Resources",
    "Access Control",
    "Custom Workflows",
  ];

  const annualPlan = [
    "Add unlimited projects",
    "Access to live chat",
    "Add unlimited team members",
    "Advanced Reporting",
    "Priority Support",
    "Everything which monthly plan has",
  ];

  const freePlan = [
    "Add only 3 projects",
    "Basic Task Management",
    "Project Collaboration",
    "Basic Reporting",
    "Email Notifications",
    "Basic Access Control",
  ];

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9 ">
        <SubscriptionCard
          data={{
            planName: "Free Plan",
            features: freePlan,
            planType: "FREE",
            price: 0,
            buttonName:
              subscription.userSubscription?.planType == "FREE"
                ? "Current Plan"
                : "Get started ",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Monthly Paid Plan",
            features: paidPlan,
            planType: "MONTHLY",
            price: 799,
            buttonName:
              subscription.userSubscription?.planType == "MONTHLY"
                ? "Current plan"
                : "Get Started",
          }}
        />
        <SubscriptionCard
          data={{
            planName: "Annual Paid Plan",
            features: annualPlan,
            planType: "Annually",
            price: 6711,
            buttonName:
              subscription.userSubscription?.planType == "ANNUALY"
                ? "Current Plan"
                : "Get Started",
          }}
        />
      </div>
    </div>
  );
};

export default Subscription;
